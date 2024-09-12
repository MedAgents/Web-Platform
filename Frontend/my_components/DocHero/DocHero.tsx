import { DocLayout, DocLayoutItem } from '@/components/ui/DocLayout';
import { DocSchema } from '@/Data/DocData'
import React from 'react'

interface Props {
    data: DocSchema[];
}

function DocHero({data}: Props) {
    return (
        <DocLayout className='w-full h-full'> 
            {data.map(({ id, name, speciality, qualifications, imageLink, experience, patientsList }) => (
            <DocLayoutItem
               key={id}
               id={id}
               name= {name}
               speciality={speciality}
               img={imageLink}
               qualification={qualifications}
               experience={experience}
               patientsList={patientsList}
            />
            ))}
        </DocLayout>
    )
}

export default DocHero
