import Navbar from "@/components/Navbar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return <Navbar user={session?.user} />;
}
