import { create } from 'zustand';
import {
  BookingStep,
  EmployeeUI,
  Category,
  Service,
  CustomerDetails,
  VehicleDetails,
  StorageSelection,
  Theme,
  Company,
  Resurs,
  DaySlots,
  SupportedLanguage,
  StripePaymentInfo,
  InitResponse,
} from '@/types';
import { DEFAULT_THEME } from '@/lib/api';
import { bookingConfig } from '@/lib/booking-config';

// ─────────────────────────────────────────────────────────────────────────────
// Helper — read persisted language preference (SSR-safe)
// ─────────────────────────────────────────────────────────────────────────────
function getPersistedLanguage(): SupportedLanguage {
  return 'sl';
}

// ─────────────────────────────────────────────────────────────────────────────
// State + Actions interface
// ─────────────────────────────────────────────────────────────────────────────
interface BookingState {
  // ── Step ────────────────────────────────────────────────────────────────────
  /** Current booking step. 1–6 = standard flow, 7 = Stripe payment gate */
  currentStep: BookingStep;

  // ── Theme ────────────────────────────────────────────────────────────────────
  theme: Theme;

  // ── Company ──────────────────────────────────────────────────────────────────
  company: Company | null;

  // ── Static data from init ────────────────────────────────────────────────────
  employeesUI: EmployeeUI[];
  categories: Category[];
  services: Service[];
  servicesByCategory: Record<string, Service[]>;
  /** service text ID → array of employee text IDs that can perform it */
  employeesByServiceId: Record<string, (string | number)[]>;

  // ── Resources ────────────────────────────────────────────────────────────────
  /** Physical resources (rooms, equipment) from "Resursi" table */
  resursi: Resurs[];
  /** service text ID → resurs row IDs required for that service */
  storitveResursiMap: Record<string, number[]>;

  // ── Selections — legacy single-service (kept for variant component compat) ───
  /** Always equals selectedServices[0] or null — kept for backward compat */
  selectedService: Service | null;
  selectedEmployeeId: string | null;
  anyPerson: boolean;
  /** Intersection of employees eligible for ALL currently selected services */
  eligibleEmployeeIds: string[];
  selectedCategory: Category | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  customerDetails: CustomerDetails | null;
  vehicleDetails: VehicleDetails | null;
  storageSelection: StorageSelection;

  // ── Primary service ──────────────────────────────────────────────────────────
  /** One selected primary service. Storage is appended separately as service ID 46. */
  selectedServices: Service[];
  /** This project allows one primary service; storage is appended separately as service ID 46. */
  multipleServicesAllowed: boolean;
  /** Kept for backward compatibility with older variants. */
  noEmployeeForCombination: boolean;
  /** Deduplicated union of resursiIds required by all selected services */
  requiredResursiIds: number[];
  /** Sum of trajanjeMin for all selected services */
  totalDurationMin: number;

  // ── Range-based slots cache ──────────────────────────────────────────────────
  /** Map of 'yyyy-MM-dd' → DaySlots for all fetched dates */
  slotsMap: Record<string, DaySlots>;
  isLoadingSlots: boolean;

  // ── Language ─────────────────────────────────────────────────────────────────
  /** ISO language code for notification emails */
  language: SupportedLanguage;

  // ── Stripe ───────────────────────────────────────────────────────────────────
  stripeEnabled: boolean;
  stripePaymentMode: 'full' | 'deposit';
  stripeDepositPercent: number;
  stripePaymentInfo: StripePaymentInfo | null;

  // ── Company config flags ─────────────────────────────────────────────────────
  /** When false, employee selection step is hidden; all bookings use any_person=true */
  prikazZaposlenih: boolean;
  /** Maximum days ahead a booking can be made */
  maxDniRezervacija: number;

  // ── Loading / result ─────────────────────────────────────────────────────────
  isLoading: boolean;
  isSubmitting: boolean;
  bookingConfirmation: {
    success: boolean;
    message: string;
    storitev: string;
    datum: string;
    cas: string;
  } | null;

  // ── Actions — init ───────────────────────────────────────────────────────────

