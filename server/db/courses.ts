import { db } from "@/lib/prisma";
import { cache } from "../cache";

export const getCourses = cache(
  () => {
    return db.course.findMany({
      include:{
        category: {
          select: {
            name: true
          }
        }
      }
    });
  },
  ["available-courses"],
  { revalidate: 3600 }
);

export const getCourseBySlug = (slug: string)=> cache(
  () => {
    return db.course.findUnique({
        where: { slug },
      });
  },
  ["course-by-slug", slug],
  { revalidate: 3600 }
)();
export const getCourseById = (id: string)=> cache(
  () => {
    return db.course.findUnique({
        where: { id },
      });
  },
  ["course-by-id", id],
  { revalidate: 3600 }
)();


export const getCoursesForSpecficCat = (categoryId: string, courseId?: string | null | undefined)=> cache(
    () => {
      return courseId? db.course.findMany({
        where: { categoryId: categoryId, NOT: { id: courseId } },
      }): db.course.findMany({
        where: { categoryId: categoryId, },
      });
    },
    ["course-for-cat", categoryId, courseId||""],
    { revalidate: 3600 }
)();