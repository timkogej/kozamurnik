import { z } from "zod";

export const contactSchema = z.object({
  ime: z.string().min(2, "Vpišite vsaj 2 znaka"),
  email: z.string().email("Vnesite veljaven e-naslov"),
  telefon: z
    .string()
    .optional()
    .refine((val) => !val || /^[\d\s+\-()]{6,20}$/.test(val), {
      message: "Vnesite veljavno telefonsko številko",
    }),
  tema: z.enum(["vprasanje", "pnevmatike", "avtovleka", "drugo"]),
  sporocilo: z
    .string()
    .min(10, "Sporočilo mora vsebovati vsaj 10 znakov")
    .max(1000, "Sporočilo je predolgo (največ 1000 znakov)"),
  zasebnost: z.boolean().refine((val) => val === true, {
    message: "Strinjanje je obvezno",
  }),
  _company: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const temaLabels: Record<string, string> = {
  vprasanje: "Vprašanje",
  pnevmatike: "Povpraševanje po pnevmatikah",
  avtovleka: "Avtovleka",
  drugo: "Drugo",
};
