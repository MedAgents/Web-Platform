"use client";
import AddReportForm from "@/my_components/my-report/AddReportForm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
  })
  return (
    <>
    <AddReportForm></AddReportForm>
    </>
  );
}
