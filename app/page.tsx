"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push("/client");
  }, []);
  return <p></p>;
}
