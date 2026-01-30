"use client"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useState } from 'react';
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter()
    const [salonsNearby, setSalonsNearby] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(true) // Add loading state

    useEffect(() => {
        // Get from localStorage
        const userData = localStorage.getItem("userData");
        const parsedUserData = JSON.parse(userData);
        console.log(parsedUserData);


        if (parsedUserData == null) {
            router.push("/");
            return;  // Just return, don't return null
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userName": parsedUserData.userName,
            "pNo": parsedUserData.phoneNumber
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("api/fetchUserLocation", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success == true) {
                    setUserLocation({
                        lat: result.latitude,
                        lng: result.longitude
                    });

                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        "longitude": result.longitude,
                        "latitude": result.latitude
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch("/api/nearbySalons", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            setSalonsNearby(result.salons)
                            console.log(result.salons)
                            setIsLoading(false) // Set loading to false after data is fetched
                        })
                        .catch((error) => console.error(error));
                }
            })
            .catch((error) => console.error(error));
        console.log(salonsNearby);

    }, [router]);

    // Add early return in the render function
    if (isLoading) {
        return <div>Loading...</div>
    }

    const mapStyles = {
        height: "300px",
        width: "30%"
    }

    return (
        <div className=' flex items-center justify-center flex-col'>
            <h1 className="text-4xl font-bold text-center text-white mb-8 mt-6">
                Hey here are your nearby Salons
            </h1>
            {/* Map View */}
            {userLocation && (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={10}
                        center={userLocation}
                    >
                        {/* User Location Marker */}
                        <Marker
                            position={userLocation}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            }}
                        />

                        {/* Salon Markers */}
                        {salonsNearby.map((salon, index) => (
                            <Marker
                                key={salon._id || index}
                                position={{
                                    lat: salon.location.coordinates[1],
                                    lng: salon.location.coordinates[0]
                                }}
                                title={salon.name}
                                label={(index + 1).toString()}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            )}
            <div>
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">
                        Contact
                    </h1>

                    <div className="space-y-6 max-w-2xl mx-auto px-4">
                        {salonsNearby.map((salon) => (
                            <div
                                key={salon._id}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                            >
                                {/* Salon Name */}
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {salon.name}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center gap-2 mb-4 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm">
                                        {salon.location?.address || 'Location not available'}
                                    </span>
                                </div>

                                {/* Contact Info */}
                                <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-4 py-3 mb-4">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-sm text-gray-400">Contact:</span>
                                    <span className="text-sm text-white font-semibold">
                                        {salon.contact || 'Not provided'}
                                    </span>
                                </div>

                                {/* Book Button */}
                                <Link href={"/contactSalon"} onClick={() => {
                                }}>
                                    <button onClick={() => {
                                        localStorage.setItem("SalonName",
                                            JSON.stringify(salon.name)
                                        )
                                    }} className=" cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
                                        Book a Seat
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page