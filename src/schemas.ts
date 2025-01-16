import { z } from "zod";

export const OnboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  currentRole: z.string().optional(),
  preferredJobTypes: z.array(z.enum(['remote', 'hybrid', 'onsite'])),
});
