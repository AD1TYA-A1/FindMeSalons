"use client"
import { useState } from 'react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
    const [userName, setUserName] = useState("")
    const handleChangeUserName = async (e) => {
        setUserName(e.target.value)

    }
    const [pass, setPass] = useState("")
    const handleChangepass = async (e) => {
        setPass(e.target.value)

    }
    const LogIn = async () => {
        if (!userName.trim()) {
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
            return
        }
        else if (!pass.trim()) {
            toast.error('Enter Pass', {
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

        const raw = JSON.stringify({
            "userName": userName,
            "pass": pass
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/salonModule/checkIfSalonExists", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    const userName = localStorage.getItem("userNameSALON")
                    if (!userName) {
                        localStorage.setItem("userNameSALON", userName)
                    }
                    else {
                        localStorage.setItem("userNameSALON", userName)
                    }
                    router.push("/salonDashboard")
                }
                else {
                    toast.error('Incorrect Credentials....', {
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900 p-5">
                <div className="bg-gray-300 rounded-2xl shadow-2xl p-10 max-w-lg w-full flex items-center justify-center flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
                            Log In to Your Salon
                        </h1>
                        <p className="text-gray-600 text-base mb-8 font-bold text-center">
                            Lorem ipsum dolor sit amet
                        </p>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-4 mb-6 flex items-center justify-center flex-col gap-7">

                        {/* Shop Input */}
                        <div className='flex items-center justify-center gap-2'>

                            {/* Shop Owner UserName Input */}
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

                                    placeholder="Enter shop owner name"
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
                                Enter Your Password <span className="text-red-500">*</span>
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
                        <button onClick={LogIn} className=" cursor-pointer mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 w-full">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
