import Container from "@/components/layouts/Container";
import { Routes } from "@/app/types/enums";
import { notFound } from "next/navigation";
import Crumb from "@/components/ui/Crumb";
import { getArticleById } from "@/server/db/articles";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) notFound();

  const crumbLinks = [
    { href: Routes.ROOT, text: "الرئيسية" },
    { href: Routes.ARTICLES, text: "المقالات" },
  ];
  return (
    <div className="mt-4">
      <Container>
        <Crumb links={crumbLinks} current={article.title} />

        <h2 className="text-center font-bold text-4xl">{article?.title}</h2>
        <article className="mt-5 text-2xl text-gray-300 leading-relaxed tracking-wide p-5">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </article>
      </Container>
    </div>
  );
};

export default page;
