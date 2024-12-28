'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
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
import { Trash2 } from 'lucide-react'
import { ScrollArea } from "../ui/scroll-area"

const WorkExperienceSchema = z.object({
  experiences: z.array(
    z.object({
      title: z.string().min(1, "Job title is required"),
      company: z.string().min(1, "Company name is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      description: z.string().optional()
    })
  ).nonempty("At least one work experience entry is required"),
});

type WorkExperienceValues = z.infer<typeof WorkExperienceSchema>

export default function StepTwoForm() {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      experiences: [{ title: '', company: '', startDate: '', endDate: '', description: '' }]
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "experiences",
    control: form.control,
  })

  function onSubmit(data: WorkExperienceValues) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Work Experience</h2>
          <FormDescription>
            Add your relevant work experiences, starting with the most recent.
          </FormDescription>
        </div>
        <ScrollArea className="max-h-[454px] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <FormField
                  control={form.control}
                  name={`experiences.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>Leave blank if current job</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your responsibilities and achievements"
                          className="resize-none h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ title: '', company: '', startDate: '', endDate: '', description: '' })}
        >
          Add Another Experience
        </Button>
      </form>
    </Form>
  )
}

