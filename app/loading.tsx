import Image from "next/image";
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative w-40 h-40 animate-[spin_5s_linear_infinite]">
        <Image
          fill
          className="object-contain"
          src={"/logo.svg"}
          alt="logo"
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
