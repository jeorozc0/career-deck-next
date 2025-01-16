'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserProfile(data: {
  firstName: string
  lastName: string
  currentRole?: string
  preferredJobTypes: string[]
}) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('user')
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      current_role: data.currentRole,
      preferred_job_types: data.preferredJobTypes,
      onboarded: true
    })
    .eq('id', user.id)

  if (error) {
    throw error
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
