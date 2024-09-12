import { DocViewLayout, DocViewLayoutItem } from "@/components/ui/DocViewLayout";
import { ReportLayout, ReportLayoutItem } from "@/components/ui/ReportLayout";
import { PatientSchema } from "@/Data/PatientData";
import React from "react";

interface Props {
  data: PatientSchema[];
}

// id?: string;
//     sex?: string;
//     age?: string;
//     img?: string;
//     currentCondition?: string;
//     bloodGroup?: string;
//     medicalHistorySummary?: string;
//     currentSymptomsSummary?: string;
//     assistiveDiagnosis?: string;
//     reportsList?: any;
//     doctorsList?: any;

function DocViewHero({ data }: Props) {
  return (
    <DocViewLayout className="w-full">
      {data.map(
        ({
          id,
          name,
          sex,
          age,
          img,
          currentCondition,
          bloodGroup,
          medicalHistorySummary,
          currentSymptomsSummary,
          assistiveDiagnosis,
          reportsList,
          doctorsList,
        }) => (
          <DocViewLayoutItem
            key={id}
            id={id}
            name= {name}
            sex={sex}
            age={age}
            img={img}
            currentCondition={currentCondition}
            bloodGroup={bloodGroup}
            medicalHistorySummary={medicalHistorySummary}
            currentSymptomsSummary={currentSymptomsSummary}
            assistiveDiagnosis={assistiveDiagnosis}
            reportsList={reportsList}
            doctorsList={doctorsList}
          />
        ),
      )}
    </DocViewLayout>
  );
}

export default DocViewHero;
