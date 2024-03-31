import { PrismaClient } from "@repo/db/client";
import Test from "./test";
const client = new PrismaClient();
export default function Page(): JSX.Element {
  return (
    <div>
      <div className="text-xl bg-slate-400">Hi , your balance is</div>
      <Test></Test>
    </div>
  );
}
