import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL)
        if (connection.readyState === 1) {
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Throw the error to be caught by the calling code
    }
};

export default connectMongo;
