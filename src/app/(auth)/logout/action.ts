"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function LogOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/auth/login");
}

export async function globalScopeLogOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({
    scope: "global",
  });

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/auth/login");
}
