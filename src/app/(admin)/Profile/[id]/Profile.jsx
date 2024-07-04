'use client'
import Layout from '@/app/(admin)/AdminLayout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faPen } from '@fortawesome/free-solid-svg-icons'
import './Profile.css'
import { useParams } from 'next/navigation';

export default function Profile({params}) {
    let [user,setUser] = useState({})
    const [loading, setLoading] = useState(false);
    

    console.log('id:', id);
    console.log(id)
    const getUser =async ()=>{
      try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetEmployeeById?id=${params.id}`,{headers: {
          'Content-Type': 'multipart/form-data','Content-Type': 'application/json',
        }}
        );
        if(data.isSuccess){
        setUser(data);
        setLoading(false)
        }}
        catch (error) {
        console.log(error)
        }
        
    }
    console.log(user)
    useEffect(()=>{
        getUser();
    },[])

    if(loading){
      return <h1>Loading....</h1>
    }
  return (
    <Layout title = 'Profile'>
        <div className="container pt-5">
      <div className="row">
        <div className="col-xl-4 text-center">
          <h1 className='pr'>PROFILE</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 text-center justify-content-center">
          <img src='/profile.png' className='profile img-fluid'/>
        </div>
        <div className="col-xl-8">
          <div className="row">
            <div className="col-xl-4 col-lg-12 pt-lg-3 pt-md-3 pt-sm-3 pt-3">
              <p className='text-uppercase fw-bold  text-xl-end text-lg-center text-md-center text-sm-center text-center'><span className='name'>{user.name}</span></p>
            
            </div>
             <div className="d-flex ps-xl-4 pt-3 gap-2 role justify-content-xl-start fs-5 fw-bold justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                <FontAwesomeIcon icon={faUser} className='pt-1'/>
                <p className='text-uppercase'>{user.type}</p>
              </div>
          </div>
          <div className="row ps-1 pt-3">
            <div className="col-xl-6 ps-4">
              <div className="row info1 border-">
                <div className="col-xl-10 ">
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                    <p className='fw-bold labels'>Gender:</p>
                    <p className=' info ps-4'>Fe-Male</p>
                  </div>
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center"><p className='fw-bold labels'>Phone:</p><p className=' info ps-4'>(+970)59-392-5818</p></div>
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center"><p className='fw-bold labels'>Date of birth:</p><p className=' info ps-4'>18/10/2002</p></div>
                 
                </div>
                
              </div>

            </div>
            <div className="col-xl-6">
            <div className="row info2">
              <div className="col-xl-10">
              <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                    <p className='fw-bold labels'>Email:</p>
                    <p className=' info ps-4'>{user.email}</p>
                  </div>
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                    <p className='fw-bold labels'>Address:</p>
                    <p className=' info ps-4'>Tulkarm-Kafa street</p>
                  </div>
              </div>
                
                <ul className='d-flex gap-4 justify-content-center'>
                  <li className=' social'><FontAwesomeIcon icon={faLinkedinIn} /></li>
                  <li className=' social'><FontAwesomeIcon icon={faGithub} /></li>
                  <li className=' social'><FontAwesomeIcon icon={faFacebookF} /></li>
                  <li className=' social'><FontAwesomeIcon icon={faEnvelope} /></li>
                </ul>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </Layout>
  )
}
