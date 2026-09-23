/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerData, registerForm, registerFormDto } from "../dto/register";
import { useRegister } from "../hooks/useRegister";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";

import ValidationInput from "@/components/inputs/validation-input";
import ValidationCheckbox from "@/components/inputs/validation-checkbox";



import { registerFields as fields } from "../utils/fields";
import { getErrorMessage } from "@/app/_utils/get-axios-error-message";
import { AUTH_ROUTES } from "../utils/constants";

import logo from "@/public/assets/logo.png";
import registerImage from "@/public/assets/registerImage.png";

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<registerForm>({
    resolver: zodResolver(registerFormDto as any),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      lastName: "",
        isAgree: false,
    },
    mode: "onBlur",
  });
  const { mutate: submitRegister, isPending } = useRegister();

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
    isAgree,
  }: registerForm) => {
    if (!isAgree) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    submitRegister(
      { firstName, lastName, email, password },
      {
        onSuccess: () => {
          toast.success("Check your email. and verification it to continue");
          router.push(`${AUTH_ROUTES.login}`);
          router.refresh();
        },
        onError: (error) => {
          console.error("Registration failed:", error);
          const errorMessage = getErrorMessage(error);
          toast.error(errorMessage ?? "Registration failed. Please try again.");
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-10 lg:p-12">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="NovaCart logo"
              width={150}
              height={50}
              priority
              className="h-auto w-35 object-contain sm:w-38.75   "
            />
          </div>

          <div className="my-auto py-6">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Join and discover our products{" "}
            </p>

            <FormProvider {...form}>
              <form
                id="register-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent>
                  {fields.map(({ name, title, placeholder, Icon, type }) => (
                    <div key={name} className="space-y-3 mt-5 mb-5">
                      <ValidationInput<registerData>
                        fieldTitle={
                          <>
                            <span className="text-muted-foreground">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-gray-700 dark:text-gray-200">
                              {title}
                            </span>
                          </>
                        }
                        nameInSchema={name as keyof registerData}
                        placeholder={placeholder}
                        className="h-10 rounded-xl"
                        type={type}
                      />
                    </div>
                  ))}
                  <ValidationCheckbox<registerForm>
                    nameInSchema="isAgree"
                    message={
                      <>
                        I agree to the{" "}
                        <Link
                          href={AUTH_ROUTES.terms}
                          className="font-medium text-teal-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href={AUTH_ROUTES.privacy}
                          className="font-medium text-teal-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </>
                    }
                    className="mb-8"
                    disabled={isPending}
                  />
                </CardContent>
              </form>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="register-form"
                  disabled={isPending || !form.formState.isValid}
                  className="mt-2 h-10 w-full bg-[#3f6212] hover:bg-[#365314] text-white  font-medium"
                >
                  Sign up
                </Button>
              </CardFooter>
            </FormProvider>

            <div className="mt-5 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href={AUTH_ROUTES.login}
                className="font-medium text-teal-600 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden md:flex flex-col justify-between p-12 ">
          <Image
            src={registerImage}
            alt="Person studying on their laptop"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 0vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
