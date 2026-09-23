/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import ValidationInput from "@/components/inputs/validation-input";

import { useChangePassword } from "../hooks/useChangePassword";

import { updateUserPasswordFields as fields } from "../utils/fields";
import { AUTHENTICATED_USER_ROUTES } from "../utils/constance";

import { ChangePasswordData, changePasswordDto } from "../dto/change-password";
import { getErrorMessage } from "@/app/_utils/get-axios-error-message";

export default function UpdateUserPassword() {
  const router = useRouter();
  const form = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordDto as any),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onBlur",
  });
  const { mutate: updatePassword, isPending } = useChangePassword();
  const onSubmit = (data: ChangePasswordData) => {
    updatePassword(data, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        router.push(AUTHENTICATED_USER_ROUTES.updateProfile);
        router.refresh();
      },
      onError: (error) => {
        const errMessage = getErrorMessage(error);
        toast.error(errMessage ?? "Password update failed");
      },
    });
  };
  return (
    <div className="p-8 max-w-2xl mx-auto font-sans min-h-screen bg-background text-foreground transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Change Password</h1>
        <p className="text-sm text-muted-foreground">
          Update your password regularly to keep your account secure.
        </p>
      </div>

      <Card className="shadow-sm border border-border bg-card text-card-foreground">
        <CardContent className="pt-6 space-y-6">
          <FormProvider {...form}>
            <form
              id="update-password-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {fields.map(({ name, title, placeholder, Icon, type }) => (
                <div key={name} className="space-y-3 mt-5 mb-5">
                  <ValidationInput<ChangePasswordData>
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
                    nameInSchema={name}
                    placeholder={placeholder}
                    className="h-10 rounded-xl"
                    type={type}
                    disabled={isPending}
                  />
                </div>
              ))}
            </form>
            <CardFooter className="flex justify-between items-center">
              <Button
                type="submit"
                form="update-password-form"
                disabled={isPending || !form.formState.isValid}
                className="mt-2 h-10 w-[50%] bg-teal-800 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 font-medium"
              >
                {isPending ? "Loading…" : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                className="mt-2 h-10 w-[50%] bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 font-medium"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </CardFooter>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