  /**
   * Hydrate all store state from a single init response.
   * Variant page components that still use individual setters continue to work.
   */
  setInitData: (data: InitResponse) => void;

  // ── Actions — individual setters (kept for variant page backward compat) ─────
  setTheme: (theme: Theme) => void;
  setCompany: (company: Company) => void;
  setEmployeesUI: (employees: EmployeeUI[]) => void;
  setCategories: (categories: Category[]) => void;
  setServices: (services: Service[]) => void;
  setServicesByCategory: (data: Record<string, Service[]>) => void;
  setEmployeesByServiceId: (data: Record<string, (string | number)[]>) => void;

  // ── Actions — selections ─────────────────────────────────────────────────────
  selectEmployee: (employeeId: string | null, isAnyPerson?: boolean) => void;
  selectCategory: (category: Category) => void;
  /** Single-service select; keeps selectedServices in sync for backward compat */
  selectService: (service: Service) => void;
  /** Combined category+service selection (used in compact step 1/2 variants) */
  selectCategoryAndService: (category: Category, service: Service) => void;
  selectDate: (date: Date) => void;
  selectTime: (time: string) => void;
  setCustomerDetails: (details: CustomerDetails) => void;
  setVehicleDetails: (details: VehicleDetails) => void;
  toggleStorage: (enabled: boolean) => void;
  setStorageKomplets: (komplets: number) => void;
  markStorageUpsellShown: () => void;
  answerStorageUpsell: (enabled: boolean) => void;

  // ── Actions — multi-service ──────────────────────────────────────────────────
  /** Select one primary service. Storage is appended separately as service ID 46. */
  addService: (service: Service) => void;
  /** Remove a service by ID; recomputes derived values. */
  removeService: (serviceId: string) => void;

