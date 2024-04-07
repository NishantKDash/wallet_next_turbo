"use client";
import { signIn, useSession } from "next-auth/react";
import { Signup } from "@repo/ui/signup";
import signUp from "../actions/userSignup";
export default function SignupClient(): JSX.Element {
  return (
    <div>
      <Signup onSignup={signUp} onSignin={signIn}></Signup>
    </div>
  );
}
