"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function loginUser(data: z.infer<typeof signUpSchema>) {
  const supabase = await createClient();
  console.log(data)
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log(error)
  }

  revalidatePath('/', 'layout')
  redirect('/')

}
