"use client"
import React, { use } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect,useState } from 'react'
const page = () => {
  const router = useRouter()
  const [user, setUser] = useState("")
  useEffect(() => {
    const userName = localStorage.getItem("userNameSALON")
    setUser(userName)
    if (!userName) {
      router.push("/salonLogIn")
    }
  }, [])

  return (
    <div>
      I am DASHBOARD OF SALON {user}
    </div>
  )
}

export default page
