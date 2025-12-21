import { Routes, Pages } from "@/app/types/enums";
import Container from "@/components/layouts/Container";
import Link from "@/components/link";
import Motion from "@/components/ui/motion";
import Image from "next/image";
import Form from "./_components/form";
const Signup = () => {
  return (
    <main>
      <Container className="flex items-center justify-center h-screen">
        <Motion
          className="basis-70/100 bg-black/60 rounded-2xl p-5 max-h-90/100 overflow-auto no-scrollbar"
          init={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
        >
          <Link className="mx-auto mb-5 block w-fit" href={Routes.ROOT}>
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
          </Link>
          <Form />
          <p className="text-center mt-4">
            لديك حساب بالفعل ؟
            <Link
              className="text-button hover:underline"
              href={`${Routes.AUTH}/${Pages.LOGIN}`}
            >
              سجل دخولك الأن !
            </Link>
          </p>
        </Motion>
      </Container>
    </main>
  );
};

export default Signup;
