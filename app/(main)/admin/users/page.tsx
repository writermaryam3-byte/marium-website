import Container from "@/components/layouts/Container";
import { getUsers } from "@/server/db/user";
import { columns } from "./_components/columns";
import { DataTable } from "../_components/DataTable";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

const UsersPage = async () => {
//   const data = await getData();
  const users = await getUsers();
  return (
    <main>
      <section>
        <Container>
          <div>
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={users} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default UsersPage;
