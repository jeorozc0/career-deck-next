"use server"
import prisma from '@/lib/db'
import { createClient } from '@/utils/supabase/server'

export async function submitOnboarding(formData: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  return await prisma.$transaction(async (tx: any) => {
    // Update user details - note we use id directly since it's the same as auth id
    await tx.user.update({
      where: { id: user.id },
      data: {
        headline: formData.headline,
        summary: formData.summary,
        location: formData.location,
        phone: formData.phone,
        onboarded: true
      }
    })

    if (formData.skills.length) {
      const skills = await Promise.all(
        formData.skills.map(async (name: string) => {
          return tx.skill.upsert({
            where: { name },
            create: { name },
            update: {}
          })
        })
      )

      await tx.userskill.createMany({
        data: skills.map((skill) => ({
          user_id: user.id,  // Use auth user.id directly
          skill_id: skill.id
        }))
      })
    }

    if (formData.experiences.length) {
      await tx.workexperience.createMany({
        data: formData.experiences.map((exp: any) => ({
          user_id: user.id,  // Use auth user.id directly
          title: exp.title,
          company: exp.company,
          start_date: new Date(exp.startDate),
          end_date: exp.endDate ? new Date(exp.endDate) : null,
          description: exp.description
        }))
      })
    }

    if (formData.education.length) {
      await tx.education.createMany({
        data: formData.education.map((edu: any) => ({
          user_id: user.id,  // Use auth user.id directly
          name: edu.name,
          type: edu.type,
          major: edu.major,
          start_date: new Date(edu.startDate),
          end_date: edu.endDate ? new Date(edu.endDate) : null,
          gpa: edu.gpa
        }))
      })
    }
  })
}
