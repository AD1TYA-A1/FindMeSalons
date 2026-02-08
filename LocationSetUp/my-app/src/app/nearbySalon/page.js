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
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get from localStorage
                const userData = localStorage.getItem("userData");

                if (!userData) {
                    console.log("No user data found, redirecting to login");
                    router.push("/");
                    return;
                }

                const parsedUserData = JSON.parse(userData);
                // console.log("Parsed user data:", parsedUserData);

                if (!parsedUserData || !parsedUserData.userName) {
                    // console.log("Invalid user data, redirecting to login");
                    router.push("/userLogIn");
                    return;
                }

                // Fetch user location
                const locationResponse = await fetch("/api/fetchUserLocation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "userName": parsedUserData.userName,
                        "pNo": parsedUserData.pNo
                    })
                });

                const locationResult = await locationResponse.json();
                // console.log("Location result:", locationResult);

                if (!locationResult.success) {
                    throw new Error(locationResult.error || "Failed to fetch user location");
                }

                setUserLocation({
                    lat: locationResult.latitude,
                    lng: locationResult.longitude
                });

                // Fetch nearby salons
                const salonsResponse = await fetch("/api/nearbySalons", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "longitude": locationResult.longitude,
                        "latitude": locationResult.latitude
                    })
                });

                const salonsResult = await salonsResponse.json();
                // console.log("Salons result:", salonsResult);

                if (salonsResult.salons) {
                    setSalonsNearby(salonsResult.salons);
                } else {
                    setSalonsNearby([]);
                }

                setIsLoading(false);

            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [router]);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-gray-700">Loading nearby salons...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
                <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const mapStyles = {
        height: "300px",
        width: "30%"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Hey, here are your nearby Salons
            </h1>
            <Link href={"/myAppointments"}>
                <div className='border-2 border-gray-800 rounded-lg px-6 py-3 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200 text-gray-900 font-medium text-lg shadow-sm mb-10 text-center'>
                    Check Appointment Status
                </div>
            </Link>
            {/* Map View */}
            {userLocation && (
                <div className="mb-8 flex justify-center">
                    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                        <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
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
                                    key={index}
                                    position={{
                                        lat: salon.location?.coordinates[1],
                                        lng: salon.location?.coordinates[0]
                                    }}
                                    icon={{
                                        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                                    }}
                                />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
            )}

            {/* Salons List */}
            <div className="max-w-4xl mx-auto space-y-6">
                {salonsNearby.length === 0 ? (
                    <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-xl text-gray-600">No salons found nearby</p>
                    </div>
                ) : (
                    salonsNearby.map((salon, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
                        >
                            {/* Salon Name */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                {salon.shopName || 'Salon Name Not Available'}
                            </h2>

                            {/* Location */}
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">📍 Location: </span>
                                {salon.location?.coordinates
                                    ? `${salon.location.coordinates[1]}, ${salon.location.coordinates[0]}`
                                    : 'Location not available'}
                            </p>

                            {/* Contact Info */}
                            <p className="text-gray-600 mb-4">
                                <span className="font-semibold">📞 Contact: </span>
                                {salon.pNo || 'Not provided'}
                            </p>

                            {/* Book Button */}
                            <Link
                                href="/contactSalon"
                                onClick={() => {
                                    console.log(salon);

                                    localStorage.setItem("SalonName", salon.shopName || "");
                                    localStorage.setItem("SalonUserName", salon.userName);
                                }}
                                className="inline-block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                            >
                                Book a Seat
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Page;