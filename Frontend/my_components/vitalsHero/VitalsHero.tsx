import { ReportLayout, ReportLayoutItem } from "@/components/ui/ReportLayout";
import { ReportsSchema } from "@/Data/ReportsData";
import React from "react";

interface Props {
  data?: ReportsSchema[];
}

function VitalsHero({ data }: Props) {
  return (
    <div className="flex flex-row gap-4 w-full h-full">
        <div className="flex flex-col gap-4 w-[35%]">
            <img src="/images/BMI.png" alt="" className="w-[100%]"/>
            <img src="/images/Glucose.png" alt="" className="w-[100%]" />
        </div>
        <div className="flex flex-col w-[20.3%]">
            <img src="/images/Fat.png" alt="" className="w-full"/>
        </div>
        <div className="flex flex-col gap-4 w-[20%]">
            <img src="/images/Schedule.png" alt="" className="w-full" />
        </div>
        <div className="flex flex-col gap-4 w-[20%]">
          <img src="/images/Circle.png" alt="" className="w-full" />
        </div>
    </div>
  );
}

export default VitalsHero;
