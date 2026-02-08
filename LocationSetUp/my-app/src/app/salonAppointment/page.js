"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {
  const router = useRouter()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionState, setActionState] = useState({}) // tracks per-card: 'done' | 'rejected' | null
  const [openScheduleId, setOpenScheduleId] = useState(null)
  const [scheduleMessage, setScheduleMessage] = useState("")

  useEffect(() => {
    const salon = localStorage.getItem("SalonName")
    if (!salon) {
      router.push("/")
    }

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

    fetch("/api//salonModule/getAppointments", requestOptions)
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




  const scheduleMessageHandleChange = (e) => {
    setScheduleMessage(e.target.value)
    console.log(scheduleMessage);
  }

  const handleAction = (id, action) => {
    if (scheduleMessage.trim() == "" && action!="rejected") {
      toast.error('Schedule Before Done', {
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
    setActionState(prev => ({ ...prev, [id]: action }))

    const selectedAppointment = appointments.find(app => app._id === id)

    let complete, rejected = false
    if (action == "done") {
      complete = true
    } else if (action == "rejected") {
      rejected = true
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "user": selectedAppointment.user,
      "pNo": selectedAppointment.pNo,
      "message": selectedAppointment.message,
      "completed": complete,
      "rejected": rejected,
      "scheduledMessage":scheduleMessage
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("api/salonModule/updateAppointment", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.success);
        if (result.success) {
          window.location.reload()
        }
      })
      .catch((error) => console.error(error));
  }

  const handleSchedule = (appointment) => {
    // TODO: Implement your schedule logic here
    // You can navigate to a schedule page or open a modal
    console.log("Schedule appointment:", appointment)
    if (openScheduleId == appointment._id) {
      setOpenScheduleId(null)
      return
    }
    setOpenScheduleId(appointment._id)
    // Example: router.push(`/schedule/${appointment._id}`)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">✂️</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Salon Appointments
            </h1>
          </div>
          <p className="text-gray-400 ml-14">
            Manage and view all incoming appointments
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading appointments...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center">
              <span className="text-5xl mb-4 block">📋</span>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No appointments yet
              </h3>
              <p className="text-gray-500">
                New appointments will show up here
              </p>
            </div>
          </div>
        )}

        {/* Appointments List */}
        {!loading && appointments.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            
            {appointments.map((item, index) => {
              const status = actionState[item._id] || null
              return (
                <div
                  key={item._id}
                  className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600/50 transition-all duration-200"
                >
                  {/* Top Row: User + Status Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-emerald-500/20">
                        {item.user?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {item.user}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {item.shopName}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge — shown after action */}
                    {status && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'done'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                          }`}
                      >
                        {status === 'done' ? '✓ Done' : '✕ Rejected'}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="bg-gray-900/50 rounded-xl p-3 mb-4 border border-gray-700/30">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="mr-2">💬</span>
                      {item.message}
                    </p>
                  </div>

                  {/* Bottom Row: Phone + ID */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <span>📞</span>
                      {item.pNo}
                    </span>
                    <span className="text-gray-500">#{index + 1}</span>
                  </div>

                  {/*Schedules Message from the shop Owner*/}
                  {/* Replace the setSchedule check with: */}
                  {openScheduleId === item._id ? (
                    <div className="flex gap-2 mb-3">
                      <textarea
                        type="text"
                        placeholder="Enter schedule message..."
                        value={scheduleMessage}
                        onChange={scheduleMessageHandleChange}
                        className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ) : null}
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {openScheduleId !== item._id ? (
                      <button
                        onClick={() => handleSchedule(item)}
                        disabled={status !== null}
                        className={`flex-1 flex cursor-pointer items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-all duration-200 ${status !== null
                          ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
                          : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:shadow-md hover:shadow-blue-500/10 active:scale-[0.96]'
                          }`}
                      >
                        📅 Schedule
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSchedule(item)}
                        disabled={status !== null}
                        className={`flex-1 flex cursor-pointer items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-all duration-200 ${status !== null
                          ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
                          : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:shadow-md hover:shadow-blue-500/10 active:scale-[0.96]'
                          }`}
                      >
                        ❌Cancel
                      </button>
                    )}

                    <button
                      onClick={() => handleAction(item._id, 'done')}
                      disabled={status !== null}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-all duration-200 ${status === 'done'
                        ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                        : status === 'rejected'
                          ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.96]'
                        }`}
                    >
                      {status === 'done' ? '✓' : '✓'} Done
                    </button>

                    <button
                      onClick={() => handleAction(item._id, 'rejected')}
                      disabled={status !== null}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-all duration-200 ${status === 'rejected'
                        ? 'bg-red-500/20 text-red-400 cursor-default'
                        : status === 'done'
                          ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
                          : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:shadow-md hover:shadow-red-500/10 active:scale-[0.96]'
                        }`}
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>

  )
}

export default Page