import { FaCartArrowDown, FaGift } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardTypes, Routes } from "@/app/types/enums";
import Link from "../link";
import { Badge } from "./badge";
import Rating from "./Rating";
const MenuCard = ({ card }: { card: any }) => {
  return (
    <div className="relative z-20 bg-card/60 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-2 md:p-5 duration-150 rounded-2xl ">
      <div className="relative w-full h-48 m-auto">
        <Image
          src={card.imgSrc||"/course.jfif"}
          alt="card-img"
          fill
          className="object-cover max-w-full"
        />
      </div>
      <div className="flex justify-between items-center h-20">
        <h4 className="font-bold text-2xl my-4">
          <Link
            className="hover:underline hover:text-primary duration-200 line-clamp-2"
            href={`/${card.type.toLowerCase()}s/${card.id}/`}
          >
            {card.cardTitle}
          </Link>
        </h4>
        {card.type === CardTypes.COURSE && (
          <Badge variant={"secondary"} className="bg-button">
            {card.basePrice}
          </Badge>
        )}
        {card.type === CardTypes.ARTICLE && (
          <Badge variant={"secondary"} className="bg-button">
            {card.category}
          </Badge>
        )}
      </div>
      <div>
        <p className="line-clamp-3 leading-relaxed tracking-wide text-card-foreground mb-5">
          {card.des}
        </p>
        {card.type === CardTypes.COURSE ? (
          <p>
            <Rating />
          </p>
        ) : (
          <div className="flex items-center justify-between">
            <p>{card.createdAt}</p>
            <span>{card.readingTime}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-5">
        {card.type === CardTypes.COURSE ? (
          <>
            <Button className="px-10! py-5! basis-75/100 cursor-pointer">
              <FaCartArrowDown />
              <span>اضف للسلة</span>
            </Button>
            <Button
              className="basis-22/100 p-5! cursor-pointer"
              variant={"secondary"}
            >
              <FaGift />
            </Button>
          </>
        ) : (
          <Link
            className="basis-full"
            href={`${Routes.ARTICLES}/${card?.id}`}
          >
            <Button className="px-10! py-5! w-full cursor-pointer">
              <span>ابدأ القراءة</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
