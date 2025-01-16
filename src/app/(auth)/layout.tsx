import Image from "next/image";
import { ReactNode } from "react";
import monet from "../../../public/Monet1.webp"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-row h-screen w-screen p-4">
      <div className="flex h-full w-1/2 justify-center items-center">{children}</div>
      <div className="flex h-full w-1/2 relative">
        <Image
          src={monet}
          alt="Claude Monet, Water Lilies and the Japanese bridge, 1897–99"
          fill
          className="object-cover rounded-xl"
          priority
          sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         50vw"
        />
      </div>
    </main>
  )

}
