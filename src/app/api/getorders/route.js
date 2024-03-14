import { connectDB } from "@/utils/features"; // Assuming connectDB function is defined in this file
import mongoose from "mongoose";

export async function GET(req, res) {
    try {
        // Connect to the database if not already connected
        await connectDB();

        // Query all orders from the "orders" collection
        const ordersCollection = await mongoose.connection.db.collection('orders');
        const allOrders = await ordersCollection.find({}).toArray();

        // Return the orders
        const responseBody = JSON.stringify(allOrders);
        return new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error fetching orders:", error);
        const errorResponse = JSON.stringify({ error: "Internal Server Error" });
        return new Response(errorResponse, { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
