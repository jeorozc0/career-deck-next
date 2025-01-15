'use client'

import { useOnboardingFormContext } from '@/context/OnboardingFormContext';
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
import { Trash2 } from 'lucide-react'
import { ScrollArea } from "../ui/scroll-area"
import { EducationSchema } from '@/schemas';
import { submitOnboarding } from '@/app/onboarding/step-three/action';

export default function StepThreeForm() {
  const { formData, updateFormDetails } = useOnboardingFormContext();

  const form = useForm<z.infer<typeof EducationSchema>
  >({
    resolver: zodResolver(
      EducationSchema
    ),
    defaultValues: {
      education: formData.education.length > 0 ? formData.education : [
        {
          name: '',
          type: '',
          major: '',
          startDate: '',
          endDate: '',
          gpa: ''
        },
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: "education",
    control: form.control,
  })

  const onSubmit = (data: any) => {
    updateFormDetails({
      education: data.education,
    });
    console.log(formData)
    submitOnboarding(formData)

    // Navigate to the next step or submit the form
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Education</h2>
          <FormDescription>
            Add your relevant education, starting with the most recent.
          </FormDescription>
        </div>
        <ScrollArea className="max-h-[522px] overflow-y-auto">
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
                  name={`education.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Harvard University" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Bachelors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.major`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.startDate`}
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
                    name={`education.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>Leave blank if not completed</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <FormField
                  control={form.control}
                  name={`education.${index}.gpa`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPA</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 3.5" {...field} />
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
          onClick={() => append({ name: '', type: '', major: '', startDate: '', endDate: '', gpa: '' })}
        >
          Add Another Education
        </Button>
        <Button type="submit" className="flex w-full h-[60px] justify-center items-center">
          Continue
        </Button>
      </form>
    </Form>
  )
}

