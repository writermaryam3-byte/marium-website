import Form from "../_components/form";
import Container from "@/components/layouts/Container";
import { getArticleById } from "@/server/db/articles";
import { getCategories } from "@/server/db/category";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const article = await getArticleById(id);
  const categories = await getCategories()

  return (
    <main>
      <Container>
        <h1 className="text-3xl my-5">تعديل المقالة</h1>
        <Form categories={categories} article={article} />
      </Container>
    </main>
  );
};

export default page;
