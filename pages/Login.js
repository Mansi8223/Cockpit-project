import React, { useState } from 'react'
import {setOnBoardCookie, getOnBoardFromCookie, removeOnBoardCookie} from '../auth/userCookies'
import {useRouter} from 'next/router'
import useFirebaseAuth from '../auth/useFirebaseAuth';
import Loader from '../Components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const[show, setShow]=useState(false)
  const[email, setEmail]=useState("")
  const[password, setPassword]=useState("")
  const[loading, setLoading]=useState(false)
  const router = useRouter();
  const {signInWithEmailAndPassword,signOut,authUser} = useFirebaseAuth()
  const emailHandler=(e)=>{setEmail(e.target.value)}
  const passwordHandler=(e)=>{setPassword(e.target.value)}
  const formSubmit = (e) =>{
    setLoading(true)
    e.preventDefault()
    signInWithEmailAndPassword(email,password)
    .then(authUser => {
        var myHeaders = new Headers();
        myHeaders.append("token",authUser.user.multiFactor.user.accessToken);
        // myHeaders.append("Content-Type","application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`http://34.209.233.51/api/user/login`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                fetch(`http://34.209.233.51/api/user/generate-token/${authUser.user.multiFactor.user.uid}`,{
                    method: 'POST',
                    redirect: 'follow'
                })
                .then(response => response.text())
                .then(res => {
                    var results = JSON.parse(res)
                    setOnBoardCookie(results.token);
                    setLoading(false)
                    router.push("/TaskWrapper")
                })
                .catch(error => {
                    setLoading(false)
                    toast.error(error.message,{
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        toastId:"2"
                    });
                });
                
            })
            .catch(error => {
                setLoading(false)
                toast.error(error.message,{
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId:"2"
                });
            });
    })
    .catch(error => {
        setLoading(false)
        toast.error(error.message,{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId:"2"
        });
    });
}
  return (
    <>
        {loading ? <Loader loading={loading}></Loader>:
            <div className={`row h-100 d-flex d-justify-center`} >
                <form onSubmit={formSubmit} className={`col-md-6 col-lg-5 col-xl-4 col-xxl-3 d-flex d-flex-column d-align-center d-justify-center`}>
                    <div><img src='/images/cockpit-logo.png' alt='logo'/></div>
                    <div className={`col-md-12 d-flex d-flex-column mt-12 gap-6`}>
                        <div className={` d-flex d-flex-column gap-1`}>
                            <h5 className={`l-22 f-400`}>Admin username</h5>
                            <input  className={`d-flex d-flex-row d-align-center pl-3 bg-white border-none color-gray border-rounded-12`} value={email} type='email' placeholder='Enter username' onChange={emailHandler}/>
                        </div>
                        <div className={` d-flex d-flex-column gap-1`}>
                            <h5 className={`l-22 f-400`}>Admin password</h5>
                            <div className={`d-flex border-rounded-12 bg-white`}>
                                <input className={`col-md-11 d-flex d-flex-row d-align-center pl-3 bg-white border-none color-gray border-rounded-12`} type={show? "text":"password"} value={password} placeholder='Enter password' onChange={passwordHandler}/>
                                <div className={`col-md-1 d-flex d-align-center bg-white border-none border-rounded-12 cursor`} onClick={()=>setShow(!show)}><img src='/images/vector.svg' alt='view-icon'/></div>
                            </div>
                        </div>
                    </div>
                    <h6 className={`mt-1 self-end f-600 l-18 color-primary`}>Forgot password?</h6>
                    <button className={`col-md-12 mt-5 btn h-48`}>Login</button>
                </form>
            </div>
        }
        <ToastContainer/>
    </>
  )
}

export default Login