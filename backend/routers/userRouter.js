import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, AppointmentList, cancelAppointments, paymentRazorpay, verifyRazorpay } from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, AppointmentList);
userRouter.post('/cancel-appoinment', authUser, cancelAppointments)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default userRouter;