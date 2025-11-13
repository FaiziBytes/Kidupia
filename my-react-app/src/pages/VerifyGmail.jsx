import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyGmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("verifying....");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyGmail = async () => {
            try {
                const res = await axios.post("http://localhost:3000/user/verify", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.success) {
                    setStatus("Email verified successfully");
                    setTimeout(() => {
                        navigate("/"); // Redirect to home after verification
                    }, 2000);
                } else {
                    setStatus("Verification failed");
                }
            } catch (error) {
                setStatus("An error occurred during verification");
            }
        };

        verifyGmail();
    }, [token, navigate]);

    return (
        <div>
            <h1>{status}</h1>
        </div>
    );
}

export default VerifyGmail;