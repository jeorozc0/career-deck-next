import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import ProfileHeader from '@/components/ProfileHeader'
import QuickActions from '@/components/QuickActions'
import ResumeGrid from '@/components/ResumeGrid'
import BasicStats from '@/components/BasicStats'

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Suspense fallback={<Skeleton className="h-40 w-full rounded-lg" />}>
        <ProfileHeader />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-32 w-full rounded-lg mt-8" />}>
        <QuickActions />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full rounded-lg mt-8" />}>
        <ResumeGrid />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-24 w-full rounded-lg mt-8" />}>
        <BasicStats />
      </Suspense>
    </div>
  )
}

