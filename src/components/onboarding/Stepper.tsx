'use client'

import Link from 'next/link'
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

const steps = [
  { id: 1, name: "Basic Details", path: "/onboarding/step-one" },
  { id: 2, name: "Work Experience", path: "/onboarding/step-two" },
  { id: 3, name: "Relevant Education", path: "/onboarding/step-three" },
]

interface FormNavigationProps {
  children: React.ReactNode
}

export function FormNavigation({ children }: FormNavigationProps) {
  const currentPath = usePathname()
  const currentStepIndex = steps.findIndex(step => step.path === currentPath)

  return (
    <div className="space-y-6">
      <div className="w-full py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center justify-center">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className={cn("flex items-center", stepIdx !== steps.length - 1 && "w-full")}>
                  <Link href={step.path} className="relative flex items-center group">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center text-base font-semibold ring-2 z-10",
                        currentStepIndex >= step.id - 1
                          ? "bg-primary text-primary-foreground ring-primary"
                          : "bg-background text-muted-foreground ring-muted",
                        "group-hover:bg-muted group-hover:text-muted-foreground"
                      )}
                    >
                      {step.id}
                    </div>
                    <span className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                      {step.name}
                    </span>
                  </Link>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 w-full",
                        currentStepIndex >= step.id ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {children}

    </div>
  )
}
