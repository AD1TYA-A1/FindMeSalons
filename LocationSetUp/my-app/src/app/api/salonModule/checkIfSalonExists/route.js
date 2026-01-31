import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";


// POST -> Check If user Exists
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('Salon');
        const body = await request.json();
        const userName = body.userName
        const pass = body.pass

        const user = await db.collection("salon").findOne({
            userName: userName,
            passWord: pass
        });
        if (user) {
            return NextResponse.json({ success: true , user }, { status: 201 });
        }
        return NextResponse.json({ success: false }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
// DUMMY DATA TO CHECK API
// userName
// "Admin_shop"
// pNo
// "8449697670"
// shopName
// "Admin Shop"
// passWord
// "Admin@123***"