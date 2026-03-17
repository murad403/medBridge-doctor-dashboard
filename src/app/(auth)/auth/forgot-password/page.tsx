"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/validation/auth.validation";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    console.log("Forgot password payload", data);
    router.push("/auth/verify-otp");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-117.5 rounded-xl border border-border-color bg-[#FAFAFA] px-6 py-10 md:p-5">
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl leading-11 font-semibold text-title">
            Forgot Password
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-title font-semibold text-sm md:text-base">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11.5 bg-white"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
