'use client'
import React, { useEffect } from 'react'
import AccreditCourses from './AccreditCourses/AccreditCourses'
import Layout from '../AdminLayout/Layout'
import AccreditEvents from './AccreditEvents/AccreditEvents'

export default function Accreditation() {
  useEffect(() => {
    // Ensure the code only runs on the client side
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle');
    }
  }, []);

  return (
    <>
      <Layout title="Accreditation">
        <div>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Accredit Courses</button>
              <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Accredit Events</button>
            </div>
          </nav>

          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
              <AccreditCourses />
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>
              <AccreditEvents />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
