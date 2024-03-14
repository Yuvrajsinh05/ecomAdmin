import mongoose from "mongoose";
import { connectDB } from "@/utils/features";

export const GET = async (Request) => {
    try {
        await connectDB();
        const FoundUsers = await mongoose.connection.db.collection('customers');
        const ordersCollection = await mongoose.connection.db.collection('orders');

        // Find all users
        const allUsers = await FoundUsers.find({}).sort({ createdAt: -1 }).toArray();


        // Create an object to store user details along with their orders
        const usersWithOrders = [];

        // Loop through each user and find their orders based on Customer_id
        for (const user of allUsers) {
            try {
                const userOrders = await ordersCollection.find({ customer_id: user._id }).toArray();
                usersWithOrders.push({ ...user, orders: userOrders });
            } catch (error) {
                console.error(`Error fetching orders for user ${user._id}:`, error);
            }
        }
        // Return users with their orders
        return new Response(JSON.stringify(usersWithOrders), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        console.error("Internal Server Error:", err);
        const errorResponse = JSON.stringify({ error: "Internal Server Error" });
        return new Response(errorResponse, { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
