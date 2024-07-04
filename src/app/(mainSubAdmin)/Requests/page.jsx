'use client'
import React, { useEffect } from 'react'
import '../../(admin)/dashboard/dashboard.css'
// import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import CustomCoursesRequest from './CustomCoursesRequest/CustomCoursesRequest'
import Layout from '../MainSumAdminLayout/Layout'
import JoinCoursesRequests from './JoinCoursesRequests/JoinCoursesRequests'
export default function Requests() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);
  return (
    <Layout title = "Requests">
      {/* <CustomCoursesRequest/> */}
      <div>
  <nav>
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
      <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Requests to join courses</button>
      <button className="nav-link" id="nav-custom-tab" data-bs-toggle="tab" data-bs-target="#nav-custom" type="button" role="tab" aria-controls="nav-custom" aria-selected="true">Custom Courses</button>
    </div>
  </nav>


  <div className="tab-content" id="nav-tabContent">
    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
      <JoinCoursesRequests/>
    </div>

    <div className="tab-pane fade" id="nav-custom" role="tabpanel" aria-labelledby="nav-custom-tab" tabIndex={0}>
    <CustomCoursesRequest/>
    </div>

  </div>
</div>
    </Layout>
    
  )
}
