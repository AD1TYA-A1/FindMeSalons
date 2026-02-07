import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request) {
    try {
        const client = await clientPromise
        const db = client.db("Salon")

        const body = await request.json()
        const user = body.user
        const pNo = body.pNo
        // console.log(user);
        // console.log(pNo);
        
        const appointments = await db.collection("contactShop").find({
            user: user,
            pNo: pNo
        }).toArray()
        if (appointments && appointments.length > 0) {
            return NextResponse.json({ success: true, appointments }, { status: 200 })
        }
        return NextResponse.json({ success: false }, { status: 404 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


// SAMPLE DATA

// user
// "Admin HUN"
// pNo
// "8449697670  "
// message
// "Hello I want a haircut on 12th Feb, around 3:30 p.m."
// shopName
// "Admin Shop"
// completed
// false
// rejected
// false
