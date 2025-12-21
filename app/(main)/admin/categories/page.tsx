import Container from "@/components/layouts/Container";
import { getCategories } from "@/server/db/category";
import Form from "./_components/Form";
import Category from "./_components/Category";

const CategoriesPage = async () => {
  const cats = await getCategories();
  return (
    <main>
      <section>
        <Container>
          <div>
            <Form/>
            {cats.length ? <ul className="flex flex-wrap gap-5 my-5">
               {cats.map((cat)=>{
                return <Category key={cat.id} category={cat}/>
               })}
            </ul> : <p>لا يوجد فئات حتي الان</p>}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default CategoriesPage;
