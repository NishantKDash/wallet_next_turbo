"use client";
import { useBalance } from "@repo/store/useBalance";

export default function () {
  const value = useBalance();
  return <div>{value}</div>;
}
