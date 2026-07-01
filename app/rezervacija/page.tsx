import type { Metadata } from "next";
import { KozamurnikBooking, type PaymentReturnState } from "@/components/booking/KozamurnikBooking";

export const metadata: Metadata = {
  title: "Rezervacija termina",
  description: "Rezervirajte termin za vulkanizerstvo, menjavo pnevmatik in povezane storitve pri Kozamurnik Center mobilnosti.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RezervacijaPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = firstParam(params.payment);
  const paymentReturn: PaymentReturnState | undefined =
    status === "success" || status === "cancelled"
      ? {
          status,
          service: firstParam(params.service),
          date: firstParam(params.date),
          time: firstParam(params.time),
          name: firstParam(params.name),
          storageKomplets: firstParam(params.storageKomplets),
          storageTotal: firstParam(params.storageTotal),
          currency: firstParam(params.currency),
        }
      : undefined;

  return <KozamurnikBooking paymentReturn={paymentReturn} />;
}
