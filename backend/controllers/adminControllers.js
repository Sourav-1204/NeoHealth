import doctorModel from "../models/doctorModel.js";
import AppointmentModel from "../models/appointmentModel.js";
import userModel from '../models/userModel.js'
import validator from 'validator';
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

async function addDoctor(req, res) {
    try {
        const { name, email, password, speciality, degree, experience, about, address, fees, date } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !address || !fees || !imageFile) {
            return res.status(401).json({
                success: false,
                message: "Mising fields"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(401).json({
                success: false,
                message: "Please Enter a valid email"
            })
        }

        if (password.length < 8) {
            return res.status(401).json({
                success: false,
                message: "Password should be more than 8 charatcers"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            address: JSON.parse(address),
            fees,
            date: Date.now()
        }

        const newDoctor = await doctorModel.create(doctorData);

        res.status(201).json({
            success: true,
            message: "New doctor added succesfully",
            data: newDoctor
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User already exist with same email" + err
        })
    }
}

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
            res.status(201).json({
                success: true,
                message: "Login Successfully",
                token
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        if (!doctors) {
            return res.status(404).json({
                success: false,
                message: "No doctor found"
            })
        }
        res.status(201).json({
            success: true,
            doctors
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later"
        })
    }
}

//API to get all appointment list

const appointmentListAdmin = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({});
        if (appointments) {
            res.status(200).json({
                success: true,
                appointments
            })
        } else {
            res.status(404).josn({
                success: false,
                message: "No appointment found."
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later"
        })
    }
}

//API for appointment cancellation
const cancelAppointmentAdmin = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointment = await AppointmentModel.findById(appointmentId);

        await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointment;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.status(201).json({
            success: true,
            message: "Appoinment cancelled"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later"
        })
    }
}

//API to get dashboard data for admin

const dataForAdminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await AppointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.status(201).json({
            success: true,
            dashData
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later"
        })
    }
}
export { addDoctor, loginAdmin, allDoctors, appointmentListAdmin, cancelAppointmentAdmin, dataForAdminDashboard }

