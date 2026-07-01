const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseHeaders = {
  'apikey': SUPABASE_ANON_KEY || '',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY || ''}`,
  'Content-Type': 'application/json',
}

type SupabaseRow = Record<string, unknown>

export interface ServicePromotion {
  id: string
  storitevId: string
  type: 'popust' | 'happy_hour'
  naziv: string
  tipPopusta: 'percentage' | 'fixed'
  vrednost: number
  originalCena: number
  finalCena: number
  popustZnesek: number
  badgeLabel: string
}

export interface AddOnOption {
  id: string
  storitevId: string
  naziv: string
  trajanjeMin: number
  originalCena: number
  finalCena: number
  popustZnesek: number
  tipPopusta: 'percentage' | 'fixed'
  vrednost: number
  badgeLabel: string
}

export function calculateDiscount(
  originalCena: number,
  tipPopusta: string,
  vrednost: number
): { finalCena: number; popustZnesek: number } {
  if (tipPopusta === 'percentage') {
    const popustZnesek = (originalCena * vrednost) / 100
    return { finalCena: Math.max(0, originalCena - popustZnesek), popustZnesek }
  } else {
    return {
      finalCena: Math.max(0, originalCena - vrednost),
      popustZnesek: vrednost,
    }
  }
}

function buildPromotion(
  id: string,
  storitevId: string,
  type: 'popust' | 'happy_hour',
  naziv: string,
  tipPopusta: string,
  vrednost: number,
  originalCena: number
): ServicePromotion {
  const { finalCena, popustZnesek } = calculateDiscount(originalCena, tipPopusta, vrednost)
  return {
    id,
    storitevId,
    type,
    naziv,
    tipPopusta: tipPopusta as 'percentage' | 'fixed',
    vrednost,
    originalCena,
    finalCena,
    popustZnesek,
    badgeLabel: tipPopusta === 'percentage'
      ? `-${vrednost}%`
      : `-€${vrednost.toFixed(2)}`,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Fetch active discounts for all services of a company
//    NOTE: Callers must enrich originalCena after receiving the result —
//    the API does not store the current service price; it must be merged from
//    the services array returned by fetchInitData.
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchActiveDiscounts(
  companyId: string,
  serviceIds: string[]
): Promise<Record<string, ServicePromotion>> {
  try {
    if (!companyId || serviceIds.length === 0) return {}
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return {}

    const today = new Date().toISOString().split('T')[0]
    const url = `${SUPABASE_URL}/rest/v1/popusti?select=*&company_id=eq.${companyId}&aktiven=eq.true&datum_zacetek=lte.${today}&datum_konec=gte.${today}`

    const discountsRes = await fetch(url, { headers: supabaseHeaders })

    if (!discountsRes.ok) return {}

    const discounts = await discountsRes.json() as SupabaseRow[]

    if (!discounts?.length) return {}

    const discountIds = discounts.map((d) => d.id).join(',')
    const linksRes = await fetch(
      `${SUPABASE_URL}/rest/v1/popusti_storitve?select=*&popust_id=in.(${discountIds})`,
      { headers: supabaseHeaders }
    )
    const links = await linksRes.json() as SupabaseRow[]
    if (!links?.length) return {}

    const result: Record<string, ServicePromotion> = {}

    for (const link of links) {
      if (!serviceIds.includes(String(link.storitev_id))) continue
      const discount = discounts.find((d) => d.id === link.popust_id)
      if (!discount) continue

      result[String(link.storitev_id)] = buildPromotion(
        String(discount.id),
        String(link.storitev_id),
        'popust',
        String(discount.naziv ?? ''),
        String(discount.tip_popusta ?? 'fixed'),
        Number(discount.vrednost ?? 0),
        0
      )
    }

    return result
  } catch {
    return {}
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Check happy hour for a specific service + date + time
// ─────────────────────────────────────────────────────────────────────────────
export async function checkHappyHour(
  companyId: string,
  storitevId: string,
  date: Date,
  time: string
): Promise<ServicePromotion | null> {
  if (!companyId || !storitevId || !date || !time) return null
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null

  const dayOfWeek = date.getDay()

  const hhRes = await fetch(
    `${SUPABASE_URL}/rest/v1/happy_hours?select=*&company_id=eq.${companyId}&aktiven=eq.true`,
    { headers: supabaseHeaders }
  )
  const happyHours = await hhRes.json() as SupabaseRow[]
  if (!happyHours?.length) return null

  const matching = happyHours.filter((hh) => {
    const days: number[] = Array.isArray(hh.dnevi_v_tednu) ? hh.dnevi_v_tednu.map(Number) : []
    if (!days.includes(dayOfWeek)) return false
    const [h, m] = time.split(':').map(Number)
    const [sh, sm] = String(hh.cas_zacetek || '00:00').split(':').map(Number)
    const [eh, em] = String(hh.cas_konec || '23:59').split(':').map(Number)
    const timeMin = h * 60 + m
    const startMin = sh * 60 + sm
    const endMin = eh * 60 + em
    return timeMin >= startMin && timeMin < endMin
  })

  if (!matching.length) return null

  for (const hh of matching) {
    if (hh.vse_storitve) {
      return buildPromotion(String(hh.id), storitevId, 'happy_hour', 'Happy Hour',
        String(hh.tip_popusta ?? 'fixed'), Number(hh.vrednost ?? 0), 0)
    }
    const linkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/happy_hours_storitve?select=*&happy_hour_id=eq.${hh.id}&storitev_id=eq.${storitevId}`,
      { headers: supabaseHeaders }
    )
    const links = await linkRes.json() as SupabaseRow[]
    if (links?.length) {
      return buildPromotion(String(hh.id), storitevId, 'happy_hour', 'Happy Hour',
        String(hh.tip_popusta ?? 'fixed'), Number(hh.vrednost ?? 0), 0)
    }
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Fetch available add-ons for employee + service + time
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchAvailableAddOns(
  companyId: string,
  mainStoritevId: string,
  employeeId: string,
  date: Date,
  endTime: string,
  allServices: Array<{ id: string; naziv: string; trajanjeMin: number; cena: number }>
): Promise<AddOnOption[]> {
  if (!companyId || !employeeId) return []
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return []

  const addOnsRes = await fetch(
    `${SUPABASE_URL}/rest/v1/add_on_storitve?select=*&company_id=eq.${companyId}&aktiven=eq.true`,
    { headers: supabaseHeaders }
  )
  const addOns = await addOnsRes.json() as SupabaseRow[]
  if (!addOns?.length) return []

  const employeeRes = await fetch(
    `${SUPABASE_URL}/rest/v1/Osebe?select=Storitve&"ID Osebe"=eq.${employeeId}`,
    { headers: supabaseHeaders }
  )
  const employeeData = await employeeRes.json() as SupabaseRow[]
  const employeeServiceIds: string[] = JSON.parse(
    String(employeeData?.[0]?.Storitve || '[]')
  ).map(String)

  const dateStr = date.toISOString().split('T')[0]
  const terminiRes = await fetch(
    `${SUPABASE_URL}/rest/v1/Termini?select="Čas","Konec"&"ID Osebe"=eq.${employeeId}&Datum=eq.${dateStr}`,
    { headers: supabaseHeaders }
  )
  const termini = (await terminiRes.json() || []) as SupabaseRow[]

  const result: AddOnOption[] = []

  for (const addOn of addOns) {
    const sId = String(addOn.storitev_id)

    if (sId === String(mainStoritevId)) continue
    if (!employeeServiceIds.includes(sId)) continue

    const service = allServices.find(s => String(s.id) === sId)
    if (!service) continue

    const [eh, em] = endTime.split(':').map(Number)
    const endMinutes = eh * 60 + em
    const addOnEndMinutes = endMinutes + service.trajanjeMin

    const conflict = termini.some((t) => {
      const [sh, sm] = String(t['Čas'] || '00:00').split(':').map(Number)
      const [kh, km] = String(t['Konec'] || '00:00').split(':').map(Number)
      const tStart = sh * 60 + sm
      const tEnd = kh * 60 + km
      return tStart < addOnEndMinutes && tEnd > endMinutes
    })

    if (conflict) continue

    const originalCena = service.cena
    const tipPopusta = String(addOn.tip_popusta ?? 'fixed') as 'percentage' | 'fixed'
    const vrednostPopusta = Number(addOn.vrednost_popusta ?? 0)
    const { finalCena, popustZnesek } = calculateDiscount(
      originalCena, tipPopusta, vrednostPopusta
    )

    result.push({
      id: String(addOn.id),
      storitevId: sId,
      naziv: service.naziv,
      trajanjeMin: service.trajanjeMin,
      originalCena,
      finalCena,
      popustZnesek,
      tipPopusta,
      vrednost: vrednostPopusta,
      badgeLabel: tipPopusta === 'percentage'
        ? `-${vrednostPopusta}%`
        : `-€${vrednostPopusta.toFixed(2)}`,
    })
  }

  return result
}
