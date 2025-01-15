import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  const publicRoutes = ['/home', '/login', '/register']
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
  const isOnboardingRoute = request.nextUrl.pathname.startsWith('/onboarding')

  if (!user || error) {
    return !isPublicRoute ?
      NextResponse.redirect(new URL('/login', request.url)) :
      NextResponse.next()
  }

  // Check onboarding - note we use id instead of auth_id now
  const { data: profile } = await supabase
    .from('user')
    .select('onboarded')
    .eq('id', user.id)
    .single()

  if (!profile?.onboarded && !isOnboardingRoute) {
    return NextResponse.redirect(new URL('/onboarding/step-one', request.url))
  }

  if (profile?.onboarded && isOnboardingRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
