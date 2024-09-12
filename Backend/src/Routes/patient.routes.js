import { Router } from "express";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { addDoctor, addReport, getDoctorList, getReportList } from "../Controllers/patient.controller.js";

const router = Router();

// secured routs
router.route("/getDoctorList").post(verifyJWT, getDoctorList);
router.route("/addDoctor").post(verifyJWT, addDoctor);
router.route("/getReportList").post(verifyJWT, getReportList);
router.route("/addReport").post(verifyJWT, addReport);

export default router;