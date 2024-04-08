"use server";
import { v4 as uuidv4 } from "uuid";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
export async function addMoney(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return { error: "Unauthorized Access" };
  }

  const token = uuidv4();
  const newTransaction = await prisma.onRampTransanction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: session?.user?.id,
      amount: amount,
    },
  });
  console.log(newTransaction.id);
  const redirectUrl = `http://${provider}.localhost:5001/wallet/debit?token=${token}&user_identifier=${session.user.id}&amount=${amount}`;
  redirect(redirectUrl);
}
