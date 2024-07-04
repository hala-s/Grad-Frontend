import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/navigation'
import { UserContext } from '../../../context/user/User.jsx';

export default function InstuctorRoute({children}) {
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const router = useRouter()
  const InstructorAuth=()=>{
    if(userData){
     
  if(localStorage.getItem("userToken")==null||userData.role!='instructor'){
    return router.push('/login')
 }}
}

 useEffect(() => {

  InstructorAuth();
}, [userData]);
return children
}
