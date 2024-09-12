import React, { useEffect } from 'react'
import CartTop from '../cartTop/cartTop'
import DocHero from '../DocHero/DocHero'
import { DocData, DocSchema } from '@/Data/DocData'
import axios from '@/utils/axios'
import { BACKEND_URI } from '@/CONSTANTS'

// export interface DocSchema{
//     id?: string;
//     name?: string;
//     speciality?:string;
//     qualifications?: string;
//     imageLink?: string;
//     experience?: string;
//     patientsList?: Array<string>;  
// }

function MyCartMain() {
    useEffect(() => {
        const getDoctorList = async () => {
            try {
                const doctorListRes = await axios.post(`${BACKEND_URI}/patient/getDoctorList`, {
                })
                const doctorList = doctorListRes.data.data;
                const doctorData:DocSchema[] = [];
                doctorList.forEach((doctor: any) => {
                    doctorData.push({
                        id: doctor.id,
                        name: doctor.name,
                        speciality: doctor.speciality,
                        qualifications: doctor.qualifications,
                        imageLink: doctor.imageLink,
                        experience: doctor.experience,
                    })
                })
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    })
    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <CartTop/>
            <DocHero data={DocData}/>
        </div>
    )
}

export default MyCartMain
