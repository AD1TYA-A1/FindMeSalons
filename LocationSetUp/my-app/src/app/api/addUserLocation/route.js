import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";


// POST Req To add respective user Location
// Takes User Pno and userName and then finds:
// then adds location 

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('Salon');
        const body = await request.json();
        const userName = body.userName
        // console.log(pNo);

        const user = await db.collection("user").findOne({
            userName: userName
        });

        if (user) {
            const location = await db.collection("user").updateOne(
                { userName: userName },
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
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}