"use client";
import HealthChat from "@/my_components/healthchat-ai/HealthChat";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
  })
  return (
    <>
    <HealthChat></HealthChat>
    </>
  );
}
