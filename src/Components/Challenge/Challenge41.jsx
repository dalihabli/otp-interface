import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { ColorRing } from 'react-loader-spinner';
import QRCode from 'react-qr-code';


const OtpLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    
    const [error, setError] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] =useState("");

    const validateEmail = (email)=>{
        
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        return isValidEmail
    }

    const handleEmailVerification = ()=>{
        if (validateEmail(email)) {
            setLoading(true);
            setTimeout(() => {
                setIsEmailVerified(true);
                setLoading(false);
                setError('');
            }, 2000);
        }
        else{
            setError("Invalid Email");
        }
    }

    const handleOTPVerification = ()=>{
        const enteredOTP = otp.join('');
        if (/^\d{4}$/.test(enteredOTP)) {
            const username = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
            onLogin(username)
        }
        else{
            setError("Incorrect OTP")
        }
    }

    

    function handleChange(e){
        setText(e.target.value)
    }

    return (
        <div className='otp-div'>
            {
                !isEmailVerified ? (
                    <>
                        <h1 className='otp-heading'>
                            Enter Your Email:
                        </h1>
                        <input
                            type='text'
                            placeholder='test@example.com'
                            value={email  }
                            onChange={(e) => {setEmail(e.target.value);
                            handleChange(e);
                            }}


                        />
                        
                        {
                            error && <span className='otp-error'>
                                {error}
                            </span>
                        }
                        <div>
                            <button onClick={handleEmailVerification} className='otp-verify-email'>
                               {
                                loading ? (
                                    <ColorRing color="#fff" height={50} width={50}/>
                                ): (
                                    'Verify Email'
                                )
                               }
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='otp-heading'>
                            <h1>Scan QR Code:</h1>
                            <QRCode value={text}/>
                        </div>
                      
                        {
                            error && <span className='otp-error'>
                                {error}
                            </span>
                        }
                       


                    </>
                )
            }
        </div>
    )
}

const Challenge41 = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username)
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    }
    return (
        <section className='timeline-landing'>
            <div className='row container'>
                {
                    isLoggedIn ? (
                        <div className='otp-div'>
                            <h1 className='otp-heading'>
                                Welcome, {username}
                            </h1>
                            <button onClick={handleLogout} className='otp-login'>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <OtpLogin onLogin={handleLogin} />
                    )
                }
            </div>
        </section>
    )
}

export default Challenge41