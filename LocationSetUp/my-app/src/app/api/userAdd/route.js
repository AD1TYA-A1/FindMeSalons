import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const body = await request.json()
        console.log(body.lat);
        console.log(body.lng);
        const client = await clientPromise
        const db = client.db('Salon')
        const result = await db.collection('user').insertOne({
            name:body.name,            
            pNo: body.pNo,
            createdAt: new Date()
        });
        return NextResponse.json({ sucess: true, data: "User Data Send to DB" })
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }



}
