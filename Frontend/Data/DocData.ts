export interface DocSchema{
    id?: string;
    name?: string;
    speciality?:string;
    qualifications?: string;
    imageLink?: string;
    experience?: string;
    patientsList?: Array<string>;  
}

export const DocData: DocSchema[] = [
    {
        id: "d1",
        name: "Dr. Emily Brown",
        speciality: "Pediatrics",
        qualifications: "MBBS, MD, Pediatric Surgeon",
        imageLink: "/images/Doc1.png",
        experience: "10",
    },
    {
        id: "d2",
        name: "Dr. Gregory House",
        speciality: "Diagnostician",
        qualifications: "MD, Nephorologist",
        imageLink: "/images/Doc2.png",
        experience: "24",
    },
    {
        id: "d3",
        name: "Dr. Sarah Davis",
        speciality: "Cardiology",
        qualifications: "MBBS, MD, Cardiologist",
        imageLink: "/images/Doc3.png",
        experience: "12",
    },
    {
        id: "d4",
        name: "Dr. James Wilson",
        speciality: "Oncologist",
        qualifications: "MBBS, MD, Oncology",
        imageLink: "/images/Doc4.png",
        experience: "14",
    }
]

