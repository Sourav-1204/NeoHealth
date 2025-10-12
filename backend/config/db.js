import mongoose from 'mongoose';

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to database.');
    } catch (e) {
        console.log('Connection failed.', e);
    }
}

export default connectToDb;