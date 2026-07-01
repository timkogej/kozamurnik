"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { sl } from "date-fns/locale";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Clock,
  Info,
  ShieldCheck,
  Star,
} from "lucide-react";
import { bookingConfig } from "@/lib/booking-config";
import {
  checkSlotAvailable,
  fetchInitData,
  fetchTimeSlotsRange,
  submitBookingPayload,
} from "@/lib/api";
import { redirectToCheckout } from "@/lib/checkout";
import {
  calculateDiscount,
  checkHappyHour,
  fetchActiveDiscounts,
  fetchAvailableAddOns,
} from "@/lib/promotionsApi";
import type { BookingSubmission, CustomerDetails, DaySlots, Service, VehicleDetails } from "@/types";
import { useBookingStore } from "@/store/bookingStore";
import { usePromotionsStore } from "@/store/promotionsStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AddOnSelector } from "@/components/shared/AddOnSelector";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";

export type PaymentReturnState = {
  status: "success" | "cancelled";
  service?: string;
  date?: string;
  time?: string;
  name?: string;
  storageKomplets?: string;
  storageTotal?: string;
  currency?: string;
};

const stepVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const bookingShellClass =
  "mx-auto w-full max-w-6xl px-4 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-14";

const weekdayLabels = ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"];
const calendarWeekdayLabels = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

type FormErrors = Partial<Record<"firstName" | "lastName" | "email" | "phone" | "privacy", string>>;

function currencySymbol(currency?: string) {
  if (!currency || currency === "EUR") return "€";
  return currency;
}

