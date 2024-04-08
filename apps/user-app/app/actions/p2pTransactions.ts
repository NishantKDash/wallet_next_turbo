"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
export async function p2pTransfer(receiver: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return { error: "Unauthorized Access" };
  }

  const to = await prisma.user.findUnique({
    where: {
      number: receiver,
    },
  });

  if (!to)
    return {
      error: "No User found ",
    };

  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${session.user.id} FOR UPDATE`;
      const curBalance = await tx.balance.findUnique({
        where: {
          userId: session.user.id,
        },
      });

      if (curBalance?.amount) {
        if (curBalance.amount < amount) throw new Error("Insufficient Funds");
      }
      await tx.balance.update({
        where: {
          userId: session.user.id,
        },
        data: {
          amount: { decrement: amount },
        },
      });

      await tx.balance.update({
        where: {
          userId: to?.id,
        },
        data: {
          amount: { increment: amount },
        },
      });

      await tx.p2pTransfer.create({
        data: {
          amount: amount,
          timeStamp: new Date(),
          fromUserId: session.user.id,
          toUserId: to.id,
        },
      });
    });
    return {
      message: "Success",
    };
  } catch (e: any) {
    console.log(e);
    return { error: e.message };
  }
}
