import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

// Fetch User Location From DATABASE TO FIND NEARBY SALONS 
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('Salon');
        const body = await request.json();
        const userName = body.userName;
        const pNo = body.pNo;

        // Validate input
        if (!userName || !pNo) {
            return NextResponse.json(
                { success: false, error: "Username and phone number are required" },
                { status: 400 }
            );
        }

        const user = await db.collection("user").findOne({
            pNo: pNo,
            userName: userName
        });

        // Check if user exists
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        // Check if location data exists
        if (!user.location || !user.location.coordinates || user.location.coordinates.length < 2) {
            return NextResponse.json(
                { success: false, error: "User location data not found" },
                { status: 404 }
            );
        }

        console.log("Longitude:", user.location.coordinates[0]);
        console.log("Latitude:", user.location.coordinates[1]);

        return NextResponse.json(
            { 
                success: true, 
                longitude: user.location.coordinates[0], 
                latitude: user.location.coordinates[1] 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching user location:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}