import { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col h-screen w-screen">
      <div className="h-full w-full p-40">{children}</div>
    </main>
  )
}
