import { z } from "zod";

export const BasicInfoSchema = z.object({
  headline: z.string().min(1, { message: "Please provide a title or role" }),
  summary: z.string().min(1, { message: "Please provide a brief summary" }),
  location: z.string().optional(),
  phone: z.string().optional(),
  skills: z.array(z.string()),
});

export const WorkExperienceSchema = z.object({
  experiences: z
    .array(
      z.object({
        title: z.string().min(1, "Job title is required"),
        company: z.string().min(1, "Company name is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
});

export const EducationSchema = z.object({
  education: z
    .array(
      z.object({
        name: z.string().min(1, "Job title is required"),
        type: z.string().min(1, "Company name is required"),
        major: z.string().min(1, "Start date is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        gpa: z.string().optional(),
      })
    )
});

export const onboardingFormSchema = z.object({
  ...BasicInfoSchema.shape,
  ...WorkExperienceSchema.shape,
  ...EducationSchema.shape,
});


export type OnboardingFormType = z.infer<typeof onboardingFormSchema>;


// Combined Onboarding Form Schema

// Type Definitions
export type OnboardingFormInitialValuesType = z.infer<typeof onboardingFormSchema>;

