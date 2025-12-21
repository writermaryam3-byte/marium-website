import { CardTypes } from "@/app/types/enums";
import Container from "@/components/layouts/Container";
import Menu from "@/components/ui/Menu";
import MenuCard from "@/components/ui/MenuCard";
import SpecialHeading from "@/components/ui/SpecialHeading";
import { formatCurrency } from "@/lib/formatters";
import { getCategories } from "@/server/db/category";
import { getCoursesForSpecficCat } from "@/server/db/courses";

const Courses = async () => {
  const categories = await getCategories();
  const coursesForSpecficCatTsx = categories.map(async (cat) => {
    const coursesList = await getCoursesForSpecficCat(cat.id)
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
    if (coursesTsx.length === 0) return;
    return (
      <section key={cat.id} className="relative">
        <SpecialHeading mainText={cat.name} />
        <Menu>{coursesTsx}</Menu>
      </section>
    );
  });
  return (
    <Container className="my-5 flex flex-col gap-5">
      {coursesForSpecficCatTsx}
    </Container>
  );
};

export default Courses;
