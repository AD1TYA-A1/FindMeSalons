"use client"
import React from 'react'
import { useEffect } from 'react'
const page = () => {
    useEffect(() => {
        
        

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user": "Admin HUN",
            "pNo": "8449697670"
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/getUserAppointments", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

    }, [])

    return (
        <>
            Here are your Appointments
        </>
    )
}

export default page
