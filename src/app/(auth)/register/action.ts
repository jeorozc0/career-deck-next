"use server";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const signUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export async function signUpNewUser(data: z.infer<typeof signUpSchema>) {
  const supabase = await createClient();
  console.log(data)
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  });

  if (error) {
    console.log(error)
  }

}
