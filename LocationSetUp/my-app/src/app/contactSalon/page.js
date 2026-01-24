"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()

    const [salonName, setSalonName] = useState("")
    useEffect(() => {
        if (!localStorage.getItem("SalonName")) {
            router.push("/")
        }else{
            console.log("Something");
            setSalonName(localStorage.getItem("SalonName"))
        }

    }, [])


    

    




    console.log(salonName);



    return (
        <div>
            Hey Contacting Salon
        </div>
    )
}

export default page
