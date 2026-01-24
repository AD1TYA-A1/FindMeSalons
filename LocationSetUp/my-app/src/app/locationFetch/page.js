'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const LocationFetch = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [user, setUser] = useState(null)
  // Check user authentication on mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(userData);
    setUser(parsedUserData)
    if (!userData) {
      router.push("/");
    }
  }, [router]);
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
  
  const handleContinue = () => {
    // Navigate to nearby salons or save location
    // console.log('Location:', location.latitude);
    localStorage.setItem('userLocation', JSON.stringify(location));
    // console.log(location);
    // console.log(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "userName": user.userName,
      "pNo": user.phoneNumber,
      "lat": location.latitude,
      "lng": location.longitude
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/addUserLocation", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    router.push('/nearbySalon');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-5">
      <div className="bg-gray-300 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Find Nearby Salons
        </h1>
        <p className="text-gray-600 text-base mb-8">
          Share your location to discover salons near you
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
              onClick={handleContinue}
              className=" cursor-pointer py-3 px-8 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Continue to Salons
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationFetch;