import doctorModel from "../models/doctorModel.js";
import AppointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const changeAvailabilty = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !doctData.available });

        res.status(201).json({
            success: true,
            message: "Availabilty changed"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
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
            message: "Internal server error: " + err.message
        })
    }
}

//API for doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = await jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.status(200).json({
                success: true,
                message: "Login Successfully",
                token
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + err.message
        })
    }
}

//API to get all doctor appoinments
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.params;
        const appointments = await AppointmentModel.find({ docId });

        if (!appointments) {
            return res.status(404).json({
                success: false,
                message: "No appointment found"
            })
        }

        res.status(200).json({
            success: true,
            appointments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//API to mark appointment completed for doctor panel
const apppointmentCompleted = async (req, res) => {
    try {
        const { docId } = req.params;
        const { appointmentId } = req.body;
        const appointmentData = await AppointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.status(200).json({
                success: true,
                message: "Appointment Completed"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Appointment already completed or not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//API to mark appointment cancelled for doctor panel
const cancelAppointemnt = async (req, res) => {
    try {
        const { docId } = req.params;
        const { appointmentId } = req.body;
        const appointmentData = await AppointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.status(200).json({
                success: true,
                message: "Appointment Cancelled"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Appointment cancelled or not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//API for doctor dashboard data
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.params;
        const appointments = await AppointmentModel.find({ docId });

        let earnings = 0;
        appointments.map((item) => {
            if (item.payment || item.isCompleted) {
                earnings += item.amount;
            }
        })

        let patients = [];

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.status(200).json({
            success: true,
            dashData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//API to get doctor profile
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.params;
        const doctorData = await doctorModel.findById(docId).select('-password');

        if (!doctorData) {
            return res.status(404).json({
                success: false,
                message: "No data found"
            })
        }
        res.status(200).json({
            success: true,
            doctorData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

const updateDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.params;
        const { fees, available, address } = req.body;

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}
export { changeAvailabilty, doctorList, loginDoctor, appointmentsDoctor, cancelAppointemnt, apppointmentCompleted, doctorDashboard, doctorProfile, updateDoctorProfile }