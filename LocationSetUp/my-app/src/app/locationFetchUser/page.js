'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function GetLocation() {
    const [userLocation, setUserLocation] = useState(null);
    const router = useRouter()
    const [userName, setUserName] = useState("")
    const [userpNo, setUserpNo] = useState("")

    const nameHandleChange = (e) => {
        setUserName(e.target.value)
    }
    const pNoHandleChange = (e) => {
        setUserpNo(e.target.value)
    }
    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Location not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setUserLocation({
                    lat: lat,
                    lng: lng
                });

                console.log("Latitude:", lat);
                console.log("Longitude:", lng);
            },
            (error) => {
                console.log(error);
                alert("Location permission denied");
            }
        );
    };



    const submitLocation = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": userName,
            "pNo": userpNo,
            "lat": userLocation.lat,
            "lng": userLocation.lng
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch("http://localhost:3000/api/checkIfUserExist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success == false) {
                    fetch("http://localhost:3000/api/userAdd", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(result);
                            toast.info('Finding 💨💨', {
                                position: "top-center",
                                autoClose: 10000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                            setTimeout(() => {
                                // Save to localStorage
                                localStorage.setItem('userLocation', JSON.stringify(userLocation));
                                router.push("/nearbySalon")
                            }, 3000);
                        })
                        .catch((error) => console.error(error));
                }
                else {
                    toast.info('User Already Exists Try Logging In', {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })           
                }
            })
            .catch((error) => console.error(error));

    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome User</h1>
                    <p className="text-gray-600 mb-8 text-center">Share your location to find nearby salons</p>

                    {userLocation && (
                        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                            <p className="text-green-700 font-semibold">✓ Location Retrieved</p>
                            <p className="text-sm text-gray-600">Lat: {userLocation.lat}, Lng: {userLocation.lng}</p>
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name
                        </label>
                        <input
                            value={userName}
                            onChange={nameHandleChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your Name"
                            className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            value={userpNo}
                            onChange={pNoHandleChange}
                            type="tel"
                            id="phone"
                            maxLength="10"
                            pattern="[6-9][0-9]{9}"

                            name="phone"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={getLocation}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                        >
                            📍 Get My Location
                        </button>

                        <button
                            onClick={submitLocation}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg border-2 border-amber-600"
                        >
                            ✉️ Find Salons Near me
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
