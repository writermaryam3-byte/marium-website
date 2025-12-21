import { getCourseById } from "@/server/db/courses";
import Form from "../_components/form";
import Container from "@/components/layouts/Container";
import { getCategories } from "@/server/db/category";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const course = await getCourseById(id);
  const categories = await getCategories()

  return (
    <main>
      <Container>
        <h1 className="text-3xl my-5">تعديل الدورة</h1>
        <Form categories={categories} course={course} />
      </Container>
    </main>
  );
};

export default page;
