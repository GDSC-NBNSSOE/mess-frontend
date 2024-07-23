import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { useEffect, useState } from "react";
import { useToast } from "../../components/ui/use-toast.ts";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { loginAtom } from "../../atoms/autAtom.ts";

const formSchema = z.object({
  phoneno: z
    .string()
    .min(10, { message: "Phone number must be of 10 digits." })
    .max(10, { message: "Phone number must be of 10 digits." }),
  otp: z.string().min(4).max(4),
});

export default function LoginStudentPage() {
  const [optSent, setOTPSent] = useState(false);
  const [isLoggedIn] = useAtom(loginAtom);
  const { toast } = useToast();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneno: "",
      otp: "0000",
    },
  });

  function onSubmitPhoneNo(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setOTPSent(true);
    toast({
      title: "OTP Sent",
      description: "Check your messages, otp sent successfully",
    });
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <p className="text-[#6b46c1] text-2xl font-bold mb-10">Student Login</p>
      <div className="lg:w-[50%] sm:w-full bg-white p-5 shadow-lg rounded-lg">
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="phoneno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="8473948374" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter Mess registerd mobile number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {optSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {optSent ? (
              <Button
                onClick={form.handleSubmit(onSubmitPhoneNo)}
                type="submit"
                className="w-full bg-[#6b46c1] transition-colors hover:bg-[#007bffd9]"
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={form.handleSubmit(onSubmitPhoneNo)}
                type="submit"
                className="w-full bg-[#6b46c1] transition-colors hover:bg-[#007bffd9]"
              >
                Generate OPT
              </Button>
            )}
          </form>
        </Form>

        <div className="p-5"></div>
      </div>

      <div className="w-full flex flex-col items-center mt-8 text-[#000000b7]">
        <p>Not a Student?</p>
        <Link to="/login-other" className="text-sm underline text-blue-500">
          Click here
        </Link>
      </div>
    </div>
  );
}
