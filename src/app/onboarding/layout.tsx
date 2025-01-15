import { FormNavigation } from "@/components/onboarding/Stepper";
import { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {

  return (
    <main className="flex flex-col h-screen w-screen">
      <div className="h-full w-full px-40 py-20">
        <FormNavigation >
          {children}
        </FormNavigation>
      </div>
    </main>
  )
}
