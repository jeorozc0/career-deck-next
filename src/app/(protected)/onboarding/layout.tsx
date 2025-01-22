import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/db'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { onboarded: true }
  })

  if (profile?.onboarded) {
    redirect('/profile')
  }

  return children
}
