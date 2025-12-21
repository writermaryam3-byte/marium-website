import Container from "@/components/layouts/Container";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import Link from "@/components/link";
import { Pages, Routes } from "@/app/types/enums";
import { getArticles } from "@/server/db/articles";

const AdminCoursePage = async () => {
  const articles = await getArticles();
  console.log(articles)
  return (
    <main>
      <section>
        <Container>
          <div>
            <Link href={`${Routes.ADMIN}/${Pages.ARTICLES}/${Pages.NEW}`}>
              <Button className="w-full my-4 cursor-pointer rounded-2xl bg-button">اضافة مقالة جديدة</Button>
            </Link>
            <div className="mx-auto py-10">
              <DataTable columns={columns} data={articles} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AdminCoursePage;
