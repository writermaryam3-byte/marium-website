import { db } from "@/lib/prisma";
import { cache } from "../cache";

export const getArticles = cache(
  () => {
    return db.article.findMany({
      include:{
        category:{
          select: {
            name: true
          }
        }
      }
    });
  },
  ["available-Articles"],
  { revalidate: 3600 }
);

export const getArticleBySlug = (slug: string)=> cache(
  () => {
    return db.article.findUnique({
        where: { slug },
      });
  },
  ["article-by-slug", slug],
  { revalidate: 3600 }
)();
export const getArticleById = (id: string)=> cache(
  () => {
    return db.article.findUnique({
        where: { id },
      });
  },
  ["article-by-id", id],
  { revalidate: 3600 }
)();


export const getArticlesForSpecficCat = (categoryId: string, articleId?: string | null | undefined)=> cache(
    () => {
      return articleId? db.article.findMany({
        where: { categoryId: categoryId, NOT: { id: articleId } },
      }): db.article.findMany({
        where: { categoryId: categoryId, },
      });
    },
    ["article-for-cat", categoryId, articleId||""],
    { revalidate: 3600 }
)();