"use client"

import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';


export default function UserLogin() {
    useEffect(() => {
        localStorage.clear()
      
    
    }, [])
    
    const router = useRouter()
    const [userName, setUserName] = useState("")
    const [pNo, setPNo] = useState("")
    const [otp, setOTP] = useState("")
    const handleChangeUserName = (e) => {
        setUserName(e.target.value)
        console.log(userName);


    }
    const handleChangePnO = (e) => {
        setPNo(e.target.value)
        console.log(pNo);
    }

    const handleChangeOTP = (e) => {
        setOTP(e.target.value)
        console.log(otp);

    }
    const sendOTP = () => {
        if (userName.trim() == "") {
            toast.error('Enter UserName', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else if (pNo.trim() == "") {
            toast.error('Enter Your Mobile Number', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else if (/[a-zA-Z]/.test(pNo)) {
            console.log("Phone number should not contain letters");
            toast.error('Phone number should not contain letters', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else if (!/^\d+$/.test(pNo)) {
            console.log("Phone number should only contain digits");
            toast.error('Phone number should only contain digits', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "pNo": pNo,
                "userName": userName
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("/api/checkIfUserExist", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success == true) {

                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        const raw = JSON.stringify({
                            "phoneNumber": "+91" + pNo
                        });

                        const requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            body: raw,
                            redirect: "follow"
                        };

                        fetch("/api/sendOTP", requestOptions)
                            .then((response) => response.json())
                            .then((result) => {

                                console.log(result)
                                if (result.success == true) {
                                    toast.success('OTP Sent!!', {
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


                    } else {
                        toast.error('Invalid Credentials!!', {
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
    }
    const handleSubmit = () => {
        if (userName.trim() == "") {
            toast.error('Enter UserName', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else if (pNo.trim() == "") {
            toast.error('Enter Your Mobile Number', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else if (otp.trim() == "") {
            toast.error('Enter OTP', {
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
        if (otp.length !== 6) {
            toast.error('Invalid OTP', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

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
                        localStorage.setItem('userData', JSON.stringify({
                            phoneNumber: pNo,
                            userName: userName
                        }));
                        router.push("/locationFetch",)
                    }
                })
                .catch((error) => console.error(error));
        }

        // Add your login logic here
        // router.push('/dashboard') // Navigate after successful login
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
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5">
                <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Please enter your details to continue
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="userName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                User Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={userName}
                                onChange={handleChangeUserName}
                                placeholder="Enter your username"
                                required
                                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={pNo}
                                onChange={handleChangePnO}
                                placeholder="Enter your phone number"
                                pattern="[0-9]{10}"
                                maxLength="10"
                                required
                                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        {/* Send OTP Button */}
                        <button
                            onClick={sendOTP}
                            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition mb-5">
                            📱 Send OTP
                        </button>

                        {/* OTP Input Field */}
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                                Enter OTP <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                maxLength="6"
                                className="text-black w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                                value={otp}
                                onChange={handleChangeOTP}
                            />
                        </div>


                        {/* Continue Button */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className=" cursor-pointer w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 mt-4"
                        >
                            <span>Continue</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

