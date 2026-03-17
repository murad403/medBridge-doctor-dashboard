"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordFormData, resetPasswordSchema } from "@/validation/auth.validation";
import { useRouter } from "next/navigation";



const ResetPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    console.log("Reset password payload", data);
    router.push("/auth/password-reset-success");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-117.5 rounded-xl border border-border-color bg-[#FAFAFA] px-6 py-10 md:p-5">
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl leading-11 font-semibold text-title">
            Reset Password
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-title font-semibold text-sm md:text-base">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="Create new password"
                className="h-11.5 bg-white pr-10"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    newPassword: !prev.newPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.newPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="text-title font-semibold text-sm md:text-base">
              Re-enter Password
            </label>
            <div className="relative">
              <Input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                className="h-11.5 bg-white pr-10"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.confirmPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit">
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
