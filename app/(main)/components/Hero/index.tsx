import { Routes } from "@/app/types/enums";
import Container from "@/components/layouts/Container";
import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const Hero = () => {
  return (
    <Container>
      <section className="flex flex-col-reverse gap-4 md:flex-row py-6 items-center justify-center md:justify-between">
        <div className="text-center md:text-right text-gray-50 flex flex-col gap-5 max-w-lg">
          <h5 className="">مرحبا بالجميع!</h5>
          <h3 className="group text-6xl gap-2 text-center basis-full md:text-right">
            <span className="text-white group-hover:text-pink-400 duration-200 ml-5">
              أ/مريم
            </span>
            <span className="text-pink-400 group-hover:text-white duration-200">
              المطيري
            </span>
          </h3>

          <p className="text-gray-300">
            مؤسس ومدير تنفيذي لـithrathakaa | مُتخصّصة بالموهبة |طالبة ماجستير
            تكنولوجيا التعليم |مدرّبة في الذكاءات المتعدّدة. | رسالتي: تسخير
            التقنية لإثراء المواهب
          </p>
          <div className="m-auto md:m-0 flex gap-2.5">
            <Link href={`${Routes.COURSES}`}>
              <Button className="rounded-full bg-button cursor-pointer">
                تصفح الدورات
              </Button>
            </Link>
            <Link href={`${Routes.ARTICLES}`}>
              <Button className="bg-primary hover:bg-primary-hover rounded-full cursor-pointer">
                 تصفح المقالات 
              </Button>
            </Link>
          </div>
        </div>
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
      </section>
    </Container>
  );
};

export default Hero;
