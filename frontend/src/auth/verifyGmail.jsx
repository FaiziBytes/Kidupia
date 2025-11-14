import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyGmail = () => {
  const {token} = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyGmail = async () => {
      try {
        // Send token in Authorization header
        const res = await axios.post(
          "http://localhost:3000/user/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setStatus("✅ Email verified successfully!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setStatus("❌ Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("⚠️ Invalid or expired verification link.");
      }
    };

    verifyGmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyGmail;