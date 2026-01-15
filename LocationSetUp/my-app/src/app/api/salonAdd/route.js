import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';



// POST - Create new salon
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('Salon');
        const body = await request.json();

        const result = await db.collection('salons').insertOne({
            name: body.name,
            location: {
                type: "Point",
                coordinates: [body.longitude, body.latitude] // [lng, lat]
            },
            createdAt: new Date()
        });

        return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}