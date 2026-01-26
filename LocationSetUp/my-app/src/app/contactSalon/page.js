"use client"

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function UserLogin() {
    const router = useRouter()

    const [SalonName, setSalonName] = useState("")
    useEffect(() => {
        const salon = localStorage.getItem("SalonName")
        if (!salon) {
            router.push("/")
        }
        setSalonName(salon)
    }, [])

    const [userName, setUserName] = useState("")
    const [pNo, setPNo] = useState("")
    const [message, setMessage] = useState("")
    const handleChangeUserName = (e) => {
        setUserName(e.target.value)
        console.log(userName);
    }
    const handleChangePnO = (e) => {
        setPNo(e.target.value)
        console.log(pNo);
    }
    const handleChangeMessage = (e) => {
        setMessage(e.target.value)
        console.log(message);
    }

    // console.log(SalonName);


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

        } else if (!validateIndianPhoneNumber(pNo)) {
            toast.error('Invalid Mobile Number', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        } else if (message.trim() == "") {
            toast.error('Enter Your Message', {
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
                "user": userName,
                "pNo": pNo,
                "message": message,
                "salon": SalonName
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("/api/contactSalon", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        toast.success('Sucess!!! We will reach you Shortly 🙌', {
                            position: "top-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })

                        setUserName("")
                        setMessage("")
                        setPNo("")
                        
                    }
                })
                .catch((error) => console.error(error));
        }



    }
    function validateIndianPhoneNumber(number) {
        // Regex: Starts with 6-9, followed by 9 digits (total 10)
        const regex = /^[6-9]\d{9}$/;
        // Remove spaces or hyphens if needed using .replace(/[\s-]/g, '')
        return regex.test(String(number));
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
                            Contact {SalonName}
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
                        {/* Message Field */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Your Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={5}
                                type="text"
                                id="message"
                                name="message"
                                value={message}
                                onChange={handleChangeMessage}
                                placeholder="Enter your Message"
                                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
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

