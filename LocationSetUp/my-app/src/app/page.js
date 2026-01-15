import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome
        </h1>
        <p className="text-gray-600 mb-8">Choose your role to continue</p>
        
        <div className="flex gap-6">
          <Link href="/locationFetchSalon">
            <div className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 w-64 hover:-translate-y-2">
              <div className="text-5xl mb-4">💼</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                Shop
              </h2>
              <p className="text-gray-600">Access salon dashboard</p>
            </div>
          </Link>

          <Link href="/locationFetchUser">
            <div className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 w-64 hover:-translate-y-2">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                User
              </h2>
              <p className="text-gray-600">Browse services</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}