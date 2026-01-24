import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="text-center max-w-6xl w-full">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-3 tracking-tight">
            Welcome
          </h1>
          <p className="text-base sm:text-lg text-gray-600">Choose your role to continue</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
          <Link href="/locationFetchSalon" className="block">
            <div className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 sm:p-10 hover:-translate-y-2 hover:scale-105 border border-transparent hover:border-indigo-200">
              <div className="text-6xl sm:text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                💼
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                Shop Owner
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Access your salon dashboard and manage your business
              </p>
              <div className="mt-6 inline-flex items-center text-indigo-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                Get Started 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/checkUser" className="block">
            <div className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 sm:p-10 hover:-translate-y-2 hover:scale-105 border border-transparent hover:border-purple-200">
              <div className="text-6xl sm:text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                👤
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                Customer
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Browse services and book your next appointment
              </p>
              <div className="mt-6 inline-flex items-center text-purple-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                Get Started 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}