import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRef } from 'react';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddNewAssisForm() {
  const fileInputRef = useRef();
  const[name, setName]=useState("")
  const[email, setEmail]=useState("")
  const[password, setPassword]=useState("")
  const[notes, setNotes]=useState("")
  const[area, setArea]=useState("")
  const[url, setUrl]=useState("")
  const[loading,setLoading]=useState(false)
  var token = getOnBoardFromCookie()

  const submitHandler=(e)=>{
    setLoading(true)
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "area": area,
    "notes": notes,
    "assistantType": "showing",
    "name": name,
    "email": email,
    "password": password,
    "image": url
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://34.209.233.51/api/assistant/create-assistant", requestOptions)
    .then(response => response.text())
    .then(result => {
        setUrl("")
        setName("")
        setEmail("")
        setPassword("")
        setArea("")
        setNotes("")
        setLoading(false)
        toast.success("Assistant created",{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
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
  const fileHandler=(e)=>{
    setLoading(true)
    const file = e.target.files[0];
    console.log(e.target.files[0])
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

  const nameHandler=(e)=>{setName(e.target.value)}
  const emailHandler=(e)=>{setEmail(e.target.value)}
  const passwordHandler=(e)=>{setPassword(e.target.value)}
  const notesHandler=(e)=>{setNotes(e.target.value)}
  const areaHandler=(e)=>{setArea(e.target.value)}
  return (
    <>
        {loading?<Loader loading={loading}/>:
            <form className={`col-10 ml-12 mt-12 mb-full h-fit-content p-10 bg-white border-light-gray border-rounded-16 box-s`}>
                <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-8`}>
                    <span className={`col-6 font-31 f-700 l-40`}>Add new assistant</span>
                    <div className={`d-flex d-flex-row gap-3`}>
                        <div onClick={submitHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-10 pb-10 pr-5 bg-primary border-rounded-12 cursor`}>
                            <img src='images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                            <h5 className={`f-700 l-22 color-white`}>Save changes</h5>
                        </div>
                        <Link href='/ShowingAssistant'>
                            <div className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-10 pb-10 pr-5 bg-lighter-gray border-rounded-12 cursor`}>
                                <img src='images/eva_close-fill (2).svg' alt='close-icon'/>
                                <h5 className={`f-700 l-22 color-gray`}>Discard</h5>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={`col-6 col-md-8 col-lg-7 col-xxl-6 d-flex d-flex-column mb-full`}>
                    <div className={`col-12 d-flex d-flex-row mb-6`}>
                        <h3 className={`col-5 f-700 l-28 color-black`}>Add assistant profile</h3>
                        <div className={`col-7`}>
                            <div onClick={(event)=>{
                            event.preventDefault();
                            fileInputRef.current.click();
                            }}>
                            {url ? <img src={url}/>:
                                <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-5 pb-5 bg-lighter-gray border-rounded-12`}>
                                    <img src='images/eva_file-add-fill.svg' alt='add-file-icon'/>
                                    <h5 className={`f-700 l-22 color-gray`}>Select or Drag the deliverables here</h5>
                                </div>}
                            </div>
                            <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={fileHandler}/>
                        </div>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Assistant Name</h3>
                        <textarea className={`col-7 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={name} onChange={nameHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Email</h3>
                        <textarea className={`col-7 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={email} onChange={emailHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Password</h3>
                        <textarea className={`col-7 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={password} onChange={passwordHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Area</h3>
                        <textarea className={`col-7 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={area} onChange={areaHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Notes</h3>
                        <textarea className={`col-7 ml-6 h-100px color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} type='text' placeholder='Enter title' value={notes} onChange={notesHandler}/>
                    </div>
                </div>
            </form>}
        <ToastContainer/>
    </>
  )
}

export default AddNewAssisForm