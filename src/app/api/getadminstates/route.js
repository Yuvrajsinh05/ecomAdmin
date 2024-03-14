import mongoose from "mongoose";
import { connectDB } from "@/utils/features";
import { getCountsAndBrands ,getTotalPayment} from "./operations";


export const GET = async (Request) => {
    try {
        await connectDB()
        const category = await mongoose.connection.db.collection('categories').find({}).toArray()
        const users = await mongoose.connection.db.collection('customers').find({}).toArray()
        const Orders = await mongoose.connection.db.collection('orders').find({}).toArray()
        const CountsBrands = getCountsAndBrands(category)
        
        console.log("sendcountbrand",CountsBrands)



        const TotalAmount =getTotalPayment(Orders)
        console.log("linetolineDebuging",TotalAmount)

        const JsonIt = {
            cateBrandCount:CountsBrands,
            ordersCount:Orders.length,
            TotalAmount:TotalAmount,
            TotalUsers:users.length

        }
        const JsonData = JSON.stringify(JsonIt)
        const JsonUsers = JSON.stringify(users)
        const JsonOrders = JSON.stringify(Orders)
        // console.log("CountsBrands",TotalAmount)
        return new Response(JsonData, { status: 200, headers: { 'Content-Type': 'application/json' } })
    } catch (err) {
        return new Response("Internal Server Err !", { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}