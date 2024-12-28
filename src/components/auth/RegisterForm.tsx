"use client"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
  first_name: z.string({ required_error: "First name is required" }),
  last_name: z.string({ required_error: "Last name is required" }),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const router = useRouter()

  async function onSubmit(data: z.infer<typeof formSchema>) {
    router.push("/onboarding/step-one")
    console.log(data)
  }

  return (
    <div className="w-full h-fit">
      <div className="flex h-fit justify-center items-center my-14 text-4xl font-medium text-center">
        <h2>Let&apos;s do this</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="flex space-x-4 w-full">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full py-2 px-4 h-[60px] dark:bg-neutral-800 border-2 dark:border-neutral-800 dark:focus:border-white"
                      placeholder="First name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full py-2 px-4 h-[60px] dark:bg-neutral-800 border-2 dark:border-neutral-800 dark:focus:border-white"
                      placeholder="Last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full py-2 px-4 h-[60px] dark:bg-neutral-800 border-2 dark:border-neutral-800 dark:focus:border-white"
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="w-full py-2 px-4 h-[60px] dark:bg-neutral-800 border-2 dark:border-neutral-800 dark:focus:border-white"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex w-full h-[60px] border-2 justify-center items-center text-black rounded-3xl text-md font-medium leading-6 bg-white hover:bg-neutral-100 dark:hover:bg-neutral-200 dark:border-none"
          >
            Continue
          </Button>
          <div className="flex w-full justify-center">
            <p>
              Have an account?{" "}
              <span>
                <Link
                  href={"/"}
                  className={"font-bold hover:underline"}
                >
                  Log in
                </Link>
              </span>{" "}
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}