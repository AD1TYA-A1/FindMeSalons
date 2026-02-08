"use client"
import React from 'react'
import { useEffect, useState } from 'react'

const page = () => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"))

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "pNo": user.pNo
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/getUserAppointments", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                console.log(result.appointments)
                setAppointments(result.appointments)
            })
            .catch((error) => console.error(error));
    }, [])

    // Filter appointments by status
    const rejectedAppointments = appointments.filter(app => app.rejected === true)
    const scheduledAppointments = appointments.filter(app => app.scheduled === true && !app.rejected && !app.completed)
    const completedAppointments = appointments.filter(app => app.completed === true)
    const pendingAppointments = appointments.filter(app => !app.scheduled && !app.rejected && !app.completed)

    const renderAppointmentCard = (item, statusColor, statusText, statusBgColor) => (
        <div key={item._id} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4 border-l-4 hover:bg-gray-750 transition-colors" style={{ borderLeftColor: statusColor }}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-emerald-500/20">
                        {item.user?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-lg">
                            {item.user}
                        </h3>
                        <p className="text-sm text-gray-400">{item.shopName}</p>
                    </div>
                </div>
                <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: statusBgColor, color: statusColor }}
                >
                    {statusText}
                </span>
            </div>

            {/* Message Display */}
            {item.message && (
                <div className="mt-3 p-3 bg-gray-700 rounded-md border-l-2" style={{ borderLeftColor: statusColor }}>
                    <p className="text-sm text-gray-300">
                        <span className="font-semibold text-gray-200">Message:</span> {item.message}
                    </p>
                </div>
            )}

            {/* Scheduled Message */}
            {item.scheduled && item.scheduledMessage && (
                <div className="mt-3 p-3 bg-blue-900/20 rounded-md border-l-2 border-blue-400">
                    <p className="text-sm text-blue-200">
                        <span className="font-semibold">Scheduled:</span> {item.scheduledMessage}
                    </p>
                </div>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Your Appointments</h1>

                {/* Scheduled Appointments */}
                {scheduledAppointments.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Scheduled Appointments
                        </h2>
                        {scheduledAppointments.map(item =>
                            renderAppointmentCard(item, '#3b82f6', 'Scheduled', '#1e3a8a20')
                        )}
                    </div>
                )}

                {/* Pending Appointments */}
                {pendingAppointments.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            Pending Appointments
                        </h2>
                        {pendingAppointments.map(item =>
                            renderAppointmentCard(item, '#eab308', 'Pending', '#78350f20')
                        )}
                    </div>
                )}

                {/* Completed Appointments */}
                {completedAppointments.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Completed Appointments
                        </h2>
                        {completedAppointments.map(item =>
                            renderAppointmentCard(item, '#22c55e', 'Completed', '#14532d20')
                        )}
                    </div>
                )}

                {/* Rejected Appointments */}
                {rejectedAppointments.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Rejected Appointments
                        </h2>
                        {rejectedAppointments.map(item =>
                            renderAppointmentCard(item, '#ef4444', 'Rejected', '#7f1d1d20')
                        )}
                    </div>
                )}

                {/* No Appointments */}
                {appointments.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No appointments found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page