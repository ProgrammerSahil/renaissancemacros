import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://boutmachine:9eNlw7iDUmrPJcn@cluster0.udhcpvu.mongodb.net/renaissanceMacros').then(() => {
        console.log('connected to db');
    })
}