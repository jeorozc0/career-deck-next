import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/db'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check onboarding status
  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { onboarded: true }
  })

  const isOnboardingRoute = window.location.pathname.startsWith('/onboarding')
  const isProtectedRoute = window.location.pathname.startsWith('/profile')

  if (!profile?.onboarded && !isOnboardingRoute && isProtectedRoute) {
    redirect('/onboarding')
  }

  if (profile?.onboarded && isOnboardingRoute) {
    redirect('/')
  }

  return children
}
