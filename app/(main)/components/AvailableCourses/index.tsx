import { formatCurrency } from "@/lib/formatters";
import { CardTypes, Routes } from "@/app/types/enums";
import SpecialHeading from "@/components/ui/SpecialHeading";
import MenuCard from "@/components/ui/MenuCard";
import Container from "@/components/layouts/Container";
import Menu from "@/components/ui/Menu";
import { db } from "@/lib/prisma";
import { getCourses } from "@/server/db/courses";

const AvailableCourses = async () => {
  const coursesList = await getCourses()
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
  return (
    <section className="section-gap relative">
      <Container>
        <SpecialHeading
          mainText="الدورات المتاحة"
          secText="عرض جميع الدورات"
          href={Routes.COURSES}
        />
        {coursesTsx.length ? (
          <Menu>{coursesTsx}</Menu>
        ) : (
          <p className="absolute top-50/100 left-50/100 -translate-50/100">
            لا يوجد دورات حالية سيتم الاضافة قريبا.
          </p>
        )}
      </Container>
    </section>
  );
};

export default AvailableCourses;
