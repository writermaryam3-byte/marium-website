import Container from "@/components/layouts/Container";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_components/columns";
import { getCourses } from "@/server/db/courses";
import { Button } from "@/components/ui/button";
import Link from "@/components/link";
import { Pages, Routes } from "@/app/types/enums";

const AdminCoursePage = async () => {
  const courses = await getCourses();

  return (
    <main>
      <section>
        <Container>
          <div>
            <Link href={`${Routes.ADMIN}/${Pages.COURSES}/${Pages.NEW}`}>
              <Button className="w-full my-4 cursor-pointer rounded-2xl bg-button">اضافة دورة جديدة</Button>
            </Link>
            <div className="mx-auto py-10">
              <DataTable columns={columns} data={courses} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AdminCoursePage;
