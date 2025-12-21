import Link from "@/components/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

const Crumb = ({
  links,
  current,
  classNames="mt-5 mb-7"
}: {
  links: { href: string; text: string }[];
  current: string;
  classNames?: string
}) => {
  return (
    <Breadcrumb className={classNames}>
      <BreadcrumbList>
        {links.map((link, i) => {
          return (
            <Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={link.href}>{link.text}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="rotate-180" />
            </Fragment>
          );
        })}

        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Crumb;
