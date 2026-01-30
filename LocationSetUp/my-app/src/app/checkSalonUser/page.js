import React from 'react'
import Link from 'next/link'
const Page = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Checking User
                </h1>

                {/* Cards Container */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* New User Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Register Shop
                            </h2>
                            <p className="text-gray-600">
                                Register your Shop to get Started
                            </p>
                            <Link href="/registerSalon">
                                <button className=" cursor-pointer mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 w-full">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Already A User Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Already A User
                            </h2>
                            <p className="text-gray-600">
                                Sign in to access your account
                            </p>
                            <Link href="/logInSalon">
                                <button className=" cursor-pointer mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 w-full">
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page