function formatMoney(value: number, currency: string) {
  return `${value.toLocaleString("sl-SI", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

function formatKomplets(count: number) {
  if (count === 1) return "1 komplet";
  if (count === 2) return "2 kompleta";
  return `${count} kompleti`;
}

function sanitizeInput(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
}

function getVehicleLabel(details: VehicleDetails | null) {
  if (!details) return "";
  return bookingConfig.vehicleTypes.find((type) => type.value === details.vehicleType)?.label ?? details.vehicleType;
}

function getDayStatus(daySlots: DaySlots | undefined) {
  if (Array.isArray(daySlots) && daySlots.length > 0) return "available";
  if (daySlots === "fully_booked") return "fully_booked";
  return "unavailable";
}

function getBookingServiceIds(_services: Service[], storageEnabled: boolean) {
  const ids = [bookingConfig.primaryServiceId];

  if (storageEnabled && bookingConfig.storage.serviceId) {
    ids.push(bookingConfig.storage.serviceId);
  }

  return Array.from(new Set(ids));
}

function getStorageService(services: Service[]) {
  if (!bookingConfig.storage.serviceId) return undefined;
  return services.find((service) => String(service.id) === bookingConfig.storage.serviceId);
}

function getPrimaryBookingService(services: Service[]): Service {
  const service = services.find((item) => String(item.id) === bookingConfig.primaryServiceId);

  if (service) return service;

  return {
    id: bookingConfig.primaryServiceId,
    category_id: "",
    naziv: "Menjava pnevmatik",
    opis: "",
    trajanjeMin: 0,
    cena: 0,
  };
}

function getBookingDuration(services: Service[], storageEnabled: boolean, availableServices: Service[]) {
  const servicesDuration = services[0]?.trajanjeMin ?? 0;
  const storageDuration = storageEnabled ? getStorageService(availableServices)?.trajanjeMin ?? 0 : 0;
  return servicesDuration + storageDuration;
}

function getBookingResursiIds(
  baseResursiIds: number[],
  storageEnabled: boolean,
  storitveResursiMap: Record<string, number[]>
) {
  const ids = new Set(baseResursiIds);

  if (storageEnabled && bookingConfig.storage.serviceId) {
    for (const id of storitveResursiMap[bookingConfig.storage.serviceId] ?? []) {
      ids.add(id);
    }
  }

  return Array.from(ids);
}

function buildNotes(details: VehicleDetails, storage: { enabled: boolean; komplets: number }, customerNote?: string) {
  const structured = [
    `Velikost pnevmatik: ${details.tireSize}`,
    `Tip vozila: ${getVehicleLabel(details)}`,
    storage.enabled ? `Shranjevanje pnevmatik: ${formatKomplets(storage.komplets)}` : "",
  ].filter(Boolean);

  const note = sanitizeInput(customerNote ?? "");
  if (!note) return structured.join("\n");
  return `${structured.join("\n")}\n---\n${note}`;
}

function buildPaymentReturnUrl(
  status: "success" | "cancelled",
  details: {
    serviceName: string;
    date: string;
    time: string;
    customerName: string;
    storageKomplets?: number;
    storageTotal?: number;
    currency: string;
  }
) {
  const url = new URL("/rezervacija", window.location.origin);
  url.searchParams.set("payment", status);
  url.searchParams.set("service", details.serviceName);
  url.searchParams.set("date", details.date);
  url.searchParams.set("time", details.time);
  url.searchParams.set("name", details.customerName);
  url.searchParams.set("currency", details.currency);

  if (details.storageKomplets && details.storageTotal !== undefined) {
    url.searchParams.set("storageKomplets", String(details.storageKomplets));
    url.searchParams.set("storageTotal", String(details.storageTotal));
  }

  return url.toString();
}

function useBookingServices() {
  const selectedService = useBookingStore((state) => state.selectedService);
  const selectedServices = useBookingStore((state) => state.selectedServices);

  return useMemo(() => {
    if (selectedServices.length > 0) return [selectedServices[0]];
    return selectedService ? [selectedService] : [];
  }, [selectedService, selectedServices]);
}

function ReassuranceRow() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-graphite-500">
      <span className="inline-flex items-center gap-1.5">
        <Star className="h-4 w-4 fill-brand-500 text-brand-500" aria-hidden />
        9.6/10
      </span>
      <span className="h-1 w-1 rounded-full bg-graphite-300" aria-hidden />
      <span>Brezplačna rezervacija</span>
      <span className="h-1 w-1 rounded-full bg-graphite-300" aria-hidden />
      <span>Hitra potrditev</span>
    </div>
  );
}

function StepIndicator() {
  const currentStep = useBookingStore((state) => state.currentStep);
  const selectedTime = useBookingStore((state) => state.selectedTime);

  const visualStep =
    currentStep <= 1
      ? selectedTime
        ? 2
        : 1
      : currentStep === 2
        ? 3
        : currentStep === 3
          ? 4
          : 5;
  const steps = ["Datum", "Ura", "Vozilo", "Podatki", "Potrditev"];

  return (
    <div className="rounded-2xl border border-paper-300 bg-white p-3 shadow-soft" aria-label="Napredek rezervacije">
      <div className="grid grid-cols-5 gap-1">
        {steps.map((label, index) => {
          const number = index + 1;
          const active = visualStep === number;
          const done = visualStep > number;
          return (
            <div key={label} className="min-w-0">
              <div
                className={cn(
                  "mb-2 h-1.5 rounded-full transition-colors",
                  done || active ? "bg-brand-500" : "bg-paper-200"
                )}
              />
              <div className="hidden text-xs font-medium text-graphite-500 sm:block">
                <span className={active ? "text-brand-600" : done ? "text-graphite-700" : ""}>
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuantitySelector() {
  const storageSelection = useBookingStore((state) => state.storageSelection);
  const setStorageKomplets = useBookingStore((state) => state.setStorageKomplets);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-graphite-700">Koliko kompletov?</span>
      <div className="inline-flex rounded-xl border border-paper-300 bg-white p-1">
        {Array.from({ length: bookingConfig.storage.maxKomplets }, (_, index) => index + 1).map((count) => {
          const selected = storageSelection.komplets === count;
          return (
            <button
              key={count}
              type="button"
              onClick={() => setStorageKomplets(count)}
              className={cn(
                "h-9 w-10 rounded-lg text-sm font-semibold transition-colors",
                selected ? "bg-brand-500 text-white" : "text-graphite-700 hover:bg-paper-100"
              )}
              aria-pressed={selected}
            >
              {count}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VehicleStep() {
  const vehicleDetails = useBookingStore((state) => state.vehicleDetails);
  const setVehicleDetails = useBookingStore((state) => state.setVehicleDetails);
  const goToStep = useBookingStore((state) => state.goToStep);
  const [tireSize, setTireSize] = useState(vehicleDetails?.tireSize ?? "");
  const [vehicleType, setVehicleType] = useState(vehicleDetails?.vehicleType ?? "");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!tireSize || !vehicleType) {
      setError("Izberite velikost pnevmatik in tip vozila.");
      return;
    }
    setVehicleDetails({ tireSize, vehicleType });
    setError("");
    goToStep(3);
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-normal text-brand-600">Podatki o vozilu</p>
        <h2 className="font-display text-4xl font-semibold leading-tight text-graphite-900">
          Za katero vozilo rezervirate?
        </h2>
        <p className="mt-3 max-w-2xl text-base text-graphite-500">
          Ti podatki ne vplivajo na ceno. Zapišejo se v opombe termina, da se ekipa lahko pripravi.
        </p>
      </div>

      <div className="grid gap-6 rounded-2xl border border-paper-300 bg-white p-6 shadow-soft md:grid-cols-2">
        <div className="md:col-span-2">
          <label id="tire-size-label" className="mb-2 block text-sm font-medium text-graphite-900">
            Velikost pnevmatik <span className="ml-1 text-brand-500">*</span>
          </label>
          <div
            role="radiogroup"
            aria-labelledby="tire-size-label"
            className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6"
          >
            {[
              ...bookingConfig.tireSizes.map((size) => ({ value: size, label: size, wide: false })),
              { value: "Nisem prepričan", label: "Nisem prepričan", wide: true },
            ].map((option) => {
              const selected = tireSize === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTireSize(option.value)}
                  className={cn(
                    "min-h-12 rounded-2xl border px-3 py-3 text-sm font-semibold transition-all",
                    "focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2",
                    selected
                      ? "border-brand-500 bg-brand-500 text-white shadow-brand"
                      : "border-paper-300 bg-white text-graphite-700 hover:border-brand-500/50 hover:bg-brand-50",
                    option.wide && "col-span-3 sm:col-span-2 lg:col-span-2"
                  )}
                  role="radio"
                  aria-checked={selected}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-graphite-900">
            Tip vozila <span className="ml-1 text-brand-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-1 rounded-2xl border border-paper-300 bg-paper-100 p-1">
            {bookingConfig.vehicleTypes.map((type) => {
              const selected = vehicleType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setVehicleType(type.value)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                    selected
                      ? "bg-white text-brand-700 shadow-soft ring-1 ring-brand-500/25"
                      : "text-graphite-600 hover:bg-white/70 hover:text-graphite-900"
                  )}
                  aria-pressed={selected}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-between gap-3">
        <Button type="button" variant="secondary" onClick={() => goToStep(1)}>
          Nazaj
        </Button>
        <Button type="button" onClick={handleContinue}>
          Nadaljuj
        </Button>
      </div>
    </section>
  );
}

function DateChip({
  day,
  status,
  selected,
  onSelect,
}: {
  day: Date;
  status: "available" | "fully_booked" | "unavailable";
  selected: boolean;
  onSelect: () => void;
}) {
  const disabled = status !== "available";
  const today = isToday(day);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "relative flex h-24 w-[76px] shrink-0 scroll-ml-6 snap-start flex-col items-center justify-center rounded-2xl border text-center transition-all",
        selected
          ? "border-brand-500 bg-brand-500 text-white shadow-brand"
          : "border-paper-300 bg-white text-graphite-900 hover:border-brand-500/40 hover:bg-brand-50",
        disabled && "cursor-not-allowed bg-paper-100 text-graphite-300 opacity-70 hover:border-paper-300 hover:bg-paper-100"
      )}
      aria-pressed={selected}
      aria-label={`${format(day, "EEEE, d. MMMM", { locale: sl })}, ${
        disabled ? "ni prostih terminov" : "prosti termini"
      }`}
    >
      {today && (
        <span
          className={cn(
            "absolute top-2 h-1.5 w-1.5 rounded-full",
            selected ? "bg-white" : disabled ? "bg-graphite-300" : "bg-brand-500"
          )}
          aria-hidden
        />
      )}
      <span className={cn("text-xs font-semibold uppercase", selected ? "text-white/75" : "text-graphite-400")}>
        {weekdayLabels[day.getDay()]}
      </span>
      <span className="mt-1 text-2xl font-bold leading-none">{format(day, "d")}</span>
      <span className={cn("mt-1 text-xs capitalize", selected ? "text-white/80" : "text-graphite-500")}>
        {format(day, "MMM", { locale: sl })}
      </span>
    </button>
  );
}

function StorageUpsell({ currency }: { currency: string }) {
  const storageSelection = useBookingStore((state) => state.storageSelection);
  const answerStorageUpsell = useBookingStore((state) => state.answerStorageUpsell);

  if (!storageSelection.upsellShown || storageSelection.enabled || storageSelection.upsellAnswered) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="rounded-2xl border border-brand-100 bg-brand-50 p-5"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-graphite-900">
            Želite ob tem terminu shraniti tudi pnevmatike?
          </h3>
          <p className="mt-1 text-sm text-graphite-500">
            {formatMoney(bookingConfig.storage.unitPrice, currency)} na komplet. Dodate lahko do{" "}
            {bookingConfig.storage.maxKomplets} komplete.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" size="sm" onClick={() => answerStorageUpsell(true)}>
              Da, dodaj
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => answerStorageUpsell(false)}>
              Ne, hvala
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimeSlotsPanel({
  selectedDate,
  timeSlots,
  selectedTime,
  isLoading,
  onTimeSelect,
  className,
}: {
  selectedDate: Date | null;
  timeSlots: string[];
  selectedTime: string | null;
  isLoading: boolean;
  onTimeSelect: (time: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-paper-300 bg-white p-5 shadow-soft", className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-graphite-900">Prosti termini</p>
          <p className="text-sm text-graphite-500">
            {selectedDate
              ? format(selectedDate, "EEEE, d. MMMM yyyy", { locale: sl })
              : "Izberite datum v koledarju"}
          </p>
        </div>
        <CalendarDays className="h-5 w-5 text-brand-500" aria-hidden />
      </div>

      {isLoading ? (
        <div className="grid gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-11 animate-pulse rounded-xl bg-paper-200" />
          ))}
        </div>
      ) : !selectedDate ? (
        <div className="rounded-xl bg-paper-100 px-4 py-8 text-center text-sm text-graphite-500">
          Izberite datum v koledarju.
        </div>
      ) : timeSlots.length === 0 ? (
        <div className="rounded-xl bg-paper-100 px-4 py-8 text-center text-sm text-graphite-500">
          Ni prostih terminov - izberite drug dan.
        </div>
      ) : (
        <div className="grid gap-2">
          {timeSlots.map((slot) => {
            const selected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onTimeSelect(slot)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all",
                  selected
                    ? "border-brand-500 bg-brand-500 text-white shadow-brand"
                    : "border-paper-300 bg-white text-graphite-700 hover:border-brand-500/50 hover:bg-brand-50"
                )}
                aria-pressed={selected}
              >
                <span>{slot}</span>
                <Clock className={cn("h-4 w-4", selected ? "text-white/80" : "text-graphite-400")} aria-hidden />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DateTimeStep({ currency }: { currency: string }) {
  const company = useBookingStore((state) => state.company);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedTime = useBookingStore((state) => state.selectedTime);
  const selectDate = useBookingStore((state) => state.selectDate);
  const selectTime = useBookingStore((state) => state.selectTime);
  const goToStep = useBookingStore((state) => state.goToStep);
  const maxDniRezervacija = useBookingStore((state) => state.maxDniRezervacija);
  const slotsMap = useBookingStore((state) => state.slotsMap);
  const setSlotsMap = useBookingStore((state) => state.setSlotsMap);
  const isLoadingSlots = useBookingStore((state) => state.isLoadingSlots);
  const setLoadingSlots = useBookingStore((state) => state.setLoadingSlots);
  const requiredResursiIds = useBookingStore((state) => state.requiredResursiIds);
  const storitveResursiMap = useBookingStore((state) => state.storitveResursiMap);
  const availableServices = useBookingStore((state) => state.services);
  const storageSelection = useBookingStore((state) => state.storageSelection);
  const markStorageUpsellShown = useBookingStore((state) => state.markStorageUpsellShown);
  const services = useBookingServices();
  const reducedMotion = useReducedMotionSafe();
  const {
    serviceDiscounts,
    setActiveHappyHour,
    computeActivePromotionForServices,
    setAvailableAddOns,
    setLoadingAddOns,
  } = usePromotionsStore();

  const today = useMemo(() => startOfDay(new Date()), []);
  const [currentMonth, setCurrentMonth] = useState(today);
  const windowEnd = useMemo(() => addDays(today, maxDniRezervacija), [maxDniRezervacija, today]);
  const days = useMemo(
    () => Array.from({ length: maxDniRezervacija + 1 }, (_, index) => addDays(today, index)),
    [maxDniRezervacija, today]
  );
  const calendarDays = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
      }),
    [currentMonth]
  );
  const currentMonthLabel = format(currentMonth, "MMMM yyyy", { locale: sl });
  const canShowPreviousMonth =
    startOfMonth(currentMonth).getTime() > startOfMonth(today).getTime();
  const canShowNextMonth =
    startOfMonth(addMonths(currentMonth, 1)).getTime() <= startOfMonth(windowEnd).getTime();

  const serviceIds = useMemo(() => {
    return getBookingServiceIds(services, storageSelection.enabled);
  }, [services, storageSelection.enabled]);
  const bookingResursiIds = useMemo(
    () => getBookingResursiIds(requiredResursiIds, storageSelection.enabled, storitveResursiMap),
    [requiredResursiIds, storageSelection.enabled, storitveResursiMap]
  );
  const bookingDuration = useMemo(
    () => getBookingDuration(services, storageSelection.enabled, availableServices),
    [availableServices, services, storageSelection.enabled]
  );

  const fetchSlots = useCallback(async () => {
    if (!serviceIds.length) return;
    setLoadingSlots(true);
    setSlotsMap({});
    try {
      const response = await fetchTimeSlotsRange({
        companySlug: bookingConfig.companySlug,
        serviceIds,
        employeeId: bookingConfig.fixedEmployeeId,
        anyPerson: false,
        eligibleEmployeeIds: [],
        startDate: format(today, "yyyy-MM-dd"),
        endDate: format(windowEnd, "yyyy-MM-dd"),
        resursiIds: bookingResursiIds.length > 0 ? bookingResursiIds : undefined,
      });
      setSlotsMap(response.slots);
    } catch {
      setSlotsMap({});
    } finally {
      setLoadingSlots(false);
    }
  }, [bookingResursiIds, serviceIds, setLoadingSlots, setSlotsMap, today, windowEnd]);

  useEffect(() => {
    void fetchSlots();
  }, [fetchSlots]);

  const selectedDateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const selectedDaySlots = selectedDateKey ? slotsMap[selectedDateKey] : undefined;
  const timeSlots = Array.isArray(selectedDaySlots) ? selectedDaySlots : [];
  const canContinue =
    Boolean(selectedDate && selectedTime) &&
    !isLoadingSlots &&
    (storageSelection.enabled || !storageSelection.upsellShown || storageSelection.upsellAnswered);

  useEffect(() => {
    if (!selectedDate || !selectedTime || isLoadingSlots) return;
    if (!Array.isArray(selectedDaySlots) || !selectedDaySlots.includes(selectedTime)) {
      selectTime("");
    }
  }, [isLoadingSlots, selectTime, selectedDate, selectedDaySlots, selectedTime]);

  const handleTimeSelect = async (time: string) => {
    selectTime(time);
    if (!storageSelection.enabled && !storageSelection.upsellShown) {
      markStorageUpsellShown();
    }

    const primaryService = services[0];
    if (!company?.idPodjetja || !primaryService || !selectedDate) return;

    const primaryId = String(primaryService.id);
    const hasDiscount = Boolean(serviceDiscounts[primaryId]);

    if (!hasDiscount) {
      try {
        const happyHour = await checkHappyHour(company.idPodjetja, primaryId, selectedDate, time);
        if (happyHour) {
          const discount = calculateDiscount(Number(primaryService.cena), happyHour.tipPopusta, happyHour.vrednost);
          setActiveHappyHour({
            ...happyHour,
            originalCena: Number(primaryService.cena),
            finalCena: discount.finalCena,
            popustZnesek: discount.popustZnesek,
          });
        } else {
          setActiveHappyHour(null);
        }
      } catch {
        setActiveHappyHour(null);
      }
    }

    computeActivePromotionForServices(serviceIds);

    setLoadingAddOns(true);
    try {
      const [hours, minutes] = time.split(":").map(Number);
      const endMinutes = hours * 60 + minutes + bookingDuration;
      const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
      const addOns = await fetchAvailableAddOns(
        company.idPodjetja,
        primaryId,
        String(bookingConfig.fixedEmployeeId),
        selectedDate,
        endTime,
        services
      );
      setAvailableAddOns(addOns);
    } catch {
      setAvailableAddOns([]);
    } finally {
      setLoadingAddOns(false);
    }
  };

  return (
    <section className="w-full max-w-full min-w-0 space-y-8 overflow-x-hidden">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-normal text-brand-600">Izberi datum in uro</p>
        <h2 className="font-display text-4xl font-semibold leading-tight text-graphite-900">
          Rezervacija termina
        </h2>
        <p className="mt-3 max-w-2xl text-base text-graphite-500">
          Izberite dan in uro. Shranjevanje pnevmatik lahko dodate po izbiri termina.
        </p>
      </div>

      <div className="relative w-full max-w-full min-w-0 overflow-hidden md:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-full max-w-full min-w-0 snap-x gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isLoadingSlots
            ? Array.from({ length: 10 }, (_, index) => (
                <div key={index} className="h-24 w-[76px] shrink-0 animate-pulse rounded-2xl bg-paper-200" />
              ))
            : days.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const status = getDayStatus(slotsMap[key]);
                return (
                  <DateChip
                    key={key}
                    day={day}
                    status={status}
                    selected={selectedDate ? isSameDay(day, selectedDate) : false}
                    onSelect={() => selectDate(day)}
                  />
                );
              })}
        </div>
        <div className="mt-2 flex justify-end gap-2 text-graphite-400" aria-hidden>
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={`mobile-${selectedDateKey}`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            className="md:hidden"
          >
            <TimeSlotsPanel
              selectedDate={selectedDate}
              timeSlots={timeSlots}
              selectedTime={selectedTime}
              isLoading={isLoadingSlots}
              onTimeSelect={(slot) => void handleTimeSelect(slot)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden gap-6 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)]">
        <div className="rounded-2xl border border-paper-300 bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold capitalize text-graphite-900">{currentMonthLabel}</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentMonth((month) => subMonths(month, 1))}
                disabled={!canShowPreviousMonth}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border border-paper-300 bg-white text-graphite-600 transition-colors",
                  "hover:border-brand-500/40 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper-300 disabled:hover:bg-white"
                )}
                aria-label="Prejšnji mesec"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
                disabled={!canShowNextMonth}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border border-paper-300 bg-white text-graphite-600 transition-colors",
                  "hover:border-brand-500/40 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper-300 disabled:hover:bg-white"
                )}
                aria-label="Naslednji mesec"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-x-1 gap-y-2">
            {calendarWeekdayLabels.map((label) => (
              <div key={label} className="flex h-8 items-center justify-center text-xs font-semibold uppercase text-graphite-400">
                {label}
              </div>
            ))}
            {isLoadingSlots
              ? Array.from({ length: 35 }, (_, index) => (
                  <div key={index} className="flex h-10 items-center justify-center">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-paper-200" />
                  </div>
                ))
              : calendarDays.map((day) => {
                  const key = format(day, "yyyy-MM-dd");
                  const status = getDayStatus(slotsMap[key]);
                  const disabled = status !== "available";
                  const selected = selectedDate ? isSameDay(day, selectedDate) : false;
                  const inCurrentMonth = isSameMonth(day, currentMonth);
                  const todayDate = isToday(day);

                  return (
                    <div key={key} className="flex h-10 items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (!inCurrentMonth) setCurrentMonth(startOfMonth(day));
                          selectDate(day);
                        }}
                        disabled={disabled}
                        className={cn(
                          "relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all",
                          selected
                            ? "bg-brand-500 text-white shadow-brand"
                            : "text-graphite-900 hover:bg-brand-50 hover:text-brand-700",
                          !inCurrentMonth && !selected && "text-graphite-300",
                          status === "fully_booked" &&
                            !selected &&
                            "cursor-not-allowed bg-paper-200 text-graphite-400 hover:bg-paper-200 hover:text-graphite-400",
                          status === "unavailable" &&
                            !selected &&
                            "cursor-not-allowed bg-paper-100 text-graphite-300 hover:bg-paper-100 hover:text-graphite-300"
                        )}
                        aria-pressed={selected}
                        aria-label={`${format(day, "EEEE, d. MMMM yyyy", { locale: sl })}, ${
                          disabled ? "ni prostih terminov" : "prosti termini"
                        }`}
                      >
                        {todayDate && (
                          <span
                            className={cn(
                              "absolute top-1 h-1.5 w-1.5 rounded-full",
                              selected ? "bg-white" : disabled ? "bg-graphite-300" : "bg-brand-500"
                            )}
                            aria-hidden
                          />
                        )}
                        <span>{format(day, "d")}</span>
                      </button>
                    </div>
                  );
                })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-graphite-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white ring-1 ring-paper-300" aria-hidden />
              Prosto
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-paper-200 ring-1 ring-paper-300" aria-hidden />
              Zasedeno
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-500" aria-hidden />
              Izbrano
            </span>
          </div>
        </div>

        <TimeSlotsPanel
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          isLoading={isLoadingSlots}
          onTimeSelect={(slot) => void handleTimeSelect(slot)}
          className="h-fit"
        />
      </div>

      <AnimatePresence>
        <StorageUpsell currency={currency} />
      </AnimatePresence>

      {storageSelection.enabled && storageSelection.upsellAnswered && (
        <div className="rounded-2xl border border-paper-300 bg-white p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-graphite-900">Shranjevanje pnevmatik</h3>
              <p className="mt-1 text-sm text-graphite-500">Izberite število kompletov za shranjevanje.</p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-brand-600">
              {formatMoney(bookingConfig.storage.unitPrice * storageSelection.komplets, currency)}
            </p>
          </div>
          <QuantitySelector />
        </div>
      )}

      <div className="flex justify-start gap-3 sm:justify-end">
        <Button type="button" onClick={() => goToStep(2)} disabled={!canContinue}>
          Nadaljuj
        </Button>
      </div>
    </section>
  );
}

function CustomerStep() {
  const customerDetails = useBookingStore((state) => state.customerDetails);
  const setCustomerDetails = useBookingStore((state) => state.setCustomerDetails);
  const goToStep = useBookingStore((state) => state.goToStep);
  const { availableAddOns, isLoadingAddOns } = usePromotionsStore();
  const [firstName, setFirstName] = useState(customerDetails?.firstName ?? "");
  const [lastName, setLastName] = useState(customerDetails?.lastName ?? "");
  const [email, setEmail] = useState(customerDetails?.email ?? "");
  const [phone, setPhone] = useState(customerDetails?.phone ?? "");
  const [gender, setGender] = useState(customerDetails?.gender ?? "");
  const [notes, setNotes] = useState(customerDetails?.notes ?? "");
  const [privacyConsent, setPrivacyConsent] = useState(customerDetails?.privacyConsent ?? false);
  const [gdprSendMarketing, setGdprSendMarketing] = useState(customerDetails?.gdprSendMarketing ?? false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!firstName.trim()) nextErrors.firstName = "Ime je obvezno.";
    if (!lastName.trim()) nextErrors.lastName = "Priimek je obvezen.";
    if (!email.trim()) nextErrors.email = "Email je obvezen.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Vnesite veljaven email.";
    if (!phone.trim()) nextErrors.phone = "Telefon je obvezen.";
    if (!privacyConsent) nextErrors.privacy = "Potrdite obdelavo osebnih podatkov.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    const details: CustomerDetails = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: email.trim(),
      phone: sanitizeInput(phone),
      gender: gender || undefined,
      notes: notes.trim() || undefined,
      privacyConsent,
      gdprSendMarketing,
    };
    setCustomerDetails(details);
    goToStep(4);
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-normal text-brand-600">Tvoji podatki</p>
        <h2 className="font-display text-4xl font-semibold leading-tight text-graphite-900">
          Kam pošljemo potrditev?
        </h2>
        <p className="mt-3 max-w-2xl text-base text-graphite-500">
          Podatke uporabimo samo za potrditev termina in pripravo servisa.
        </p>
      </div>

      <AddOnSelector addOns={availableAddOns} isLoading={isLoadingAddOns} primaryColor="#e11d2e" />

      <div className="grid gap-5 rounded-2xl border border-paper-300 bg-white p-6 shadow-soft md:grid-cols-2">
        <Input label="Ime" required value={firstName} onChange={(event) => setFirstName(event.target.value)} error={errors.firstName} />
        <Input label="Priimek" required value={lastName} onChange={(event) => setLastName(event.target.value)} error={errors.lastName} />
        <Input
          label="Email"
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <Input
          label="Telefon"
          required
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={errors.phone}
        />
        <div className="md:col-span-2">
          <label id="gender-label" className="mb-2 block text-sm font-medium text-graphite-900">
            Nagovor
          </label>
          <div
            role="radiogroup"
            aria-labelledby="gender-label"
            className="grid gap-1 rounded-2xl border border-paper-300 bg-paper-100 p-1 sm:grid-cols-4"
          >
            {[
              { value: "", label: "Brez nagovora" },
              { value: "male", label: "Gospod" },
              { value: "female", label: "Gospa" },
              { value: "other", label: "Drugo" },
            ].map((option) => {
              const selected = gender === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setGender(option.value)}
                  className={cn(
                    "min-h-11 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                    "focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2",
                    selected
                      ? "bg-white text-brand-700 shadow-soft ring-1 ring-brand-500/25"
                      : "text-graphite-600 hover:bg-white/70 hover:text-graphite-900"
                  )}
                  role="radio"
                  aria-checked={selected}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-2">
          <Textarea
            label="Opombe"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Dodatne želje, posebnosti vozila ali vprašanja."
            rows={4}
          />
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-graphite-600">
            <input
              type="checkbox"
              checked={gdprSendMarketing}
              onChange={(event) => setGdprSendMarketing(event.target.checked)}
              className="mt-1 h-5 w-5 rounded border-paper-300 text-brand-500 focus:ring-brand-500"
            />
            Želim prejemati obvestila o ponudbah in novostih.
          </label>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-graphite-600">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(event) => setPrivacyConsent(event.target.checked)}
              className="mt-1 h-5 w-5 rounded border-paper-300 text-brand-500 focus:ring-brand-500"
            />
            <span>
              Strinjam se z obdelavo osebnih podatkov za namen rezervacije termina.
              <span className="ml-1 text-brand-500">*</span>
            </span>
          </label>
          {errors.privacy && (
            <p className="text-xs text-brand-600" role="alert">
              {errors.privacy}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <Button type="button" variant="secondary" onClick={() => goToStep(2)}>
          Nazaj
        </Button>
        <Button type="button" onClick={handleContinue}>
          Nadaljuj
        </Button>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-paper-200 py-3 last:border-b-0">
      <dt className="text-sm font-medium text-graphite-500">{label}</dt>
      <dd className="max-w-[65%] text-right text-sm font-semibold text-graphite-900">{value}</dd>
    </div>
  );
}

function ConfirmationStep({ currency }: { currency: string }) {
  const company = useBookingStore((state) => state.company);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedTime = useBookingStore((state) => state.selectedTime);
  const customerDetails = useBookingStore((state) => state.customerDetails);
  const vehicleDetails = useBookingStore((state) => state.vehicleDetails);
  const storageSelection = useBookingStore((state) => state.storageSelection);
  const requiredResursiIds = useBookingStore((state) => state.requiredResursiIds);
  const storitveResursiMap = useBookingStore((state) => state.storitveResursiMap);
  const availableServices = useBookingStore((state) => state.services);
  const language = useBookingStore((state) => state.language);
  const goToStep = useBookingStore((state) => state.goToStep);
  const setSubmitting = useBookingStore((state) => state.setSubmitting);
  const isSubmitting = useBookingStore((state) => state.isSubmitting);
  const setBookingConfirmation = useBookingStore((state) => state.setBookingConfirmation);
  const selectTime = useBookingStore((state) => state.selectTime);
  const services = useBookingServices();
  const { activePromotion, selectedAddOn } = usePromotionsStore();
  const [error, setError] = useState("");

  const storageTotal = storageSelection.enabled ? bookingConfig.storage.unitPrice * storageSelection.komplets : 0;
  const servicesBase = services.reduce((sum, service) => sum + Number(service.cena), 0);
  const discountAmount = activePromotion?.popustZnesek ?? 0;
  const servicesFinal = Math.max(0, servicesBase - discountAmount);
  const originalCena = servicesBase + storageTotal;
  const finalCena = servicesFinal + storageTotal;
  const totalDuration = getBookingDuration(services, storageSelection.enabled, availableServices);
  const bookingServiceIds = useMemo(
    () => getBookingServiceIds(services, storageSelection.enabled),
    [services, storageSelection.enabled]
  );
  const bookingResursiIds = useMemo(
    () => getBookingResursiIds(requiredResursiIds, storageSelection.enabled, storitveResursiMap),
    [requiredResursiIds, storageSelection.enabled, storitveResursiMap]
  );

  const handleKnownError = (code?: string) => {
    if (code === "slot_taken" || code === "resurs_taken" || code === "no_employee_available") {
      setError("Termin ni več na voljo. Izberite drug datum ali uro.");
      selectTime("");
      goToStep(1);
      return true;
    }
    return false;
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !customerDetails || !vehicleDetails || services.length === 0) {
      setError("Manjkajo podatki za rezervacijo.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const date = format(selectedDate, "yyyy-MM-dd");
      const slotCheck = await checkSlotAvailable({
        companySlug: bookingConfig.companySlug,
        serviceIds: bookingServiceIds,
        employeeId: bookingConfig.fixedEmployeeId,
        anyPerson: false,
        eligibleEmployeeIds: [],
        date,
        time: selectedTime,
        resursiIds: bookingResursiIds.length > 0 ? bookingResursiIds : undefined,
      });

      if (!slotCheck.available) {
        const err = new Error(slotCheck.reason || "slot_taken") as Error & { code?: string };
        err.code = slotCheck.reason || "slot_taken";
        throw err;
      }

      const serviceName = services.map((service) => service.naziv).join(" + ");
      const payload: BookingSubmission = {
        action: "create",
        companySlug: bookingConfig.companySlug,
        date,
        time: selectedTime,
        serviceIds: bookingServiceIds,
        employeeId: bookingConfig.fixedEmployeeId,
        any_person: false,
        eligibleEmployeeIds: [],
        resursiIds: bookingResursiIds,
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        email: customerDetails.email,
        phone: customerDetails.phone,
        gender: customerDetails.gender ?? "",
        notes: buildNotes(vehicleDetails, storageSelection, customerDetails.notes),
        privacy_consent: customerDetails.privacyConsent ?? false,
        marketing_consent: customerDetails.gdprSendMarketing ?? false,
        consent_timestamp: new Date().toISOString(),
        language,
        originalCena,
        finalCena,
      };

      if (activePromotion) {
        payload.promocijaTip = activePromotion.type;
        payload.promocijaNaziv = activePromotion.naziv ?? null;
        payload.popust = activePromotion.popustZnesek;
        payload.popustTip = activePromotion.tipPopusta === "percentage" ? "%" : "valuta";
        if (activePromotion.type === "popust") payload.popust_id = activePromotion.id;
        if (activePromotion.type === "happy_hour") payload.happy_hour_id = activePromotion.id;
      }

      if (selectedAddOn) {
        payload.addOnServiceId = selectedAddOn.id;
        payload.addOnNaziv = selectedAddOn.naziv ?? null;
        payload.addOnOriginalCena = selectedAddOn.originalCena;
        payload.addOnFinalCena = selectedAddOn.finalCena;
        payload.addOnPopust = selectedAddOn.popustZnesek;
        payload.addOnPopustTip = selectedAddOn.tipPopusta === "percentage" ? "%" : "valuta";
        payload.addOnTrajanjeMin = selectedAddOn.trajanjeMin;
      }

      const confirmation = await submitBookingPayload(payload);

      if (confirmation.requiresPayment === true) {
        const appointmentId = String(confirmation.terminRowId ?? confirmation.terminId ?? "");
        const returnServiceName = confirmation.storitev || serviceName;
        const returnDate = confirmation.datum || format(selectedDate, "d. MMMM yyyy", { locale: sl });
        const returnTime = confirmation.cas || selectedTime;
        const customerName = `${customerDetails.firstName} ${customerDetails.lastName}`;
        const returnCurrency = currencySymbol(confirmation.currency ?? company?.valuta);
        const paymentReturnDetails = {
          serviceName: returnServiceName,
          date: returnDate,
          time: returnTime,
          customerName,
          storageKomplets: storageSelection.enabled ? storageSelection.komplets : undefined,
          storageTotal: storageSelection.enabled ? storageTotal : undefined,
          currency: returnCurrency,
        };

        await redirectToCheckout({
          companySlug: bookingConfig.companySlug,
          appointmentId,
          amount: confirmation.paymentAmount ?? finalCena,
          currency: confirmation.currency ?? company?.valuta ?? "EUR",
          serviceName: returnServiceName,
          customerEmail: customerDetails.email,
          customerName,
          language,
          paymentMode: confirmation.paymentMode ?? "full",
          successUrl: buildPaymentReturnUrl("success", paymentReturnDetails),
          cancelUrl: buildPaymentReturnUrl("cancelled", paymentReturnDetails),
        });
        return;
      }

      setBookingConfirmation({
        success: true,
        message: confirmation.message || "Termin je rezerviran!",
        storitev: confirmation.storitev || serviceName,
        datum: confirmation.datum || format(selectedDate, "d. MMMM yyyy", { locale: sl }),
        cas: confirmation.cas || selectedTime,
      });
    } catch (err) {
      const code = err instanceof Error ? (err as Error & { code?: string }).code : undefined;
      if (!handleKnownError(code)) {
        setError(err instanceof Error ? err.message : "Rezervacija ni uspela. Poskusite znova.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-normal text-brand-600">Povzetek in potrditev</p>
        <h2 className="font-display text-4xl font-semibold leading-tight text-graphite-900">
          Preverite rezervacijo
        </h2>
        <p className="mt-3 max-w-2xl text-base text-graphite-500">
          Pred potrditvijo še enkrat preverimo razpoložljivost termina.
        </p>
      </div>

      <div className="rounded-2xl border border-paper-300 bg-white p-6 shadow-soft">
        <dl>
          <SummaryRow label="Storitev" value={services.map((service) => service.naziv).join(" + ")} />
          <SummaryRow label="Trajanje" value={formatDuration(totalDuration)} />
          <SummaryRow label="Pnevmatike" value={vehicleDetails?.tireSize} />
          <SummaryRow label="Tip vozila" value={getVehicleLabel(vehicleDetails)} />
          <SummaryRow
            label="Datum in ura"
            value={
              selectedDate && selectedTime
                ? `${format(selectedDate, "d. MMMM yyyy", { locale: sl })} ob ${selectedTime}`
                : ""
            }
          />
          <SummaryRow
            label="Ime"
            value={customerDetails ? `${customerDetails.firstName} ${customerDetails.lastName}` : ""}
          />
          <SummaryRow label="Kontakt" value={customerDetails ? `${customerDetails.email}, ${customerDetails.phone}` : ""} />
          {storageSelection.enabled && (
            <SummaryRow
              label="Shranjevanje pnevmatik"
              value={`${formatKomplets(storageSelection.komplets)} - ${formatMoney(storageTotal, currency)}`}
            />
          )}
        </dl>

        <div className="mt-5 border-t border-paper-200 pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-graphite-500">Skupaj</p>
              {activePromotion && (
                <p className="mt-1 text-sm text-success">
                  Popust: {formatMoney(activePromotion.popustZnesek, currency)}
                </p>
              )}
            </div>
            <div className="text-right">
              {activePromotion && (
                <p className="text-sm text-graphite-400 line-through">{formatMoney(originalCena, currency)}</p>
              )}
              <p className="font-display text-4xl font-semibold text-graphite-900">
                {formatMoney(finalCena, currency)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-between gap-3">
        <Button type="button" variant="secondary" onClick={() => goToStep(3)} disabled={isSubmitting}>
          Nazaj
        </Button>
        <Button type="button" onClick={() => void handleConfirm()} loading={isSubmitting}>
          Potrdi rezervacijo
        </Button>
      </div>
    </section>
  );
}

function SuccessView({ currency }: { currency: string }) {
  const bookingConfirmation = useBookingStore((state) => state.bookingConfirmation);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedTime = useBookingStore((state) => state.selectedTime);
  const customerDetails = useBookingStore((state) => state.customerDetails);
  const storageSelection = useBookingStore((state) => state.storageSelection);
  const services = useBookingServices();
  const storageTotal = storageSelection.enabled ? bookingConfig.storage.unitPrice * storageSelection.komplets : 0;

  return (
    <section className="mx-auto max-w-2xl py-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <CheckCircle2 className="h-10 w-10" aria-hidden />
      </div>
      <h1 className="mt-6 font-display text-5xl font-semibold text-graphite-900">Termin je rezerviran!</h1>
      <p className="mt-3 text-base text-graphite-500">Na vaš email smo poslali potrditev.</p>

      <div className="mt-8 rounded-2xl border border-paper-300 bg-white p-6 text-left shadow-soft">
        <dl>
          <SummaryRow label="Storitev" value={services.map((service) => service.naziv).join(" + ")} />
          <SummaryRow
            label="Datum in ura"
            value={
              bookingConfirmation
                ? `${bookingConfirmation.datum} ob ${bookingConfirmation.cas}`
                : selectedDate && selectedTime
                  ? `${format(selectedDate, "d. MMMM yyyy", { locale: sl })} ob ${selectedTime}`
                  : ""
            }
          />
          {storageSelection.enabled && (
            <SummaryRow
              label="Shranjevanje pnevmatik"
              value={`${formatKomplets(storageSelection.komplets)} - ${formatMoney(storageTotal, currency)}`}
            />
          )}
          <SummaryRow label="Ime" value={customerDetails ? `${customerDetails.firstName} ${customerDetails.lastName}` : ""} />
        </dl>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">Nazaj na domačo stran</Button>
        <Button type="button" variant="secondary" onClick={() => window.location.reload()}>
          Rezerviraj še en termin
        </Button>
      </div>
    </section>
  );
}

function PaymentSuccessReturnView({ paymentReturn }: { paymentReturn: PaymentReturnState }) {
  const currency = paymentReturn.currency || "€";
  const storageKomplets = paymentReturn.storageKomplets ? Number(paymentReturn.storageKomplets) : 0;
  const storageTotal =
    paymentReturn.storageTotal && Number.isFinite(Number(paymentReturn.storageTotal))
      ? Number(paymentReturn.storageTotal)
      : null;

  return (
    <section className="mx-auto max-w-2xl py-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <CheckCircle2 className="h-10 w-10" aria-hidden />
      </div>
      <h1 className="mt-6 font-display text-5xl font-semibold text-graphite-900">Termin je rezerviran!</h1>
      <p className="mt-3 text-base text-graphite-500">
        Plačilo je uspešno. Na vaš email smo poslali potrditev.
      </p>

      <div className="mt-8 rounded-2xl border border-paper-300 bg-white p-6 text-left shadow-soft">
        <dl>
          {paymentReturn.service && <SummaryRow label="Storitev" value={paymentReturn.service} />}
          {(paymentReturn.date || paymentReturn.time) && (
            <SummaryRow
              label="Datum in ura"
              value={`${paymentReturn.date ?? ""}${paymentReturn.time ? ` ob ${paymentReturn.time}` : ""}`}
            />
          )}
          {storageKomplets > 0 && (
            <SummaryRow
              label="Shranjevanje pnevmatik"
              value={`${formatKomplets(storageKomplets)}${
                storageTotal !== null ? ` - ${formatMoney(storageTotal, currency)}` : ""
              }`}
            />
          )}
          {paymentReturn.name && <SummaryRow label="Ime" value={paymentReturn.name} />}
        </dl>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">Nazaj na domačo stran</Button>
        <Button href="/rezervacija" variant="secondary">
          Rezerviraj še en termin
        </Button>
      </div>
    </section>
  );
}

function PaymentCancelledReturnView() {
  return (
    <section className="mx-auto max-w-2xl py-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Info className="h-10 w-10" aria-hidden />
      </div>
      <h1 className="mt-6 font-display text-5xl font-semibold text-graphite-900">Plačilo ni bilo dokončano</h1>
      <p className="mt-3 text-base text-graphite-500">
        Rezervacija čaka na plačilo oziroma ni bila dokončana. Za nov poskus začnite rezervacijo znova.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/rezervacija">Nazaj na rezervacijo</Button>
        <Button href="/" variant="secondary">
          Nazaj na domačo stran
        </Button>
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center py-24 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-brand-100 border-t-brand-500" aria-hidden />
      <h1 className="mt-6 font-display text-4xl font-semibold text-graphite-900">Pripravljamo rezervacijo</h1>
      <p className="mt-2 text-graphite-500">Nalagamo storitve in razpoložljive nastavitve.</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-2xl py-24 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Info className="h-7 w-7" aria-hidden />
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold text-graphite-900">Rezervacije ni bilo mogoče naložiti</h1>
      <p className="mt-3 text-graphite-500">{message}</p>
      <Button type="button" className="mt-8" onClick={onRetry}>
        Poskusi znova
      </Button>
    </div>
  );
}

export function KozamurnikBooking({ paymentReturn }: { paymentReturn?: PaymentReturnState }) {
  const currentStep = useBookingStore((state) => state.currentStep);
  const company = useBookingStore((state) => state.company);
  const setInitData = useBookingStore((state) => state.setInitData);
  const setLoading = useBookingStore((state) => state.setLoading);
  const addService = useBookingStore((state) => state.addService);
  const goToStep = useBookingStore((state) => state.goToStep);
  const resetBooking = useBookingStore((state) => state.reset);
  const isLoading = useBookingStore((state) => state.isLoading);
  const bookingConfirmation = useBookingStore((state) => state.bookingConfirmation);
  const reducedMotion = useReducedMotionSafe();
  const [loadError, setLoadError] = useState("");
  const currency = currencySymbol(company?.valuta);

  const loadInit = useCallback(async () => {
    resetBooking();
    setLoading(true);
    setLoadError("");
    usePromotionsStore.getState().resetSelections();
    try {
      const data = await fetchInitData(bookingConfig.companySlug);
      setInitData(data);
      addService(getPrimaryBookingService(data.services ?? []));
      goToStep(1);

      const companyId = data.company?.idPodjetja;
      const serviceIds = (data.services ?? []).map((service) => String(service.id));
      if (companyId && serviceIds.length) {
        const discounts = await fetchActiveDiscounts(companyId, serviceIds);
        const enriched = Object.fromEntries(
          Object.entries(discounts).map(([serviceId, promotion]) => {
            const service = data.services.find((item) => String(item.id) === serviceId);
            if (!service) return [serviceId, promotion];
            const discount = calculateDiscount(Number(service.cena), promotion.tipPopusta, promotion.vrednost);
            return [
              serviceId,
              {
                ...promotion,
                originalCena: Number(service.cena),
                finalCena: discount.finalCena,
                popustZnesek: discount.popustZnesek,
              },
            ];
          })
        );
        usePromotionsStore.getState().setServiceDiscounts(enriched);
      }
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Napaka pri nalaganju rezervacijskega sistema.");
    } finally {
      setLoading(false);
    }
  }, [addService, goToStep, resetBooking, setInitData, setLoading]);

  useEffect(() => {
    if (paymentReturn) return;

    const timeout = window.setTimeout(() => {
      void loadInit();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadInit, paymentReturn]);

  const liveLabels: Record<number, string> = {
      1: "Izberi datum in uro",
      2: "Podatki o vozilu",
      3: "Tvoji podatki",
      4: "Povzetek in potrditev",
  };
  const liveMessage = liveLabels[currentStep] ?? "";

  if (paymentReturn?.status === "success") {
    return (
      <div className="bg-paper">
        <div className={bookingShellClass}>
          <div className="mb-8">
            <ReassuranceRow />
          </div>
          <div className="rounded-2xl border border-paper-300 bg-white p-5 shadow-card sm:p-8 lg:p-10">
            <PaymentSuccessReturnView paymentReturn={paymentReturn} />
          </div>
        </div>
      </div>
    );
  }

  if (paymentReturn?.status === "cancelled") {
    return (
      <div className="bg-paper">
        <div className={bookingShellClass}>
          <div className="rounded-2xl border border-paper-300 bg-white p-5 shadow-card sm:p-8 lg:p-10">
            <PaymentCancelledReturnView />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading && !company) return <LoadingState />;
  if (loadError) return <ErrorState message={loadError} onRetry={() => void loadInit()} />;

  return (
    <div className="bg-paper">
      <div className={bookingShellClass}>
        <div className="mb-8 space-y-5">
          <ReassuranceRow />
          {!bookingConfirmation?.success && <StepIndicator />}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-paper-300 bg-white p-5 shadow-card sm:p-8 lg:p-10">
            <span className="sr-only" aria-live="polite">
              {liveMessage}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={bookingConfirmation?.success ? "success" : currentStep}
                variants={stepVariants}
                initial={false}
                animate="animate"
                exit={reducedMotion ? { opacity: 0 } : "exit"}
                transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
              >
                {bookingConfirmation?.success ? (
                  <SuccessView currency={currency} />
                ) : currentStep === 1 ? (
                  <DateTimeStep currency={currency} />
                ) : currentStep === 2 ? (
                  <VehicleStep />
                ) : currentStep === 3 ? (
                  <CustomerStep />
                ) : currentStep === 4 ? (
                  <ConfirmationStep currency={currency} />
                ) : (
                  <ConfirmationStep currency={currency} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!bookingConfirmation?.success && (
            <aside className="h-fit rounded-2xl border border-paper-300 bg-paper-50 p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <CircleGauge className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="font-semibold text-graphite-900">KOZAMURNIK Center mobilnosti</p>
                  <p className="text-sm text-graphite-500">Bukovska vas 15, Šentjanž</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-graphite-600">
                <p>
                  Rezervacija je brezplačna. Če termina ne morete izkoristiti, nas prosimo pravočasno obvestite.
                </p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
