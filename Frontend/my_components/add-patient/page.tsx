"use client";
import AddPatient from "@/my_components/add-patient/AddPatient";
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
    <AddPatient></AddPatient>
    </>
  );
}
