import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/user/User';

export default function MainSubAdminRoute({children}) {
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const router = useRouter()
  const MainSubAdminAuth=()=>{
    if(userData){
     
  if(localStorage.getItem("userToken")==null||!(userData.role=="main-subadmin")){
    return router.push('/login')
    
 }
}
}

 useEffect(() => {

  MainSubAdminAuth();
}, [userData]);
return children
}
