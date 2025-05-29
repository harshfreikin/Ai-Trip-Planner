import React, { useEffect } from 'react'
import { useNavigation } from 'react-router-dom';

function MyTrips() {
  useEffect(()=>{
    GetUserTrips();
  },[])
  const GetUserTrips=()=>{
    const user=localStorage.getItem('user');
    const navigation=useNavigation();
    if(!user){
      navigation('/');
      return;
    }
    
  }
  return (
    <div>
      MyTrips
    </div>
  )
}

export default MyTrips
