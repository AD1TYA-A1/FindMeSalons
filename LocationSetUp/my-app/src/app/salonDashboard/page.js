"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Page = () => {
  const [salonName, setSalonName] = useState("")
  const router = useRouter()
  useEffect(() => {
    // Only access localStorage on client side
    const name = localStorage.getItem("SalonName")
    if (name) {
      setSalonName(name)
    }
    if (!name) {
      router.push("/")
    }
  }, []) // Remove salonName from dependency array to prevent infinite loop


  return (
    <div className="bg-[url('/dashboardBG.jpg')] min-h-screen w-full bg-cover bg-center text-white flex items-center flex-col p-4 sm:p-6 lg:p-8">
      {/* Salon Name Header */}
      <div className="w-full max-w-7xl">
        <div className=" rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-right lg:text-center">
            {salonName || "Loading..."}
          </h1>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl flex-1 flex items-center justify-center">
        <div className="border-2 border-white/30 rounded-lg p-6 sm:p-8 lg:p-12 w-full max-w-4xl">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {/* Appointment Card 1 */}
            <Link href={"/salonAppointment"}>
              <div className="border-2 border-white/30 rounded-full h-16 sm:h-20 lg:h-24 w-full hover:bg-white/10 transition-colors duration-200">
                <div className="h-full flex items-center justify-center px-6 cursor-pointer">
                  <span className="text-base sm:text-lg lg:text-xl">Appointments</span>
                </div>
              </div>
            </Link>

            {/* Appointment Card 2 */}
            <div className="border-2 border-white/30 rounded-full h-16 sm:h-20 lg:h-24 w-full hover:bg-white/10 transition-colors duration-200">
              <div className="h-full flex items-center justify-center px-6 cursor-pointer">
                <span className="text-base sm:text-lg lg:text-xl">Configure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page