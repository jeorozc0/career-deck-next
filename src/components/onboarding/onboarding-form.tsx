'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { updateUserProfile } from "@/app/onboarding/action"
import { motion } from "framer-motion"

const OnboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  currentRole: z.string().optional(),
  preferredJobTypes: z.array(z.enum(['remote', 'hybrid', 'onsite']))
})

type OnboardingFormData = z.infer<typeof OnboardingSchema>

export default function OnboardingForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      currentRole: '',
      preferredJobTypes: []
    }
  })

  const onSubmit = async (data: OnboardingFormData) => {
    startTransition(async () => {
      try {
        await updateUserProfile(data)
      } catch (error) {
        // You might want to add toast notifications here
        console.error('Error updating profile:', error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormField
            control={form.control}
            name="currentRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Current Role (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormField
            control={form.control}
            name="preferredJobTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Preferred Work Type</FormLabel>
                <FormControl>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {['remote', 'hybrid', 'onsite'].map((type) => (
                      <label
                        key={type}
                        className={`
                          flex items-center justify-center px-4 py-2 border rounded-full text-sm
                          transition-colors duration-200 ease-in-out cursor-pointer
                          ${field.value.includes(type as any)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={field.value.includes(type as any)}
                          onChange={(e) => {
                            const value = field.value.filter(t => t !== type)
                            if (e.target.checked) {
                              value.push(type as any)
                            }
                            field.onChange(value)
                          }}
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Continue to Home'}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}


