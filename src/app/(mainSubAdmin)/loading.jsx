import React from 'react'
import '../(admin)/dashboard/loading.css'
export default function Loading() {
  return (
    <div className='loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3'>
      <span className="loader"></span>
    </div>
  )
}
