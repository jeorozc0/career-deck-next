'use server'

import prisma from '@/lib/db'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Define input schema for type safety
const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  currentRole: z.string().optional(),
  preferredJobTypes: z.array(z.enum(['remote', 'hybrid', 'onsite']))
})

type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>

export async function updateUserProfile(data: UpdateProfileInput) {
  try {
    // Validate input data
    const validatedData = UpdateProfileSchema.parse(data)

    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Not authenticated')
    }

    // Update user in transaction
    await prisma.$transaction(async (tx: any) => {
      await tx.user.update({
        where: {
          id: user.id
        },
        data: {
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          current_role: validatedData.currentRole,
          preferred_job_types: validatedData.preferredJobTypes,
          onboarded: true
        },
      })
    })

    // Revalidate the profile page and redirect
    revalidatePath('/profile')
    redirect('/profile')

  } catch (error) {
    // Log error for debugging
    console.error('Profile update error:', error)

    // Return error message based on type
    if (error instanceof z.ZodError) {
      throw new Error('Invalid input data')
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('Failed to update profile')
  }
}
