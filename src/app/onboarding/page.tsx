'use client'

import OnboardingForm from "@/components/onboarding/onboarding-form"
import { motion } from "framer-motion"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Welcome aboard!</h1>
          <p className="text-muted-foreground">
            Let's personalize your experience in a few simple steps
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-lg"
        >
          <OnboardingForm />
        </motion.div>
      </motion.div>
    </div>
  )
}


