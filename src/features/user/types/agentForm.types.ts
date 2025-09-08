import { z } from "zod";

// NID Photo Type Schema
export const nidPhotoTypeSchema = z
  .object({
    frontend: z.file().optional(),
    backend: z.file().optional(),
  })
  .refine((v) => !!(v.frontend || v.backend), {
    message: "At least one of front/back NID photo URL is required",
  });

// Agent Core Schema
export const agentCoreZodSchema = z.object({
  agentCode: z
    .string({ message: "agentCode is required" })
    .trim()
    .regex(/^AGT-\d{4}\s?\d{3,}$/i, {
      message: "agentCode format invalid (e.g., AGT-2025001 or AGT-2025 001)",
    }),

  licenseNumber: z
    .string({ message: "licenseNumber is required" })
    .trim()
    .min(3, "licenseNumber seems too short"),

  nidNumber: z
    .string({ message: "nidNumber is required" })
    .trim()
    .regex(/^(?:\d{10}|\d{13}|\d{17})$/, {
      message: "nidNumber must be 10, 13, or 17 digits",
    }),

  nidPhotoUrl: nidPhotoTypeSchema.optional(),

  serviceAreas: z
    .array(
      z
        .string({ message: "service area is required" })
        .trim()
        .min(1, "service area cannot be empty")
    )
    .min(1, "at least one service area is required"),
});

// Types

// 1️⃣ NID Photo Type
export type NidPhotoType = z.infer<typeof nidPhotoTypeSchema>;

// 2️⃣ Agent Core Form Values
export type AgentCoreType = z.infer<typeof agentCoreZodSchema>;

// 3️⃣ Optional explicit type (for extra clarity)
export interface AgentCoreExplicit {
  agentCode: string;
  licenseNumber: string;
  nidNumber: string;
  nidPhotoUrl?: {
    frontend?: string;
    backend?: string;
  };
  serviceAreas: string[];
}
