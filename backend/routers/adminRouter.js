import upload from "../middlewares/multer.js";
import express from 'express';
import { addDoctor, loginAdmin, allDoctors, appointmentListAdmin, cancelAppointmentAdmin, dataForAdminDashboard } from "../controllers/adminControllers.js";
import { changeAvailabilty } from "../controllers/doctorController.js"
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/change-availability', authAdmin, changeAvailabilty)
adminRouter.get('/appointments', authAdmin, appointmentListAdmin)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointmentAdmin);
adminRouter.get('/dashboard-data', authAdmin, dataForAdminDashboard)

export default adminRouter;