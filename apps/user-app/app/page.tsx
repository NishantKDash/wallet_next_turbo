import SignupClient from "./components/SignupClient";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/dashboard");
  else
    return (
      <div>
        <SignupClient></SignupClient>
      </div>
    );
}
