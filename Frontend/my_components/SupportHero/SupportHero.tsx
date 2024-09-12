import { ReportLayout, ReportLayoutItem } from "@/components/ui/ReportLayout";
import { ReportsSchema } from "@/Data/ReportsData";
import React from "react";
import HealthChat from "../healthchat-ai/HealthChat";

interface Props {
  data?: ReportsSchema[];
}

// id?: string;
//     previewImgLink?: string;
//     reportName?: string;
//     reportDate?: string;
//     location?: string;
//     reportPDFLink: string;

function SupportHero({ data }: Props) {
  return (
    <>
        <HealthChat/>
    </>
  );
}

export default SupportHero;
