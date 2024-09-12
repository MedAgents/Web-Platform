export interface ReportsSchema {
    id?: string;
    previewImgLink?: string;
    reportName?: string;
    reportDate?: string;
    location?: string;
    reportPDFLink?: string;
}

export const ReportsData: ReportsSchema[] = [
    {
        id: "r1",
        previewImgLink: "/images/rep1.png",
        reportName: "ECG",
        reportDate: "2022-01-03",
        location: "St. Mary's Hospital",
        reportPDFLink: "https://www.vectracor.com/wp-content/uploads/2020/03/ECG-Sample-Report-1.pdf",
    },
    {
        id: "r2",
        previewImgLink: "/images/rep1.png",
        reportName: "Kidney Profile Test",
        reportDate: "2022-02-01",
        location: "General Hospital",
        reportPDFLink: "https://cdn1.lalpathlabs.com/live/reports/Z007.pdf",
    },
    {
        id: "r3",
        previewImgLink: "/images/rep1.png",
        reportName: "Liver Function Test",
        reportDate: "2022-03-01",
        location: "City Medical Center",
        reportPDFLink: "https://cdn1.lalpathlabs.com/live/reports/Z005.pdf",
    },
]