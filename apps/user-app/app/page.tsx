"use client";
import { Appbar } from "@repo/ui/appbar";
import { Signup } from "@repo/ui/signup";
import { signIn, signOut, useSession } from "next-auth/react";
import signUp from "./actions/userSignup";
export default function Page(): JSX.Element {
  const session = useSession();
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      {!session.data?.user && <Signup onSignup={signUp}></Signup>}
    </div>
  );
}
