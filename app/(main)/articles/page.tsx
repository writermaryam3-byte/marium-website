import { CardTypes } from '@/app/types/enums'
import Container from '@/components/layouts/Container'
import Menu from '@/components/ui/Menu'
import MenuCard from '@/components/ui/MenuCard'
import SpecialHeading from '@/components/ui/SpecialHeading'
import { getArticlesForSpecficCat } from '@/server/db/articles'
import { getCategories, getCategoryById } from '@/server/db/category'
import moment from 'moment'

const Articles = async() => {
  const categories = await getCategories()
  const articlesForSpecficCatTsx = categories.map(async(cat)=>{
    const articlesList = await getArticlesForSpecficCat(cat.id)
    const articlesTsx = articlesList.map(async(article)=>{
      const category = await getCategoryById(article.categoryId)
      return  <MenuCard key={article.id}
      card={{
        type: CardTypes.ARTICLE,
        title: article.title,
        des: article.description,
        createdAt: moment(article.createdAt).format('Do MMMM YYYY'),
        readingTime: article.readingTime,
        imgSrc: article.image,
        id: article.id,
        category: category?.name
      }}
    />
    })
    if(articlesTsx.length===0)return
    return  <section key={cat.id}>
    <SpecialHeading mainText={cat.name}/>
    <Menu>
        {articlesTsx}
    </Menu>
  </section>
  })
  return (
   <Container className='my-5 flex flex-col gap-5'>
    {articlesForSpecficCatTsx}
   </Container>
  )
}

export default Articles