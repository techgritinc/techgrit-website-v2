import { z } from "zod";

export const validateName = (fieldName: string, maxLength: number = 100) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })
    .min(2, { message: `${fieldName} must be at least 2 characters` })
    .max(maxLength, { message: `${fieldName} cannot exceed ${maxLength} characters` })
    // Unicode support. Must start and end with a letter. Can contain letters, spaces, hyphens, apostrophes, and dots in the middle.
    .regex(
      /^[\p{L}][\p{L}\s\-'.]*[\p{L}]$|^[\p{L}]{2,}$/u,
      `${fieldName} contains invalid characters or starts/ends with a special character.`
    )
    // Normalize multiple consecutive spaces into a single space
    .transform((val) => val.replace(/\s+/g, " "));

export const validateEmail = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .min(5, { message: "Email must be at least 5 characters" })
  .max(254, { message: "Email cannot exceed 254 characters" })
  // Stricter business email regex (prevents consecutive dots, requires proper domain structure)
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
  .refine(
    (val) => {
      if (!val.includes("@")) return true; // Let regex handle missing @
      const domain = val.split("@")[1];
      return !val.includes("..") && !domain.startsWith("-") && !domain.endsWith("-");
    },
    { message: "Invalid email format" }
  )
  .transform((val) => val.toLowerCase()); // Lowercase normalize

export const validateMessage = (fieldName: string, maxLength: number = 2000) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })
    .max(maxLength, { message: `${fieldName} cannot exceed ${maxLength} characters` });

export const validateLinkedinUrl = z
  .string()
  .trim()
  .min(1, { message: "URL is required" })
  .max(300, { message: "URL cannot exceed 300 characters" })
  .url({ message: "Please enter a valid URL" });

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const validateResume = z
  .instanceof(File, { message: "Resume file is required" })
  .refine((file) => file.size > 0, { message: "Resume file is required" })
  .refine((file) => file.size <= MAX_RESUME_BYTES, {
    message: "File is over 5MB. Please upload a smaller file.",
  })
  .refine((file) => ALLOWED_RESUME_TYPES.has(file.type), {
    message: "Only PDF, DOC, and DOCX files are accepted.",
  });

export const validateCompany = (maxLength: number = 150) =>
  z
    .string()
    .trim()
    .min(1, { message: "Company is required" })
    .max(maxLength, { message: `Company cannot exceed ${maxLength} characters` });

// Same shape as a "message" field — reuse validateMessage instead of duplicating the checks.
export const validateProjectInfo = validateMessage("Project details", 2000);

// Contact's topic buttons are single-select in the UI but sent as an array
// (`inquiryOptions: [topic]`) to match the CMS field shape.
export const validateInquiryOptions = z
  .array(z.string({ message: "Inquiry topic is required" }))
  .min(1, { message: "Please select an inquiry topic" })
  .max(1, { message: "Only one inquiry topic can be selected" });
