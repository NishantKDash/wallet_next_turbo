"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { addMoney } from "../actions/onRampTransactions";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    key: "hdfc",
  },
  {
    name: "Axis Bank",
    key: "axis",
  },
];

export const AddMoney = () => {
  const [provider, setProvider] = useState("hdfc");
  const [amount, setAmount] = useState("");

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={setAmount}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={setProvider}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.key,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              if (amount === "") alert("Amount cant be null");
              else addMoney(provider, Number(amount) * 100);
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
