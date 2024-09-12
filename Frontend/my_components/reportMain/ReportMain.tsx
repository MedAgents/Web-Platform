import React, { useEffect, useState } from 'react'
// import ReportHero from '../ReportHero/ReportHero'
import ReportTop from '../reportTop/ReportTop'
import { ReportsData, ReportsSchema } from '@/Data/ReportsData'
import ReportHero from '../ReportHero/ReportHero'
import axios from 'axios'
import { BACKEND_URI } from '@/CONSTANTS'
// import CartHero from '../cartHero/cartHero'


interface Props {}

function ReportMain(props: Props) {
    const {} = props
    const [reportData, setReportData] = useState(ReportsData);
    useEffect(()=> {
        const getReports = async () => {
            try {
                let newReportData:ReportsSchema[] = [];
                const reportsRes = await axios.post(`${BACKEND_URI}/patient/getReportList`, {
                })
                const reports = reportsRes.data.data;
                reports.forEach((report: any) => {
                    newReportData.push({
                        id: report._id,
                        previewImgLink: "/images/rep1.png",
                        reportName: report.reportName,
                        reportDate: report.reportDate,
                        location: report.location,
                        reportPDFLink: report.reportPDFLink,
                    })
                })
                setReportData(newReportData);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }
        getReports();
    })

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <ReportTop/>
            <ReportHero data={reportData}/>
        </div>
    )
}

export default ReportMain
