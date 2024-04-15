"use client";
import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">PayTM V2</div>
      <div className="flex flex-row justify-center items-center pt-2">
        <div className="flex justify-center items-center mx-2 mb-2">
          Hi {user?.name || "User"}
        </div>
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