  // ── Actions — step navigation ────────────────────────────────────────────────
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: BookingStep) => void;
  /** Navigate directly to step 7 (Stripe payment) */
  goToPayment: () => void;

  // ── Actions — slots / stripe / language ─────────────────────────────────────
  setSlotsMap: (map: Record<string, DaySlots>) => void;
  setLoadingSlots: (v: boolean) => void;
  setStripePaymentInfo: (info: StripePaymentInfo | null) => void;
  setLanguage: (lang: SupportedLanguage) => void;

  // ── Actions — loading / result ───────────────────────────────────────────────
  setLoading: (loading: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
  setBookingConfirmation: (confirmation: BookingState['bookingConfirmation']) => void;

  reset: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial state
// ─────────────────────────────────────────────────────────────────────────────
const initialState: Omit<BookingState,
  | 'setInitData' | 'setTheme' | 'setCompany' | 'setEmployeesUI'
  | 'setCategories' | 'setServices' | 'setServicesByCategory'
  | 'setEmployeesByServiceId' | 'selectEmployee' | 'selectCategory'
  | 'selectService' | 'selectCategoryAndService' | 'selectDate'
  | 'selectTime' | 'setCustomerDetails' | 'setVehicleDetails'
  | 'toggleStorage' | 'setStorageKomplets' | 'markStorageUpsellShown'
  | 'answerStorageUpsell' | 'addService' | 'removeService'
  | 'nextStep' | 'prevStep' | 'goToStep' | 'goToPayment'
  | 'setSlotsMap' | 'setLoadingSlots' | 'setStripePaymentInfo' | 'setLanguage'
  | 'setLoading' | 'setSubmitting' | 'setBookingConfirmation' | 'reset'
> = {
  currentStep: 1 as BookingStep,
  theme: DEFAULT_THEME,
  company: null,
  employeesUI: [],
  categories: [],
  services: [],
  servicesByCategory: {},
  employeesByServiceId: {},
  resursi: [],
  storitveResursiMap: {},
  selectedService: null,
  selectedEmployeeId: null,
  anyPerson: false,
  eligibleEmployeeIds: [],
  selectedCategory: null,
  selectedDate: null,
  selectedTime: null,
  customerDetails: null,
  vehicleDetails: null,
  storageSelection: {
    enabled: false,
    komplets: 1,
    upsellShown: false,
    upsellAnswered: false,
  },
  selectedServices: [],
  multipleServicesAllowed: false,
  noEmployeeForCombination: false,
  requiredResursiIds: [],
  totalDurationMin: 0,
  slotsMap: {},
  isLoadingSlots: false,
  language: getPersistedLanguage(),
  stripeEnabled: false,
  stripePaymentMode: 'full',
  stripeDepositPercent: 30,
  stripePaymentInfo: null,
  prikazZaposlenih: true,
  maxDniRezervacija: 60,
  isLoading: false,
  isSubmitting: false,
  bookingConfirmation: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────────────────────────────────────
export const useBookingStore = create<BookingState>((set, get) => {

  // ── Internal helpers ─────────────────────────────────────────────────────────

  /**
   * Compute deduplicated union of resursi IDs required by all selected services.
   */
  function computeResursiFrom(services: Service[]): number[] {
    const { storitveResursiMap } = get();
    return Array.from(
      new Set(services.flatMap((svc) => storitveResursiMap[String(svc.id)] ?? []))
    );
  }

  /**
   * Build the derived state changes for a new services array, keeping the
   * current selectedEmployeeId if it is still in the eligible intersection.
   */
  function deriveFromServices(services: Service[]) {
    return {
      selectedServices: services,
      selectedService: services[0] ?? null,
      eligibleEmployeeIds: [],
      noEmployeeForCombination: false,
      selectedEmployeeId: String(bookingConfig.fixedEmployeeId),
      requiredResursiIds: computeResursiFrom(services),
      totalDurationMin: services.reduce((sum, s) => sum + s.trajanjeMin, 0),
    };
  }

  // ── Store object ─────────────────────────────────────────────────────────────

  return {
    ...initialState,

    // ── Init ──────────────────────────────────────────────────────────────────

    setInitData: (data) => {
      const { company, theme, employees_ui, serviceCategories, services,
        servicesByCategory, employeesByServiceId, resursi, storitveResursiMap } = data;

      const lang: SupportedLanguage = company.defaultLanguage ?? 'sl';

      set({
        company,
        theme: theme ? { ...DEFAULT_THEME, ...theme } : DEFAULT_THEME,
        employeesUI: employees_ui ?? [],
        categories: serviceCategories ?? [],
        services: services ?? [],
        servicesByCategory: servicesByCategory ?? {},
        employeesByServiceId: employeesByServiceId ?? {},
        resursi: resursi ?? [],
        storitveResursiMap: storitveResursiMap ?? {},
        multipleServicesAllowed: false,
        prikazZaposlenih: bookingConfig.showPersonSelection,
        maxDniRezervacija: company.max_dnevi_rezervacija ?? 60,
        stripeEnabled: company.stripe_enabled ?? false,
        stripePaymentMode: company.stripe_payment_mode ?? 'full',
        stripeDepositPercent: company.stripe_deposit_percent ?? 30,
        language: lang,
        selectedEmployeeId: String(bookingConfig.fixedEmployeeId),
        anyPerson: false,
        eligibleEmployeeIds: [],
      });
    },

    // ── Individual setters (variant page backward compat) ─────────────────────

    setTheme: (theme) => set({ theme }),

    setCompany: (company) => set({ company }),

    setEmployeesUI: (employeesUI) => set({ employeesUI }),

    setCategories: (categories) => set({ categories }),

    setServices: (services) => set({ services }),

    setServicesByCategory: (servicesByCategory) => set({ servicesByCategory }),

    setEmployeesByServiceId: (employeesByServiceId) => set({ employeesByServiceId }),

    // ── Selections ────────────────────────────────────────────────────────────

    selectEmployee: (employeeId, isAnyPerson = false) => {
      set({
        selectedEmployeeId: employeeId,
        anyPerson: isAnyPerson,
      });
      get().nextStep();
    },

    selectCategory: (category) => {
      set({
        selectedCategory: category,
        selectedService: null,
        selectedServices: [],
        selectedEmployeeId: null,
        anyPerson: false,
        eligibleEmployeeIds: [],
        noEmployeeForCombination: false,
        requiredResursiIds: [],
        totalDurationMin: 0,
      });
      get().nextStep();
    },

    selectService: (service) => {
      const derived = deriveFromServices([service]);
      set({
        ...derived,
        anyPerson: false,
        noEmployeeForCombination: false,
      });
      get().nextStep();
    },

    selectCategoryAndService: (category, service) => {
      const derived = deriveFromServices([service]);
      set({ selectedCategory: category, ...derived, anyPerson: false });
      get().goToStep(2);
    },

    selectDate: (date) => set({ selectedDate: date, selectedTime: null }),

    selectTime: (time) => {
      set({ selectedTime: time });
    },

    setCustomerDetails: (details) => set({ customerDetails: details }),

    setVehicleDetails: (vehicleDetails) => set({ vehicleDetails }),

    toggleStorage: (enabled) => set((state) => ({
      storageSelection: {
        ...state.storageSelection,
        enabled,
        komplets: enabled ? Math.max(1, state.storageSelection.komplets) : state.storageSelection.komplets,
        upsellAnswered: enabled ? true : state.storageSelection.upsellAnswered,
      },
    })),

    setStorageKomplets: (komplets) => set((state) => ({
      storageSelection: {
        ...state.storageSelection,
        komplets: Math.min(Math.max(1, komplets), bookingConfig.storage.maxKomplets),
      },
    })),

    markStorageUpsellShown: () => set((state) => ({
      storageSelection: {
        ...state.storageSelection,
        upsellShown: true,
      },
    })),

    answerStorageUpsell: (enabled) => set((state) => ({
      storageSelection: {
        ...state.storageSelection,
        enabled,
        komplets: enabled ? Math.max(1, state.storageSelection.komplets) : state.storageSelection.komplets,
        upsellShown: true,
        upsellAnswered: true,
      },
    })),

    // ── Primary service ───────────────────────────────────────────────────────

    addService: (service) => {
      set(deriveFromServices([service]));
    },

    removeService: (serviceId) => {
      const { selectedServices } = get();
      const updated = selectedServices.filter((s) => s.id !== serviceId);
      if (updated.length === selectedServices.length) return; // not found

      set({
        ...deriveFromServices(updated),
        // Clear employee auto-selection when services change
        selectedEmployeeId: null,
        anyPerson: false,
      });
    },

    // ── Step navigation ───────────────────────────────────────────────────────

    nextStep: () => {
      const { currentStep } = get();
      if (currentStep < 7) {
        set({ currentStep: (currentStep + 1) as BookingStep });
      }
    },

    prevStep: () => {
      const { currentStep } = get();
      if (currentStep === 7) {
        // Payment step: go back to confirmation
        set({ currentStep: 6 as BookingStep });
      } else if (currentStep === 3) {
        // Step 3 can be reached by skipping step 2 via selectCategoryAndService
        set({ currentStep: 1 as BookingStep });
      } else if (currentStep > 1) {
        set({ currentStep: (currentStep - 1) as BookingStep });
      }
    },

    goToStep: (step) => set({ currentStep: step }),

    goToPayment: () => set({ currentStep: 7 as BookingStep }),

    // ── Slots / Stripe / Language ─────────────────────────────────────────────

    setSlotsMap: (slotsMap) => set({ slotsMap }),

    setLoadingSlots: (isLoadingSlots) => set({ isLoadingSlots }),

    setStripePaymentInfo: (stripePaymentInfo) => set({ stripePaymentInfo }),

    setLanguage: (language) => {
      set({ language });
    },

    // ── Loading / result ──────────────────────────────────────────────────────

    setLoading: (isLoading) => set({ isLoading }),

    setSubmitting: (isSubmitting) => set({ isSubmitting }),

    setBookingConfirmation: (bookingConfirmation) => set({ bookingConfirmation }),

    reset: () => {
      // Preserve the user's language choice across resets
      const language = getPersistedLanguage();
      set({ ...initialState, language });
    },
  };
});
