import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)


  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    const fetchUsers = async () =>{
      setLoading(true);
      try {
        
        const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`);
          console.log(`Fetched page ${page}`, response.data.results);
        setUsers((prevUsers) => [...prevUsers, ...response.data.results]);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4">
      <div className="container mx-auto">
        <header className="text-center py-6 mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Random User Generator</h1>
          <p className="text-gray-600">Discover random user profiles from around the world</p>
        </header>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {users.map((user, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-4 text-center">
                <img 
                  src={user.picture.large} 
                  alt={`${user.name.first} ${user.name.last}`} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100" 
                />
                <h2 className="text-lg font-bold text-gray-800">{`${user.name.first} ${user.name.last}`}</h2>
                <p className="text-sm text-blue-600 mb-2">{user.email}</p>
                <p className="text-xs text-gray-500">
                  <span className="block">{user.location.city}, {user.location.country}</span>
                  <span className="block mt-1">{user.phone}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center pb-8">
          <button 
            onClick={handleLoadMore} 
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow transition-all hover:bg-blue-700 disabled:opacity-70 flex items-center space-x-2"
          >
            {loading && (
             <LoaderCircle className="rotate-360 animate-spin w-5 h-5" />
            )}
            {loading ? ' Loading more users...' : ' Load More Users'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App