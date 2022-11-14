import React from 'react'
import { useState } from 'react'
import { useRef } from 'react';
import useFirebaseAuth from '../auth/useFirebaseAuth';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ProfileEditModalContent(props) {
    if(props){
        var user = props.user
        var email =props.user.email
        var image = props.user.image
    }
    const fileInputRef = useRef();
    const[url, setUrl]=useState(image)
    const[name, setName]=useState(user.name)
    const[loading, setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    const fileHandler=(e)=>{
        setLoading(true)
        const file = e.target.files[0];
        if(file&& file.type.substr(0,5)=== "image"){
            var formdata = new FormData();
            formdata.append("type", "userImage");
            formdata.append("file", e.target.files[0], "[PROXY]");

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("http://34.209.233.51/api/fileupload", requestOptions)
            .then(response => response.text())
            .then(result => {
                var res = JSON.parse(result);
                // console.log(res.url)
                setUrl(res.url)
                setLoading(false)
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
    }
    const nameHandler=(e)=>{
        setName(e.target.value)
    }
    
    const {sendPasswordResetEmail,authUser} = useFirebaseAuth()
    const resetPasswordHandler=()=>{
            sendPasswordResetEmail(email)
            .then(authUser => {
                toast.success("Password changed successfully",{
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  })
            })
            .catch(error => {
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
            })
    }
    const submitHandler=(e)=>{
        setLoading(true)
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": name,
        "image": url
        });

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/user/edit", requestOptions)
        .then(response => response.text())
        .then(result => {
            props.handler()
            setLoading(false)
            toast.success("Edited successfully",{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
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
        {loading? <Loader loading={loading}/>:
            <div className={`col-12 d-flex d-flex-column`}>
                <span className={`font-normal font-31 f-700 l-40 mb-4`}>Profile</span>
                <form onSubmit={submitHandler}>
                    <div>
                        <div onClick={(event)=>{
                            event.preventDefault();
                            fileInputRef.current.click();
                            }} className={`col-12 d-flex d-justify-center mb-12 `}>
                            {url ? 
                            <div className={`p-relative d-flex d-flex-row d-align-end`}>
                                    <img className={`w-100px h-100px d-flex d-justify-center border-circle`} src={url}/>
                                <div className={`p-absolute p-1 border-circle bg-white `}>
                                    <div className={`pl-2 pt-2 pr-1 bg-primary border-circle`}>
                                        <img src='/images/eva_edit-2-fill (1).svg' alt='edit-icon-2'/>
                                    </div>
                                </div>
                            </div>
                            :<div className={`p-relative d-flex d-flex-row d-align-end`}>
                                <div className={`d-flex d-justify-center p-10 bg-lighter-gray border-circle`}>
                                    <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                                </div>
                                <div className={`p-absolute p-1 border-circle bg-white`}>
                                    <div className={`bg-primary p-2 border-circle d-flex d-justify-center`}>
                                        <img src='/images/eva_edit-2-fill (1).svg' alt='edit-icon-2'/>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={fileHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column gap-5`}>
                        <div className={`col-12 d-flex d-flex-row d-align-center`}>
                            <h3 className={`col-6 font-normal f-700 l-28 color-black`}>Name</h3>
                            <input className={`col-6 pl-4 pr-4 font-normal f-400 font-20 l-28 color-gray border-light-gray border-rounded-4`} type='text' placeholder="Enter name" value={name} onChange={nameHandler}/>
                        </div>
                        {/* <div className={`col-12 d-flex d-flex-row d-align-center`}>
                            <h3 className={`col-6 font-normal f-700 l-28 color-black`}>Email</h3>
                            <input className={`col-6 pl-4 pr-4 font-normal f-400 font-20 l-28 color-gray border-light-gray border-rounded-4`} type='email' placeholder="Enter email"/>
                        </div>
                        <div className={`col-12 d-flex d-flex-row d-align-center`}>
                            <h3 className={`col-6 font-normal f-700 l-28 color-black`}>Password</h3>
                            <div className={`col-6 d-flex d-flex-row pl-4 pr-4 border-light-gray border-rounded-4 bg-white`}>
                                <input className={`col-11 font-normal f-400 font-20 l-28 color-gray border-none`} type={show? "text":"password"} placeholder="Enter password"/>
                                <div className={`col-1 d-flex d-align-center bg-white border-none border-rounded-12 cursor`} onClick={()=>setShow(!show)}><img src='/images/eye.svg' alt='view-icon'/></div>
                            </div>
                        </div> */}
                        <h5 onClick={resetPasswordHandler} className={`self-end font-normal f-700 l-22 color-primary text-uppercase`}>Change Password</h5>
                        <button type='submit' className={`col-5 self-center btn`}>Send</button>
                    </div>
                </form>
            </div>
        }
    </>
  )
}

export default ProfileEditModalContent