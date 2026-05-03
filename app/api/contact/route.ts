import { NextRequest, NextResponse } from "next/server";
import { contactSchema, temaLabels } from "@/lib/schema";

// Simple in-memory rate limiter: 3 requests per IP per 10 min
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

function buildEmailHtml(data: {
  ime: string;
  email: string;
  telefon?: string;
  tema: string;
  sporocilo: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="sl">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#0b0c0e;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#1a1c21;border:1px solid #23262d;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="background:#e11d2e;padding:24px 32px;">
        <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">Kozamurnik</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Novo sporočilo s spletne strani</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:20px;">
              <p style="margin:0 0 6px;color:#9aa0a8;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Pošiljatelj</p>
              <p style="margin:0;color:#f5f6f7;font-size:16px;font-weight:600;">${data.ime}</p>
              <p style="margin:4px 0 0;color:#9aa0a8;font-size:14px;">${data.email}</p>
              ${data.telefon ? `<p style="margin:4px 0 0;color:#9aa0a8;font-size:14px;">Tel: ${data.telefon}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:20px;border-top:1px solid #23262d;padding-top:20px;">
              <p style="margin:0 0 6px;color:#9aa0a8;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Tema</p>
              <p style="margin:0;color:#ef3a49;font-size:14px;font-weight:600;">${data.tema}</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:0;border-top:1px solid #23262d;padding-top:20px;">
              <p style="margin:0 0 12px;color:#9aa0a8;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Sporočilo</p>
              <p style="margin:0;color:#c8ccd2;font-size:14px;line-height:1.7;white-space:pre-wrap;">${data.sporocilo.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;border-top:1px solid #23262d;">
        <p style="margin:0;color:#70757d;font-size:11px;">Sporočilo poslano s spletne strani kozamurnik.si</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Preveč zahtev. Počakajte 10 minut." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Neveljavna zahteva." }, { status: 400 });
  }

  const parse = contactSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { success: false, error: "Napaka pri validaciji.", details: parse.error.flatten() },
      { status: 422 }
    );
  }

  const { ime, email, telefon, tema, sporocilo, _company } = parse.data;

  // Honeypot check
  if (_company) {
    return NextResponse.json({ success: true });
  }

  const temaLabel = temaLabels[tema];
  const emailFrom = process.env.CONTACT_EMAIL_FROM || "kontakt@kozamurnik.si";
  const emailTo = process.env.CONTACT_EMAIL_TO || "boris.kozamurnik@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[Contact] DEV mode — form submission from ${ime} <${email}>, tema: ${temaLabel}`);
    console.log(`[Contact] Message: ${sporocilo}`);
    return NextResponse.json({ success: true });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Kozamurnik Kontakt <${emailFrom}>`,
      to: [emailTo],
      replyTo: email,
      subject: `[Spletna stran] Novo sporočilo: ${temaLabel}`,
      html: buildEmailHtml({ ime, email, telefon, tema: temaLabel, sporocilo }),
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Email send failed:", err);
    return NextResponse.json(
      { success: false, error: "Sporočila ni bilo mogoče poslati. Pokličite nas neposredno." },
      { status: 500 }
    );
  }
}
