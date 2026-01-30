"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const page = () => {
  const router = useRouter()
  const [user, setUser] = useState("")
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateLocation, setUpdateLocation] = useState(false)

  useEffect(() => {
    const userName = localStorage.getItem("userNameSALON")
    setUser(userName)
    if (!userName) {
      router.push("/salonLogIn")
    }
  }, [])
  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );

  };

  return (
    <div className='min-h-screen flex items-center justify-center flex-col bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-4 py-8 text-white'>
      <div>
      I am DASHBOARD OF SALON..... {user}
    </div>

      <div>
        {updateLocation ? (
          <div className="bg-gray-400 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Update Salon Location
            </h1>
            <p className="text-gray-600 text-base mb-8">
              Make Sure you are in your Salon
            </p>

            <button
              onClick={getLocation}
              disabled={loading}
              className=" cursor-pointer w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              📍 {loading ? 'Getting Location...' : 'Get Location'}
            </button>

            {error && (
              <div className="mt-5 p-4 bg-red-100 text-red-700 rounded-lg text-sm flex items-center justify-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {location && (
              <div className="mt-8 p-6 bg-green-50 border-2 border-green-300 rounded-xl">
                <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center justify-center gap-2">
                  <span>✓</span>
                  <span>Location Captured</span>
                </h3>
                <div className="space-y-2 mb-5">
                  <p className="text-green-700 font-mono text-sm">
                    Latitude: {location.latitude.toFixed(6)}
                  </p>
                  <p className="text-green-700 font-mono text-sm">
                    Longitude: {location.longitude.toFixed(6)}
                  </p>
                </div>
                <button
                  className=" cursor-pointer py-3 px-8 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Continue to Salons
                </button>
                <button className="w-full px-6 py-3 text-red-500 font-semibold text-lg border border-gray-200 rounded-xl hover:bg-red-50 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <div onClick={() => {
            setUpdateLocation(true)
          }} className=' cursor-pointer'>Update Salon Location</div>
        )}
      </div>

    </div>

  )
}

export default page
