/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";

import ValidationInput from "@/components/inputs/validation-input";

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { loginData, loginDto } from "../dto/login";

import { loginFields as fields } from "../utils/fields";
import { AUTH_ROUTES } from "../utils/constants";
import { getErrorMessage } from "@/app/_utils/get-axios-error-message";

import logo from "@/public/assets/logo.png";
import loginImage from "@/public/assets/loginImage.png";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<loginData>({
    resolver: zodResolver(loginDto as any),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const { mutate: submitLogin, isPending } = useLogin();

  const onSubmit = (data: loginData) => {
    submitLogin(data, {
      onSuccess: () => {
        toast.success("Welcome back!.");
        router.push("/");
        router.refresh();
      },
      onError: (error) => {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage ?? "Login failed. Please try again.");
      },
    });
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
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
            <FormProvider {...form}>
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent>
                  {fields.map(({ name, title, placeholder, Icon, type }) => (
                    <div key={name} className="space-y-3 mt-5 mb-5">
                      <ValidationInput<loginData>
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
                        nameInSchema={name as keyof loginData}
                        placeholder={placeholder}
                        className="h-10 rounded-xl"
                        type={type}
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1 mb-2">
                    <Link
                      href={`${AUTH_ROUTES.forgotPassword}?email=${encodeURIComponent(
                        form.watch("email"),
                      )}`}
                      className="text-xs font-medium text-teal-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </CardContent>
              </form>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="login-form"
                  disabled={isPending || !form.formState.isValid}
                  className="mt-2 h-10 w-full bg-[#3f6212] hover:bg-[#365314] text-white font-medium"
                >
                  Sign in
                </Button>
              </CardFooter>
            </FormProvider>

            <div className="mt-5 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href={`${AUTH_ROUTES.register}`}
                className="font-medium text-teal-600 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden md:flex flex-col justify-between p-12 ">
          <Image
            src={loginImage}
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
