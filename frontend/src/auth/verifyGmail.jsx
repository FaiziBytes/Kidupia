import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const VerifyGmail = () => {
      const { token } = useParams();
      const [status, setStatus] = useState("verifying....");
      const navigate = useNavigate();
      useEffect(() => {
            const verifyGmail = async () => {
                  const res = await axios.post("http://localhost:3000/user/verify", {}, {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  });
                  if (res.data.success) {
                        setStatus("Email verified successfully");
                        setTimeout(() => {
                              navigate("/Home/Account");
                        }, 1000);
                  }
            }
            verifyGmail();
      }, [token, navigate])
      return (
            <div>
                  {status}
            </div>
      )
}

export default VerifyGmail;