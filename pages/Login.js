import React, { useState } from 'react'
function Login() {
  const[show, setShow]=useState(false)
  return (
    <div className={`row h-100 d-flex d-justify-center`} >
        <form className={`col-md-4 d-flex d-flex-column d-align-center d-justify-center`}>
            <div><img src='/images/cockpit-logo.png' alt='logo'/></div>
            <div className={`col-md-12 d-flex d-flex-column mt-12 gap-6`}>
                <div className={` d-flex d-flex-column gap-1`}>
                    <h5 className={`l-22 f-400`}>Admin username</h5>
                    <input  className={`d-flex d-flex-row d-align-center pl-3 bg-white border-none color-gray border-rounded-12`}type='email' placeholder='Enter username'/>
                </div>
                <div className={` d-flex d-flex-column gap-1`}>
                    <h5 className={`l-22 f-400`}>Admin password</h5>
                    <div className={`d-flex border-rounded-12 bg-white`}>
                        <input className={`col-md-11 d-flex d-flex-row d-align-center pl-3 bg-white border-none color-gray border-rounded-12`} type={show? "text":"password"} placeholder='Enter password'/>
                        <div className={`col-md-1 d-flex d-align-center bg-white border-none border-rounded-12 cursor`} onClick={()=>setShow(!show)}><img src='/images/vector.svg' alt='view-icon'/></div>
                    </div>
                </div>
            </div>
            <h6 className={`mt-1 self-end f-600 l-18 color-primary`}>Forgot password?</h6>
            <button className={`col-md-12 mt-5 btn h-48`}>Login</button>
        </form>
    </div>
  )
}

export default Login