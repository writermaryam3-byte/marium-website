import { Pages, Routes, UserRole } from "@/app/types/enums";
import EditUserForm from "@/app/(main)/admin/_components/EditUserForm";
import Container from "@/components/layouts/Container";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.user.role === UserRole.USER) redirect(Routes.PROFILE);
  if (!session) {
    redirect(`${Routes.AUTH}/${Pages.LOGIN}`);
  }
  return (
    <main>
      <Container className="mb-5">
        <EditUserForm user={session?.user} />
      </Container>
    </main>
  );
};

export default AdminPage;
