import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const client = await clientPromise
        const body = await request.json()
        const db = client.db('Salon')
        const result = await db.collection('salon').insertOne({
            userName: body.userName,
            pNo: body.pNo,
            shopName: body.shopName,
            passWord: body.password,
        })
        return NextResponse.json({ sucess: true, data: "Shop Added to DB" })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}