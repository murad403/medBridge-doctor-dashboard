"use client";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { VerifyOtpFormData, verifyOtpSchema } from "@/validation/auth.validation";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();
  const { control, handleSubmit, formState: { errors}} = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendTimer]);

  const handleResend = () => {
    if (resendTimer > 0) {
      return;
    }

    // TODO: call resend OTP API here
    setResendTimer(60);
  };

  const onSubmit: SubmitHandler<VerifyOtpFormData> = async (data) => {
    console.log("Verify OTP payload", data);
    router.push("/auth/reset-password");
  };

  return (
    <div className="w-full flex items-center justify-center">
      
      <div className="w-full max-w-117.5 rounded-xl border border-border-color bg-[#FAFAFA] px-6 py-10 md:p-5">
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl leading-11 font-semibold text-title">
            Verify Email
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="otp"
            render={({ field: { value, onChange } }) => {
              const otpValue = value ?? "";
              const digits = Array.from({ length: OTP_LENGTH }, (_, idx) => otpValue[idx] ?? "");

              return (
                <div className="space-y-2">
                  <div className="flex justify-center gap-2">
                    {digits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={digit}
                        onChange={(event) => {
                          const nextDigit = event.target.value.replace(/\D/g, "").slice(-1);
                          const nextDigits = [...digits];
                          nextDigits[idx] = nextDigit;
                          onChange(nextDigits.join(""));

                          if (nextDigit && idx < OTP_LENGTH - 1) {
                            inputRefs.current[idx + 1]?.focus();
                          }
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Backspace" && !digits[idx] && idx > 0) {
                            inputRefs.current[idx - 1]?.focus();
                          }
                        }}
                        className="size-12 rounded-xl border border-border-color bg-white text-center text-lg font-semibold text-[#0F172A] focus:border-title focus:outline-none focus:ring-1 focus:ring-title"
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="text-center text-xs text-red-500">{errors.otp.message}</p>
                  )}
                </div>
              );
            }}
          />

          <Button type="submit">
            Verify
          </Button>

          <p className="text-center text-sm text-[#1F2937]">
            Don&apos;t get the code?{" "}
            {resendTimer > 0 ? (
              <span className="font-semibold text-title">{resendTimer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-[#2E5BFF] hover:underline cursor-pointer"
              >
                Resend
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
