import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const VerifyGmail = () => {
      const {token} = useParams();
      const[status,setStatus] = useState("verifying....");
      useEffect(()=>{
           const verifyGmail = async()=>{
            const res = await axios.post("http://localhost:3000/user/verify",{},{
                  headers:{
                        Authorization:`Bearer ${token}`
                  }
            });
            if(res.data.success){
                  setStatus("Email verified successfully");
                  setTimeout(() => {
                        
                  }, 2000);
            }
           } 
      })
  return (
    <div>

    </div>
  )
}

export default VerifyGmail;