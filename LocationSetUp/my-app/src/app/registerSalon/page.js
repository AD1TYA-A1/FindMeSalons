'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const LocationFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [location, setLocation] = useState(null);
    const [userName, setUserName] = useState("")
    const [shopName, setShopName] = useState("")
    const [pNo, setPNo] = useState("")
    const [pass, setPass] = useState("")
    const [otp, setOtp] = useState("")
    // Check user authentication on mount


    const handleChangeShopName = async (e) => {
        setShopName(e.target.value)
        console.log(shopName);
    }

    const handleChangeUserName = async (e) => {
        setUserName(e.target.value)
        console.log(userName);
    }

    const handleChangepNo = async (e) => {
        const value = e.target.value;
        if (value === undefined || value === null) return;

        // Only allow digits
        const numericValue = value.replace(/\D/g, '');
        setPNo(numericValue)
    }

    const handleChangepass = async (e) => {
        setPass(e.target.value)
        console.log(pass);
    }

    const handleChangeOtp = async (e) => {
        setOtp(e.target.value)
        console.log(pNo);
    }




    const getLocation = () => {
        // Validate form data before getting location

        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setLoading(false);
            },
            (err) => {
                setError('Unable to retrieve your location');
                setLoading(false);
            }
        );
    };

    const handleContinue = () => {
        if (!userName.trim() || !otp.trim() || !pass.trim() || !pNo.trim() || !shopName.trim()) {
            toast.error('Please Fill All the required Credentials!!!!', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(pNo);
        console.log(otp);


        const raw = JSON.stringify({
            "phoneNumber": "+91" + pNo,
            "otp": otp
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/verifyOTP", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success == true) {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        "userName": userName,
                        "password": pass,
                        "pNo": pNo,
                        "shopName": shopName
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch("/api/salonModule/addSalon", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {

                            // console.log(result.success);
                            // if (result.success) {
                            //     console.log("TRUE BABY");

                            // }
                            if (result.success) {
                                const myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");

                                const raw = JSON.stringify({
                                    "userName": userName,
                                    "pass": pass,
                                    "lat": location.latitude,
                                    "lng": location.longitude
                                });

                                const requestOptions = {
                                    method: "POST",
                                    headers: myHeaders,
                                    body: raw,
                                    redirect: "follow"
                                };

                                fetch("/api/salonModule/addSalonLocation", requestOptions)
                                    .then((response) => response.json())
                                    .then((result) => {
                                        if (result.success) {
                                            console.log("Router");
                                            localStorage.setItem("userNameSALON", userName)
                                            router.push("/salonDashboard")
                                        }
                                    })
                                    .catch((error) => console.error(error));
                            }
                        })
                        .catch((error) => console.error(error));
                }
                else {
                    toast.error('Invalid OTP', {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "dark",
                    });
                }
            })
            .catch((error) => console.error(error));
    };

    const sendOTP = async () => {
        if (!pNo.trim()) {
            toast.error('Enter a Mobile Number', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        } else if (pNo.length != 10) {
            toast.error('Enter a valid Mobile Number', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }


        //Checking If User ALready exists
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "pNo": pNo
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api//salonModule/checkIfSalonExistsPT2", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (!result.success) {
                    const indianUserpNo = "+91" + pNo
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        "phoneNumber": indianUserpNo
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch("/api/sendOTP", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            toast.info('OTP send SucessFullyy', {
                                position: "top-center",
                                autoClose: 10000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            })
                        })
                        .catch((error) => console.error(error));
                } else {
                    toast.error('User already Exists', {
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-5">
                <div className="bg-gray-300 rounded-2xl shadow-2xl p-10 max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
                        Salon Registration
                    </h1>
                    <p className="text-gray-600 text-base mb-8 font-bold text-center">
                        Make Sure You are in your Salon
                    </p>

                    {/* Form Inputs */}
                    <div className="space-y-4 mb-6">

                        {/* Shop Name Input */}
                        <div className='flex items-center justify-center gap-2'>
                            <div>
                                <label
                                    htmlFor="shopName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Shop Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="shopName"
                                    value={shopName}
                                    onChange={handleChangeShopName}
                                    name="shopName"
                                    placeholder="Enter shop name"
                                    required
                                    className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                            {/* Shop Owner Name Input */}
                            <div>
                                <label
                                    htmlFor="shopOwnerName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Create UserName <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="shopOwnerName"
                                    name="shopOwnerName"
                                    onChange={handleChangeUserName}
                                    value={userName}

                                    placeholder="Type a UserName"
                                    required
                                    className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                        </div>
                        {/* Create a PassWord */}
                        <div>
                            <label
                                htmlFor="shopOwnerName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Create a Strong Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="shopOwnerName"
                                name="shopOwnerName"
                                placeholder="Create a pass"
                                required
                                value={pass}
                                onChange={handleChangepass}

                                className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                onChange={handleChangepNo}
                                value={pNo}
                                maxLength="10"
                                minLength="10"
                                pattern="[6-9][0-9]{9}"
                                name="phone"
                                placeholder="Enter your phone number"
                                required
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        {/* Send OTP Button */}
                        <button
                            onClick={sendOTP}
                            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition mb-5">
                            📱 Send OTP
                        </button>
                    </div>

                    {/* OTP Input Field */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Enter OTP <span className="text-red-500">*</span>
                        </label>
                        <input
                            onChange={handleChangeOtp}
                            value={otp}
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            className="text-black w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                        />

                    </div>


                    <button
                        onClick={getLocation}
                        disabled={loading}
                        className="cursor-pointer w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        📍 {loading ? 'Getting Location...' : 'Get Location'}
                    </button>

                    {error && (
                        <div className="mt-5 p-4 bg-red-100 text-red-700 rounded-lg text-sm flex items-center justify-center gap-2">
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {location && (
                        <div className="mt-8 p-6 bg-green-50 border-2 border-green-300 rounded-xl">
                            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center justify-center gap-2">
                                <span>✓</span>
                                <span>Location Captured</span>
                            </h3>
                            <div className="space-y-2 mb-5">
                                <p className="text-green-700 font-mono text-sm">
                                    Latitude: {location.latitude.toFixed(6)}
                                </p>
                                <p className="text-green-700 font-mono text-sm">
                                    Longitude: {location.longitude.toFixed(6)}
                                </p>
                            </div>
                            <button
                                onClick={handleContinue}
                                className="cursor-pointer py-3 px-8 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 w-full"
                            >
                                This is my Salon's Location
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default LocationFetch;