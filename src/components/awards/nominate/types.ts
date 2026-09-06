export interface NominationFormData {
  nominatorName: string;
  nominatorTitle: string;
  nominatorOrganisation: string;
  nominatorEmail: string;
  nominatorPhone: string;
  nominatorCountry: string;
  nominationType: string;

  nomineeName: string;
  nomineeTitle: string;
  nomineeEmail: string;
  nomineePhone: string;
  nomineeWebsite: string;
  nomineeLinkedin: string;

  executiveSummary: string;
  keyAchievements: string;
  alignmentStatement: string;

  paymentMethodPreference: "card" | "wire";
  billingName: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  declarationAccepted: boolean;
}

export const EMPTY_FORM: NominationFormData = {
  nominatorName: "",
  nominatorTitle: "",
  nominatorOrganisation: "",
  nominatorEmail: "",
  nominatorPhone: "",
  nominatorCountry: "",
  nominationType: "Self-Nomination",

  nomineeName: "",
  nomineeTitle: "",
  nomineeEmail: "",
  nomineePhone: "",
  nomineeWebsite: "",
  nomineeLinkedin: "",

  executiveSummary: "",
  keyAchievements: "",
  alignmentStatement: "",

  paymentMethodPreference: "card",
  billingName: "",
  billingAddressLine1: "",
  billingAddressLine2: "",
  billingCity: "",
  billingState: "",
  billingPostalCode: "",
  billingCountry: "",
  declarationAccepted: false,
};

export type FormUpdate = (patch: Partial<NominationFormData>) => void;
