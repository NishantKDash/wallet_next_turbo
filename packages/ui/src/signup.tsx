"use client";
import { useState } from "react";

interface userInput {
  name: string;
  number: string;
  email: string;
  password: string;
}

interface Signupprops {
  onSignup: ({}: userInput) => Promise<Object>;
}

export function Signup({ onSignup }: Signupprops): JSX.Element {
  const [user, setUser] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="h-2/5 w-1/5 border-2  shadow-md flex-col text-center overflow-y-auto">
        <div className="mt-4 font-bold text-xl">PayTM</div>

        <div className="mt-4 font-bold text-md">Signup</div>

        <div className="mt-2 flex flex-col items-center">
          <input
            className="my-2 focus:outline-none border-2 border-slate-300 rounded py-1 w-full md:w-2/3 max-w-lg"
            placeholder="Name"
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          ></input>
          <input
            className="my-2 focus:outline-none border-2 border-slate-300 rounded py-1 w-full md:w-2/3 max-w-lg"
            placeholder="Phone Number"
            onChange={(e) => {
              setUser({ ...user, number: e.target.value });
            }}
          ></input>
          <input
            className="my-2 focus:outline-none border-2 border-slate-300 rounded py-1 w-full md:w-2/3 max-w-lg"
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          ></input>
          <input
            className="my-2 focus:outline-none border-2 border-slate-300 rounded py-1 w-full md:w-2/3 max-w-lg"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          ></input>
          <div
            className="mt-4 rounded-lg bg-blue-600 text-white p-1 w-full md:w-2/3 max-w-lg cursor-pointer"
            onClick={async () => {
              const res = await onSignup(user);
              console.log(res);
            }}
          >
            Sign up !
          </div>
        </div>
      </div>
    </div>
  );
}
