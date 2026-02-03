import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";


//POST -> Gives Message to Salons Owner 
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("Salon")
        const body = await request.json()

        const contact = await db.collection("contactShop").insertOne({
            user: body.user,
            pNo: body.pNo,
            message: body.message,
            shopName: body.salon,
            completed: false,   // This will become TRUE when we have like appointment completed else FALSE
            rejected: false    // This is for like if Salon Owner wanted to remove the or not attend  
        });
        if (contact) {
            return NextResponse.json({ success: true }, { status: 201 });
        }
        return NextResponse.json({ success: false }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}