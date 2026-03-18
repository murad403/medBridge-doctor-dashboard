"use client";
import { MdCheck } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const PasswordResetSuccess = () => {

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-117.5 rounded-xl border border-border-color bg-[#FAFAFA] px-6 py-10 md:p-5">
        <div className="bg-[#17A31A] inline-block p-2 rounded-full">
            <MdCheck className="size-10 text-main"/>
        </div>
        <div className="">
          <h1 className="text-2xl md:text-3xl leading-11 font-semibold text-title">
            Your Password Successfully Changed
          </h1>
          <p className="text-sm md:text-base text-description font-normal mb-4">Sign in to your account with your new password</p>
          <Link href={"/auth/sign-in"}>
          <Button>
            Go To Sign In
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
