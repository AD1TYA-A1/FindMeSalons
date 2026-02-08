import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("Salon");
        const body = await request.json();
        const salonName = body.salonName;

        // Convert cursor to array using toArray()
        const appointments = await db.collection("contactShop")
            .find({
                shopName: salonName,  // Remove the extra quotes
                completed:false,
                rejected:false,
                scheduled:false
            })
            .toArray();  // This is the fix!

        if (appointments && appointments.length > 0) {
            return NextResponse.json({ success: true, appointments }, { status: 200 });
        }
        return NextResponse.json({ success: false, message: "No appointments were found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}