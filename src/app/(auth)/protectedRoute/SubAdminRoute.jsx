import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { UserContext } from '../../../context/user/User.jsx';

export default function SubAdminRoute({children}) {
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const router = useRouter()
  const SubAdminAuth=()=>{
    if(userData){
     
  if(localStorage.getItem("userToken")==null||!(userData.role=='subadmin')){
    return router.push('/login')
    
 }
}
}

 useEffect(() => {

  SubAdminAuth();
}, [userData]);
return children
}
