'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'
import { ScrollArea } from "../ui/scroll-area"
import Link from "next/link"

const BasicInfoSchema = z.object({
  headline: z.string().min(1, { message: "Please provide a title or role" }),
  summary: z.string().min(1, { message: "Please provide a brief summary" }),
  location: z.string().optional(),
  phone: z.string().optional(),
  skills: z.array(z.string()),
})

type BasicInfoValues = z.infer<typeof BasicInfoSchema>

export default function StepOneForm() {
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])

  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      headline: "",
      summary: "",
      location: "",
      phone: "",
      skills: [],
    },
  })

  function onSubmit(values: BasicInfoValues) {
    console.log({ ...values, skills })
    // Handle form submission here
  }

  const addSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()]
      setSkills(newSkills)
      form.setValue("skills", newSkills)
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove)
    setSkills(newSkills)
    form.setValue("skills", newSkills)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input placeholder="Your title or role" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Enter your professional title or current role.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of your professional experience"
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Provide a concise overview of your professional background.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter your current location (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter your contact phone number (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Skills</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                </FormControl>
                <Button type="button" onClick={addSkill}>
                  Add
                </Button>
              </div>
              <ScrollArea className="mt-2 border border-input rounded-md p-2">
                <div className="min-h-7 max-h-[84px] flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-secondary-foreground/50 hover:text-secondary-foreground"
                        aria-label={`Remove ${skill}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <FormDescription className="text-xs">
                Enter your skills and press Enter or click Add. Click the X to remove a skill.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Link href={"/onboarding/step-two"}>"Next Step"</Link>
    </Form>

  )
}
