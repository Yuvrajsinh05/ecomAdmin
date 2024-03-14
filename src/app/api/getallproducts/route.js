import mongoose from "mongoose";
import { connectDB } from "@/utils/features";

export async function GET(req, res) {
    try {
        await connectDB();

        const Fashion = await mongoose.connection.db.collection('fashions').find({}).toArray();
        const Computers = await mongoose.connection.db.collection('computer&accesserioes').find({}).toArray();
        const Mobiles = await mongoose.connection.db.collection('mobiles').find({}).toArray();

        const mergedData = [...Fashion, ...Computers, ...Mobiles];

        // You can include a custom message along with the merged data
        const message = "Data retrieved successfully";

        // Return the merged data along with the message

        const responseBody = JSON.stringify(mergedData);
        return new Response( responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        console.error("Error:", err);
        // Return an error response
        const errorResponse = JSON.stringify({ error: "Internal Server Error" });
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(errorResponse);
    }
}
