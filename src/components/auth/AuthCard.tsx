import Image from "next/image";
import logo from "@/assets/logo/logo.png";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10">
      <div className="flex flex-col items-center mb-6">
        <Image
          src={logo}
          alt="TuacasaAqui"
          width={64}
          height={64}
          className="mb-3"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1b3a5c]">
          TuacasaAqui
        </h1>
      </div>
      {children}
    </div>
  );
}
