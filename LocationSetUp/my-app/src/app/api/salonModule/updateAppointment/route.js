import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("Salon")
        const body = await request.json()
        console.log(body);
        
        const user = body.user
        const message = body.message
        const pNo = body.pNo
        const completed = body.completed
        const rejected = body.rejected
        const scheduledMessage = body.scheduledMessage
        const appointment = await db.collection("contactShop").find({
            user: user,
            pNo: pNo,
            message: message
        })

        if (appointment) {
            if (completed) {
                const updateDoc = await db.collection("contactShop").updateOne({
                    user: user,
                    pNo: pNo,
                    message: message
                }, {
                    $set: {
                        scheduledMessage:scheduledMessage,
                        scheduled:true
                    }
                })
                return NextResponse.json({ success: true, updateDoc }, { status: 201 })
            }
            if (rejected) {
                const delDoc = await db.collection("contactShop").deleteOne({
                    user: user,
                    pNo: pNo,
                    message: message
                })
                return NextResponse.json({ success: true, message: " Document Deleted" }, { status: 201 })
            }

        }
        return NextResponse.json({ success: false, message: "No Appointment Found" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}