export const bookingConfig = {
  companyCode: process.env.NEXT_PUBLIC_COMPANY_CODE ?? "7LHB28",
  companySlug:
    process.env.NEXT_PUBLIC_COMPANY_SLUG ||
    "jedroplus-d-o-o",
  webhookUrl: process.env.NEXT_PUBLIC_BOOKING_WEBHOOK_URL!,

  fixedEmployeeId: 21,
  showPersonSelection: false,
  primaryServiceId: "42",

  tireSizes: ['13"', '14"', '15"', '16"', '17"', '18"', '19"', '20"', '21"', '22"'],
  vehicleTypes: [
    { value: "avto", label: "Avto" },
    { value: "motor", label: "Motor" },
  ],

  storage: {
    enabled: true,
    label: "Shranjevanje pnevmatik",
    unitPrice: 15,
    currency: "€",
    maxKomplets: 4,
    serviceId: "46" as string | null,
  },
};
