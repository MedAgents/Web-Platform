import { asyncHandler } from '../Utils/asyncHandler.js';
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import { User } from '../Models/user.model.js'; // Ensure correct import paths
import { Patient } from '../Models/patient.model.js';
import { Doctor } from '../Models/doctor.model.js';
import jwt from 'jsonwebtoken';

const getDoctorList = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('patientDetails');

        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }

        const patient = await Patient.findById(user.patientDetails._id).populate('doctorsList');

        if (!patient) {
            throw new ApiError(404, 'Patient details not found');
        }

        return res.status(200).json(
            new ApiResponse(200, patient.doctorsList, 'Doctor list retrieved successfully')
        );
    } catch (error) {
        console.error("Error in getDoctorList:", error); // Log the actual error for better debugging
        throw new ApiError(500, 'Something went wrong in getDoctorList');
    }
});

const addDoctor = asyncHandler(async (req, res) => {
    try {
        const { doctorGeneratedOneTimeToken } = req.body;

        // Verify the token
        const decoded = jwt.verify(doctorGeneratedOneTimeToken, process.env.DOCTOR_TOKEN_SECRET);
        const doctorId = decoded._id; // Assuming the doctor ID is stored as _id in the token payload
        
        // Find the user (patient) by ID
        const user = await User.findById(req.user._id).populate('patientDetails');
        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }
        
        // Find the doctor by the decoded doctorId
        const doctor = await User.findById(doctorId);
        if (!doctor) {
            throw new ApiError(404, 'Doctor not found');
        }
        
        // Add doctor to patient's doctorsList
        const patient = await Patient.findById(user.patientDetails._id);
        if (!patient.doctorsList.includes(doctor._id)) {
            patient.doctorsList.push(doctor._id);
            await patient.save();
        }
        
        const doc = await Doctor.findById(doctor.doctorDetails._id);
        // Add patient to doctor's patientsList
        if (!doc.patientsList.includes(patient._id)) {
            doc.patientsList.push(patient._id);
            await doc.save();
        }

        // Return the doctor's data
        return res.status(200).json(
            new ApiResponse(200, doctor, 'Doctor added successfully')
        );
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Invalid or expired token');
        }
        throw new ApiError(500, 'Something went wrong in addDoctor');
    }
});

const getReportList = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('patientDetails');
        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }
        const patient = await Patient.findById(user.patientDetails._id).populate('reportsList');
        if (!patient) {
            throw new ApiError(404, 'Patient details not found');
        }

        return res.status(200).json(
            new ApiResponse(200, patient.reportsList, 'Report list retrieved successfully')
        );
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in getReportList');
    }
});

const addReport = asyncHandler(async (req, res) => {
    try {
        const { reportName, location, reportDate, reportPDFLink } = req.body;
        const user = await User.findById(req.user._id).populate('patientDetails');
        
        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }
        
        const patient = await Patient.findById(user.patientDetails._id);

        // Add report details to patient's reportsList
        const newReport = {
            reportName,
            reportDate,
            location,
            reportPDFLink,
        };
        patient.reportsList.push(newReport);
        await patient.save();

        return res.status(200).json(
            new ApiResponse(200, newReport, 'Report added successfully')
        );
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in addReport');
    }
});

export {
    getDoctorList,
    addDoctor,
    getReportList,
    addReport,
};
