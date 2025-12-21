import { notFound } from "next/navigation";
import { CardTypes, Routes } from "@/app/types/enums";
import Container from "@/components/layouts/Container";
import Crumb from "@/components/ui/Crumb";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import SpecialHeading from "@/components/ui/SpecialHeading";
import MenuCard from "@/components/ui/MenuCard";
import Menu from "@/components/ui/Menu";
import moment from "moment";
import AddToCartButton from "@/components/AddToCartButton";
import { getCourseById, getCoursesForSpecficCat } from "@/server/db/courses";
import { getCategoryById } from "@/server/db/category";
import { getArticlesForSpecficCat } from "@/server/db/articles";

const page = async ({ params }: { params: Promise<{id: string}> }) => {
  const { id } = await params;
  console.log("this params", await params)
  const course = await getCourseById(id)
  if (!course) notFound();
  const crumbLinks = [
    { href: Routes.ROOT, text: "الرئيسية" },
    { href: Routes.COURSES, text: "الدورات" },
  ];
  const coursesList = await getCoursesForSpecficCat(course.categoryId, course.id)
  const coursesTsx = coursesList.map(async (course) => {
    return (
      <MenuCard
        key={course.id}
        card={{
          type: CardTypes.COURSE,
          cardTitle: course.title,
          des: course.description,
          imgSrc: course.image,
          id: course.id,
          basePrice: formatCurrency(course.basePrice),
        }}
      />
    );
  });
  const articlesList = await getArticlesForSpecficCat(course.categoryId)
  const category = await getCategoryById(course.categoryId)
  const articlesTsx = articlesList.map(async (article) => {
    return (
      <MenuCard
        key={article.id}
        card={{
          type: CardTypes.ARTICLE,
          cardTitle: article.title,
          des: article.description,
          createdAt: moment(article.createdAt).format("Do MMMM YYYY"),
          readingTime: article.readingTime,
          imgSrc: article.image,
          id: article.id,
          category: category?.name,
        }}
      />
    );
  });
  return (
    <div className="my-4">
      <Container>
        <Crumb links={crumbLinks} current={course.title} />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative basis-27/100 min-h-56">
            <Image
              priority
              loading="eager"
              alt="course-img"
              src={course.image || "/course.jfif"}
              fill
            />
          </div>
          <div className="flex flex-col gap-4 basis-70/100 text-center md:text-right">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
              <h4 className="font-bold text-3xl">{course.title}</h4>
              <AddToCartButton product={course}>
                <span>عرض تفاصيل الشراء</span>
              </AddToCartButton>
            </div>
            <div className="text-xl">
              <p className="text-gray-300 leading-relaxed tracking-wide">
                {course.description}
              </p>
            </div>
          </div>
        </div>
        <section className="relative section-gap">
          <SpecialHeading
            mainText=" دورات قد تعجبك"
            secText="عرض جميع الدورات"
            href={Routes.COURSES}
          />
          {coursesTsx.length ? (
            <Menu>{coursesTsx}</Menu>
          ) : (
            <p className="absolute top-50/100 left-50/100 -translate-50/100">
              لا يوجد دورات أخري حالية في هذه الفئة سيتم الاضافة قريبا.
            </p>
          )}
        </section>
        <section className="relative section-gap">
          <SpecialHeading
            mainText="المقالات ذات الصلة"
            secText="عرض جميع المقالات"
            href={Routes.ARTICLES}
          />
          {articlesTsx.length ? (
            <Menu>{articlesTsx}</Menu>
          ) : (
            <p className="absolute top-50/100 left-50/100 -translate-50/100">
              لا يوجد مقالات حالية سيتم الاضافة قريبا.
            </p>
          )}
        </section>
      </Container>
    </div>
  );
};

export default page;
