"use client"
import { useEffect, useState } from 'react'
import React from 'react'

const Page = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionState, setActionState] = useState({}) // tracks per-card: 'done' | 'rejected' | null

  useEffect(() => {
    const salon = localStorage.getItem("SalonName")

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "salonName": salon
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/api//salonModule/getAppointments", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          console.log(result.appointments);
          setAppointments(result.appointments)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

  }, [])

  const handleAction = (id, action) => {
    setActionState(prev => ({ ...prev, [id]: action }))
    
    // TODO: wire up your API call here, e.g.:
    // fetch("http://localhost:3000/api/salonModule/updateAppointment", { method: "POST", body: JSON.stringify({ id, status: action }) })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-lg">
              ✂️
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Salon Appointments</h1>
          </div>
          <p className="text-gray-500 text-sm ml-13 pl-[52px]">Manage and view all incoming appointments</p>
        </div>


        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <div className="w-8 h-8 border-2 border-gray-700 border-t-pink-500 rounded-full animate-spin mb-4"></div>
            <p className="text-sm">Loading appointments...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-900 border border-gray-800 rounded-2xl">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-400 font-medium">No appointments yet</p>
            <p className="text-gray-600 text-sm mt-1">New appointments will show up here</p>
          </div>
        )}

        {/* Appointments List */}
        {!loading && appointments.length > 0 && (
          <div className="flex flex-col gap-3">
            {appointments.map((item, index) => {
              const status = actionState[item._id] || null

              return (
                <div
                  key={item._id}
                  className={`group bg-gray-900 border rounded-2xl p-4 transition-all duration-200 ${
                    status === 'done'
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : status === 'rejected'
                      ? 'border-red-500/40 bg-red-500/5'
                      : 'border-gray-800 hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/5'
                  }`}
                >
                  {/* Top Row: User + Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-sm font-bold">
                        {item.user?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white">{item.user}</p>
                        <p className="text-xs text-gray-500">{item.shopName}</p>
                      </div>
                    </div>

                    {/* Status Badge — shown after action */}
                    {status && (
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          status === 'done'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-red-500/15 text-red-400'
                        }`}
                      >
                        {status === 'done' ? '✓ Done' : '✕ Rejected'}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <p className="text-gray-300 text-sm leading-relaxed bg-gray-800/50 rounded-xl px-3 py-2 mb-3">
                    💬 {item.message}
                  </p>

                  {/* Bottom Row: Phone + ID */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <span>📞</span>
                      <span className="font-mono">{item.pNo}</span>
                    </div>
                    <span className="text-gray-700 text-xs font-mono">#{index + 1}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                    <button
                      onClick={() => handleAction(item._id, 'done')}
                      disabled={status !== null}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-all duration-200 ${
                        status === 'done'
                          ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                          : status === 'rejected'
                          ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.96]'
                      }`}
                    >
                      <span>{status === 'done' ? '✓' : '✓'}</span>
                      Done
                    </button>

                    <button
                      onClick={() => handleAction(item._id, 'rejected')}
                      disabled={status !== null}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-all duration-200 ${
                        status === 'rejected'
                          ? 'bg-red-500/20 text-red-400 cursor-default'
                          : status === 'done'
                          ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
                          : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:shadow-md hover:shadow-red-500/10 active:scale-[0.96]'
                      }`}
                    >
                      <span>✕</span>
                      Reject
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page