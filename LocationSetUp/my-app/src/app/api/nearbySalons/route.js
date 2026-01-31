import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("Salon");

    const body = await request.json();
    const { longitude, latitude } = body;

    if (!longitude || !latitude) {
      return NextResponse.json(
        { error: "Longitude and latitude required" },
        { status: 400 }
      );
    }



    const salons = await db.collection("salon").aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          distanceField: "distance",
          maxDistance: 5000, // 5 km in meters
          spherical: true
        }
      }
    ]).toArray(); console.log(salons);

    return NextResponse.json({ success: true, salons });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
