"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const page = () => {
  const router = useRouter()
  useEffect(() => {
    const userName = localStorage.getItem("userNameSALON")
    console.log(userName);
    if (!userName) {
      router.push("/salonLogIn")
    }
  }, [])

  return (
    <div>
      I am DASHBOARD OF SALON
    </div>
  )
}

export default page
