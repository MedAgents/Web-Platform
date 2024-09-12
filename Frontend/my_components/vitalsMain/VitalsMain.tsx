import React from 'react'
// import ReportHero from '../ReportHero/ReportHero'
import ReportTop from '../reportTop/ReportTop'
import { ReportsData } from '@/Data/ReportsData'
import ReportHero from '../ReportHero/ReportHero'
import VitalsTop from '../vitalsTop/VitalsTop'
import VitalsHero from '../vitalsHero/VitalsHero'
// import CartHero from '../cartHero/cartHero'


interface Props {}

function VitalsMain(props: Props) {
    const {} = props

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <VitalsTop/>
            <VitalsHero />
        </div>
    )
}

export default VitalsMain
