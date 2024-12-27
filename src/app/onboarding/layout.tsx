import { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col h-screen w-screen">
      <div className="h-1/3 w-full"></div>
      <div className="h-1/3 w-full">{children}</div>
      <div className="h-1/3 w-full"></div>
    </main>
  )
}
