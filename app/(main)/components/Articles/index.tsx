import { CardTypes, Routes } from "@/app/types/enums";
import Container from "@/components/layouts/Container";
import SpecialHeading from "@/components/ui/SpecialHeading";
import MenuCard from "@/components/ui/MenuCard";
import Menu from "@/components/ui/Menu";
import { db } from "@/lib/prisma";
import moment from "moment"
import "moment/locale/ar"
import { getArticles } from "@/server/db/articles";
import { getCategoryById } from "@/server/db/category";
moment.locale("ar")
const Articles = async () => {
  const articlesList = await getArticles()
  const articlesTsx = articlesList.map(async(article)=>{
    const category = await getCategoryById(article.categoryId)
    return  <MenuCard key={article.id}
    card={{
      type: CardTypes.ARTICLE,
      cardTitle: article.title,
      des: article.description,
      createdAt: moment(article.createdAt).format('Do MMMM YYYY'),
      readingTime: article.readingTime,
      imgSrc: article.image,
      id: article.id,
      category: category?.name
    }}
  />
  })
  return (
    <section className="section-gap relative">
      <Container>
        <SpecialHeading mainText="المقالات" secText="عرض جميع المقالات" href={Routes.ARTICLES} />
        {articlesTsx.length?(
          <Menu>{articlesTsx}</Menu>
        ):(
          <p className="absolute top-50/100 left-50/100 -translate-50/100">
            لا يوجد مقالات حالية سيتم الاضافة قريبا.
          </p>
        )}
      </Container>
    </section>
  );
};

export default Articles;
