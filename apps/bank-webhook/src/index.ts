import express from "express";
import dotenv from "dotenv";
import prisma from "@repo/db/client";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.post("/", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.balance.updateMany({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      prisma.onRampTransanction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      error: "Error while processing webhook",
    });
  }
});

app.listen(port, () => {
  console.log(`Bank Web-Hook running on port ${port}`);
});
