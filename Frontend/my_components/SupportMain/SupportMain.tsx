import React from 'react'
import SupportTop from '../SupportTop/SupportTop'
import SupportHero from '../SupportHero/SupportHero'
import HealthChat from '../healthchat-ai/HealthChat'


interface Props {}

function SupportMain(props: Props) {
    const {} = props

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <SupportTop/>
            <SupportHero />
        </div>
    )
}

export default SupportMain
