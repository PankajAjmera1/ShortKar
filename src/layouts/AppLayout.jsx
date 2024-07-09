import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function AppLayout() {
  return (
    <div>
      <main className='min-h-screen container'>
        {/* Header */}
        <Header/>
      <Outlet/>
      </main>
      {/* Footer */}
      <div className='bg-gray-800 text-white text-center py-4'>
        <p>&copy; 2024</p>
        Made with ❤ by Ajmera 
        </div>
    </div>
  )
}

export default AppLayout