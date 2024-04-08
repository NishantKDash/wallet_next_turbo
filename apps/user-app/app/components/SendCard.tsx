"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../actions/p2pTransactions";
import { useRouter } from "next/navigation";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  const response = await p2pTransfer(
                    number,
                    Number(amount) * 100
                  );
                  if (response && response.error) {
                    alert(response.error);
                  } else if (response && response.message) {
                    alert(response.message);
                    router.push("/dashboard");
                  }
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
