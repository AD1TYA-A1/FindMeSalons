"use client"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useState } from 'react';
import React from 'react'

const Page = () => {

    const [salonsNearby, setSalonsNearby] = useState([])
    const [userLocation, setUserLocation] = useState(null)

    useEffect(() => {
        // Get from localStorage
        const saved = localStorage.getItem('userLocation');
        if (saved) {
            const location = JSON.parse(saved);
            console.log(location);
            setUserLocation(location) // Set as object, not string
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "longitude": JSON.parse(saved).lng,
            "latitude": JSON.parse(saved).lat
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/nearbySalons", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setSalonsNearby(result.salons)
                console.log(result.salons)
            })
            .catch((error) => console.error(error));
    }, []);

    const mapStyles = {
        height: "300px",
        width: "40%"
    }

    return (
        <div>
            <h1>Hey here are your nearby Salons</h1>

            {/* Map View */}
            {userLocation && (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={15}
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
                                label={(index + 1).toString()} // Add numbered labels        
                            />

                        )
                        )}
                    </GoogleMap>
                </LoadScript>
            )}

            {/* List View */}
            <div style={{ marginTop: '20px' }}>
                {salonsNearby.map((salon, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                        <h3>{salon.name}</h3>
                        <p>Lat: {salon.location.coordinates[1]}, Lng: {salon.location.coordinates[0]}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Page
