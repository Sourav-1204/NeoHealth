import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectToDb from './config/db.js';
import connectToCloudinary from './config/cloudinary.js';
import adminRouter from './routers/adminRouter.js';
import doctorRouter from './routers/doctorRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
connectToDb();
connectToCloudinary();

app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
})