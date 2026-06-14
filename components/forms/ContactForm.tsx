"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import { contactSchema, type ContactFormData, temaLabels } from "@/lib/schema";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";

const temaOptions = Object.entries(temaLabels).map(([value, label]) => ({ value, label }));

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { tema: "vprasanje" },
  });

  async function onSubmit(data: ContactFormData) {
    if (data._company) return; // Honeypot
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Napaka pri pošiljanju.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Prišlo je do napake. Poskusite znova.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl min-h-[400px] bg-paper-100 border border-paper-300">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-success" aria-hidden />
        </div>
        <h3 className="font-display font-medium text-2xl text-graphite-900 mb-2">
          Sporočilo je bilo poslano!
        </h3>
        <p className="text-sm text-graphite-500 mb-6">
          Odgovorili vam bomo v najkrajšem možnem času.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
        >
          Pošlji novo sporočilo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
        {...register("_company")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Ime in priimek"
          placeholder="Janez Novak"
          required
          error={errors.ime?.message}
          {...register("ime")}
        />
        <Input
          label="E-naslov"
          type="email"
          placeholder="janez@primer.si"
          required
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Telefon"
          type="tel"
          placeholder="+386 41 123 456"
          error={errors.telefon?.message}
          {...register("telefon")}
        />
        <Select
          label="Tema"
          required
          options={temaOptions}
          placeholder="Izberite temo"
          error={errors.tema?.message}
          {...register("tema")}
        />
      </div>

      <Textarea
        label="Sporočilo"
        placeholder="Opišite vaše vprašanje ali potrebo..."
        required
        rows={5}
        error={errors.sporocilo?.message}
        {...register("sporocilo")}
      />

      <Checkbox
        label={
          <span>
            Strinjam se z obdelavo osebnih podatkov za namen odgovora na moje vprašanje.{" "}
            <span className="text-brand-500">*</span>
          </span>
        }
        error={errors.zasebnost?.message}
        {...register("zasebnost")}
      />

      {status === "error" && (
        <div
          className="flex items-start gap-3 p-4 bg-brand-50 border border-brand-100 rounded-xl"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" aria-hidden />
          <p className="text-sm text-brand-600">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-brand transition-colors"
      >
        {status === "loading" ? (
          <>
            <svg
              className="animate-spin h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Pošiljam...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 shrink-0" aria-hidden />
            Pošlji sporočilo
          </>
        )}
      </button>
    </form>
  );
}
