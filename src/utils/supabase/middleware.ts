import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Initial response setup
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Get user immediately after client creation
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define public routes
  const publicRoutes = ['/login', '/register', '/auth']
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isOnboardingRoute = request.nextUrl.pathname.startsWith('/onboarding')

  // Handle authentication
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'

    // Create redirect response
    const redirectResponse = NextResponse.redirect(url)

    // Copy all cookies from supabaseResponse
    supabaseResponse.cookies.getAll().forEach(cookie => {
      redirectResponse.cookies.set(cookie)
    })

    return redirectResponse
  }

  // Only check onboarding for authenticated users
  if (user && !isPublicRoute) {
    try {
      const { data: profile } = await supabase
        .from('user')
        .select('onboarded')
        .eq('id', user.id)
        .single()

      if (!profile?.onboarded && !isOnboardingRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/onboarding'

        const redirectResponse = NextResponse.redirect(url)
        supabaseResponse.cookies.getAll().forEach(cookie => {
          redirectResponse.cookies.set(cookie)
        })

        return redirectResponse
      }

      if (profile?.onboarded && isOnboardingRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/'

        const redirectResponse = NextResponse.redirect(url)
        supabaseResponse.cookies.getAll().forEach(cookie => {
          redirectResponse.cookies.set(cookie)
        })

        return redirectResponse
      }
    } catch (error) {
      // Log error but don't interrupt the flow
      console.error('Error checking onboarding status:', error)
    }
  }

  // Return the original response if no redirects needed
  return supabaseResponse
}
