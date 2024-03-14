import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Connect to MongoDB
        const connection = await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB");

        // Log the connected collections
        const collections = await mongoose.connection.db.collections();
        const collectionNames = collections.map(collection => collection.collectionName);
        console.log("Available collections:", collectionNames);

        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
