import { ReactNode } from "react";
import AdminTabs from "./_components/AdminTabs";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AdminTabs />
      {children}
    </>
  );
};

export default layout;
