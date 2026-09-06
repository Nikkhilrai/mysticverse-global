import { z } from "zod";
import { MAX_CATEGORIES_PER_NOMINATION } from "@/lib/awardCategories";

/* Optional free-text field: trims, caps length, treats "" as undefined. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

/* Optional positive integer from a number input: "" / null arrive as
   undefined rather than coercing to 0 and failing the whole submission. */
const optionalCount = (max: number) =>
  z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().int().min(1).max(max).optional(),
  );

const ENQUIRY = ["SPONSOR", "EXHIBIT", "DELEGATE", "PRESS", "HR", "OTHER"] as const;

export const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  phone: optionalText(40),
  country: optionalText(80),
  organisation: optionalText(160),
  // Accepts the form label ("Sponsor") or the enum ("SPONSOR").
  enquiryType: z
    .string()
    .transform((s) => s.toUpperCase())
    .pipe(z.enum(ENQUIRY))
    .catch("OTHER"),
  message: z.string().trim().min(1, "Message is required").max(4000),
  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const InterestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  phone: optionalText(40),
  country: optionalText(80),
  passType: optionalText(60),
  company: optionalText(160),
  seats: optionalCount(10000),
  message: optionalText(4000),
  source: optionalText(40),
  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type InterestInput = z.infer<typeof InterestSchema>;

export const PavilionBriefSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  company: optionalText(160),
  role: optionalText(120),
  phone: optionalText(40),
  country: optionalText(80),
  tierInterest: optionalText(80),
  message: optionalText(4000),
  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type PavilionBriefInput = z.infer<typeof PavilionBriefSchema>;

export const DeckRequestSchema = z.object({
  deckId: z.string().trim().min(1).max(60),
  deckName: z.string().trim().min(1).max(160),
  tierName: optionalText(120),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  organisation: optionalText(160),
  role: optionalText(120),
  country: optionalText(80),
  note: optionalText(4000),
  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type DeckRequestInput = z.infer<typeof DeckRequestSchema>;

export const AwardSubmissionSchema = z.object({
  kind: z.enum(["NOMINATION", "JURY_PARTNER"]).catch("NOMINATION"),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  phone: optionalText(40),
  organisation: optionalText(160),
  role: optionalText(120),
  country: optionalText(80),
  // Nomination-only fields
  category: optionalText(120),
  nomineeName: optionalText(200),
  nomineeOrg: optionalText(200),
  nomineeWebsite: optionalText(300),
  relationship: optionalText(80),
  statement: optionalText(4000),
  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type AwardSubmissionInput = z.infer<typeof AwardSubmissionSchema>;

export const PassOrderSchema = z.object({
  passId: z.enum(["seeker", "mystic"]),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  phone: optionalText(40),
  country: optionalText(80),
  company: optionalText(160),
  couponCode: optionalText(30),
  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type PassOrderInput = z.infer<typeof PassOrderSchema>;

export const PassVerifySchema = z.object({
  registrationId: z.string().trim().min(1).max(60),
  razorpay_order_id: z.string().trim().min(1).max(120),
  razorpay_payment_id: z.string().trim().min(1).max(120),
  razorpay_signature: z.string().trim().min(1).max(256),
});

export type PassVerifyInput = z.infer<typeof PassVerifySchema>;

/* Corporate booking — seats drive the price server-side, so the client
   sends a seat count and never an amount. */
export const CorporateOrderSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  company: z.string().trim().min(1, "Company is required").max(160),
  phone: optionalText(40),
  seats: z.coerce.number().int().min(1).max(10000),
  message: optionalText(4000),
  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type CorporateOrderInput = z.infer<typeof CorporateOrderSchema>;

export const CouponValidateSchema = z.object({
  code: z.string().trim().min(1, "Enter a coupon code").max(30),
  passId: z.enum(["seeker", "mystic"]),
});

const NOMINATION_TYPES = [
  "Self-Nomination",
  "Nominating an Individual",
  "Nominating an Entity/Organization/Brand",
  "Nominating a Specific Project/Development",
] as const;

export const AwardNominationDocumentSchema = z.object({
  url: z.string().trim().min(1).max(500),
  name: optionalText(200),
  sizeBytes: z.number().int().positive().max(25 * 1024 * 1024).optional(),
  format: optionalText(20),
});

export const AwardNominationSchema = z.object({
  // Section A — nominator/applicant
  nominatorName: z.string().trim().min(1, "Name is required").max(160),
  nominatorTitle: optionalText(160),
  nominatorOrganisation: optionalText(200),
  nominatorEmail: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  nominatorPhone: optionalText(40),
  nominatorCountry: optionalText(80),
  nominationType: z.enum(NOMINATION_TYPES),

  // Section B — nominee (if different from nominator)
  nomineeName: optionalText(200),
  nomineeTitle: optionalText(160),
  nomineeEmail: optionalText(200),
  nomineePhone: optionalText(40),
  nomineeWebsite: optionalText(300),
  nomineeLinkedin: optionalText(300),

  // Part 3 — category selections
  categories: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one category")
    .max(MAX_CATEGORIES_PER_NOMINATION, `Select up to ${MAX_CATEGORIES_PER_NOMINATION} categories`),

  // Part 4 — executive pitch
  executiveSummary: z.string().trim().min(1, "Executive summary is required").max(2500),
  keyAchievements: z.string().trim().min(1, "Key achievements are required").max(4500),
  alignmentStatement: z.string().trim().min(1, "Alignment statement is required").max(3000),
  documents: z.array(AwardNominationDocumentSchema).max(10).optional(),
  videoLinks: z.array(z.string().trim().max(400)).max(10).optional(),

  // Part 5 — billing + declaration
  paymentMethodPreference: z.enum(["card", "wire"]).catch("card"),
  billingName: optionalText(160),
  billingAddressLine1: optionalText(200),
  billingAddressLine2: optionalText(200),
  billingCity: optionalText(100),
  billingState: optionalText(100),
  billingPostalCode: optionalText(30),
  billingCountry: optionalText(80),
  declarationAccepted: z.literal(true, { error: "Please confirm the declaration to submit." }),

  utmSource: optionalText(80),
  utmMedium: optionalText(80),
  utmCampaign: optionalText(120),
});

export type AwardNominationInput = z.infer<typeof AwardNominationSchema>;

export const AwardNominationVerifySchema = z.object({
  nominationId: z.string().trim().min(1).max(60),
  razorpay_order_id: z.string().trim().min(1).max(120),
  razorpay_payment_id: z.string().trim().min(1).max(120),
  razorpay_signature: z.string().trim().min(1).max(256),
});

export type AwardNominationVerifyInput = z.infer<typeof AwardNominationVerifySchema>;

export const AwardNominationUploadSignatureSchema = z.object({
  filename: z.string().trim().min(1).max(200),
  contentType: z.enum([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    "application/msword", // legacy .doc
    "application/vnd.ms-powerpoint", // legacy .ppt
  ]),
  sizeBytes: z.number().int().positive().max(25 * 1024 * 1024, "File must be 25MB or under."),
});

export type AwardNominationUploadSignatureInput = z.infer<typeof AwardNominationUploadSignatureSchema>;
