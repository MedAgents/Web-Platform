import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    speciality: {
        type: String,   
        trim: true
    },
    qualifications: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
    },
    experience: {
        type: String,
        required: true,
    },
    patientsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        }
    ],
}, {timestamps:true})

export const Doctor = mongoose.model('Doctor', doctorSchema)
