import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary";
import AppointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing details."
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(422).json({
                success: false,
                message: "Please enter a valid email."
            })
        }

        if (password.length < 8) {
            return res.status(422).json({
                success: false,
                message: "Password should contain minimum 8 characters."
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = await userModel.create(userData);

        res.status(201).json({
            success: true,
            message: "Registered successfully.",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(201).json({
                success: true,
                message: "Login successfully",
                token
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error: " + err.message
        })
    }
}

//API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const userProfile = await userModel.findById(userId).select('-password');

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "No data found"
            })
        }

        res.status(201).json({
            success: true,
            userProfile
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//Api to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !gender || !phone || !dob) {
            return res.status(400).json({
                success: false,
                message: "Missing details"
            })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.status(201).json({
            success: true,
            message: "Profile updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId } = req.params;
        const { docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.status(409).json({
                success: false,
                message: "Doctor not available"
            })
        }

        let slots_booked = docData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(409).json({
                    success: false,
                    message: "Slot not available"
                })
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = await AppointmentModel.create(appointmentData);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        if (newAppointment) {
            res.status(201).json({
                success: true,
                message: "Appoinment booked"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

///Api to get list of all appointments of user

const AppointmentList = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await AppointmentModel.find({ userId });

        res.status(201).json({
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

//API to cancel user appointments
const cancelAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const { appointmentId } = req.body;
        const appointmentData = await AppointmentModel.findById(appointmentId);

        if (appointmentData.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized action"
            })
        }

        await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;

        const docData = await doctorModel.findById(docId);

        let slots_booked = docData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.status(200).json({
            success: true,
            message: "Appointment cancelled."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//razorpay instace

const razorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//API to make payments of appoinments using razorpay

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await AppointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.status(404).json({
                success: false,
                message: "Appointment cancelled or not found."
            })
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        const order = await razorPayInstance.orders.create(options);

        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

//API to verify razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            await AppointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.status(200).json({
                success: true,
                message: "Payment Successfull"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Payment Failed"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error: " + error.message
        })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, AppointmentList, cancelAppointments, paymentRazorpay, verifyRazorpay }