import { asyncHandler } from '../Utils/asyncHandler.js';
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import { User } from '../Models/user.model.js';
import { Patient } from '../Models/patient.model.js';
import { Doctor } from '../Models/doctor.model.js';
import jwt from 'jsonwebtoken';

const generateDoctorToken = async (id) => {
    try {
        // if(!req.user.isDoctor){
        //     throw new ApiError(401, 'Unauthorized access');
        // }
        const doctorToken = await jwt.sign(
            {
                _id: id,
            },
            process.env.DOCTOR_TOKEN_SECRET,
            {
                expiresIn: process.env.DOCTOR_TOKEN_EXPIRY
            }
        )
        console.log(doctorToken);
        return doctorToken;
    } catch (error) {
        throw new ApiError(
            500,
            'Something went wrong while generating refresh and access token'
        )
    }
}

const getPatientList = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('doctorDetails');

        if (!user || !user.doctorDetails) {
            throw new ApiError(404, 'Doctor not found');
        }

        const doctor = await Doctor.findById(user.doctorDetails._id).populate('patientsList');

        if (!doctor) {
            throw new ApiError(404, 'Doctor details not found');
        }

        return res.status(200).json(
            new ApiResponse(200, doctor.patientsList, 'Patient list retrieved successfully')
        );
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in getPatientList');
    }
});

const generatePatientCode = asyncHandler(async (req, res) => {
    try {
        const doctorToken = await generateDoctorToken(req.user._id.toString());
        return res.status(200).json(
            new ApiResponse(200, doctorToken, 'Patient code generated successfully')
        );
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in generatePatientCode');
    }
});

const getPatientMedical = asyncHandler(async (req, res) => {
    try {
        const {patientId} = req.body;
        const patient = await Patient.findById(patientId);
        if (!patient) {
            throw new ApiError(404, 'Patient not found');
        }
        return res.status(200).json(
            new ApiResponse(200, {
                medicalHistory: patient.medicalHistorySummary,
                currentSymptoms: patient.currentSymptomsSummary,
                assistiveDiagnosis: patient.assistiveDiagnosis,
            }, 'Patient medical history retrieved successfully')
        );

    }catch (error) {
        throw new ApiError(500, 'Something went wrong in getPatientMedical');
    }
})

export {
    getPatientList,
    generatePatientCode,
    getPatientMedical
};