import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/navigation'
import { UserContext } from '../../../context/user/User.jsx';

export default function StudentRoute({children}) {
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const router = useRouter()
  const studentAuth=()=>{
    if(userData){
     
  if(localStorage.getItem("userToken")==null||userData.role!='student'){
    return router.push('/login')
    
 }}
}

 useEffect(() => {

  studentAuth();
}, [userData]);
return children
}
