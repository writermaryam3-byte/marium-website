import { Pages, Routes, UserRole } from "@/app/types/enums";
import EditUserForm from "@/app/(main)/admin/_components/EditUserForm";
import Container from "@/components/layouts/Container";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.user.role === UserRole.ADMIN) redirect(Routes.ADMIN);
  if (!session) {
    redirect(`${Routes.AUTH}/${Pages.LOGIN}`);
  }
  return (
    <main>
      <Container>
        <EditUserForm user={session?.user} />
      </Container>
    </main>
  );
};

export default ProfilePage;
