import { Card, Text, Title } from "@tremor/react";
import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";

type Props = {
  searchParams: {
    q: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const query = searchParams.q;
  const users = await prisma.user.findMany({
    where: {
      name: {
        // partial match
        contains: query,
        // also have the search be case insensitive
        mode: "insensitive",
      },
      email: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A table of users retrieved from our Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
