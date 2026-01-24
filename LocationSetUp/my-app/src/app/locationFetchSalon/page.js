"use client"
import React from 'react'
import { useState } from 'react'

const Page = () => {

    const [salonName, setSalonName] = useState('')
    const [salonLongitude, setSalonLongitude] = useState('')
    const [salonLatitude, setSalonLatitude] = useState('')


    const salonNameChange = (e) => {
        setSalonName(e.target.value)
    }
    const salonLongitudeChange = (e) => {
        setSalonLongitude(e.target.value)
    }
    const salonLatitudeChange = (e) => {
        setSalonLatitude(e.target.value)
    }



    const handleSubmit = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": salonName,
            "longitude": parseFloat(salonLongitude),
            "latitude": parseFloat(salonLatitude)
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/salonAdd", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    return (
        <div className='flex items-center justify-center flex-col gap-10 mt-12'>

            <input className='border-2 border-purple-500 outline-none pl-3' placeholder="Salon Name" onChange={salonNameChange} value={salonName} />
            <input className='border-2 border-purple-500 outline-none pl-3' placeholder="Longitude" onChange={salonLongitudeChange} value={salonLongitude} />
            <input className='border-2 border-purple-500 outline-none pl-3' placeholder="Latitude" onChange={salonLatitudeChange} value={salonLatitude} />
            <div className='mt-6 w-full max-w-md mx-auto'>
                <div
                    onClick={handleSubmit}
                    className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer text-center'
                >
                    Submit
                </div>
            </div>
        </div>
    )
}

export default Page