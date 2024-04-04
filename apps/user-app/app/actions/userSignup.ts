"use server";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

interface userInput {
  name: string;
  number: string;
  email: string;
  password: string;
}
export default async function (user: userInput): Promise<Object> {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            number: user.number,
          },
          {
            email: user.email,
          },
        ],
      },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        number: user.number,
        password: hashedPassword,
      },
    });

    return {
      message: `User successfully created with id ${newUser.id}`,
    };
  } catch (e) {
    console.error(e);
    return {
      error: "Internal Server Error",
    };
  }
}
