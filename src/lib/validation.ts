import { z } from "zod";

/* Optional free-text field: trims, caps length, treats "" as undefined. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

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
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const InterestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").max(200).pipe(z.email()),
  phone: optionalText(40),
  country: optionalText(80),
  passType: optionalText(60),
  company: optionalText(160),
  message: optionalText(4000),
});

export type InterestInput = z.infer<typeof InterestSchema>;
