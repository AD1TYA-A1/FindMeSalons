import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('Salon')
        const body = await request.json()
        const userName = body.userName
        console.log(userName);
        
        console.log(body);
        
        const pass = body.pass
        console.log(pass);
        
        const user = await db.collection('salon').findOne({
            userName: userName,
            passWord: pass
        })
        if (user) {
            const location = await db.collection("salon").updateOne(
                {
                    userName: userName,
                    passWord: pass
                },
                {
                    $set: {
                        location: {
                            type: "Point",
                            coordinates: [body.lng, body.lat]
                        }
                    }
                }
            );
            if (location) {
                return NextResponse.json({ success: true }, { status: 201 });
            }
        }
        return NextResponse.json({ success: false }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}