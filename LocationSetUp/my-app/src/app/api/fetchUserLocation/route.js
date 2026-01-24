import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('Salon');
        const body = await request.json();
        const userName = body.userName
        const pNo = body.pNo

        const user = await db.collection("user").findOne({
            pNo: pNo,
            name: userName
        })
        if (user) {
            console.log("Longitude:", user.location.coordinates[0]);
            console.log("Latitude:", user.location.coordinates[1]);

        }
        return NextResponse.json({ success: true, longitude: user.location.coordinates[0], latitude: user.location.coordinates[1] },
            { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}