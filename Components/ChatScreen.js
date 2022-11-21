import React from 'react'
import { Avatar } from '@material-ui/core'
import { useState } from 'react'
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../css/ChatScreen.module.css'
import {getOnBoardFromCookie} from '../auth/userCookies';
import { useEffect } from 'react';
import Loader from './Loader';

function ChatScreen({id,name,handler}) {
    var token = getOnBoardFromCookie()
    const fileInputRef = useRef();
    const[messages,setMessages]=useState("")
    const[text,setText]=useState("")
    const[url, setUrl]=useState()
    const[type,setType]=useState("")
    const[loading,setLoading]=useState(false)

    useEffect(()=>{
            var ele = document.getElementById(id)
            ele.classList.add('bg')
            
            setLoading(true)

            var myHeaders = new Headers();
            myHeaders.append("token", token);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
    
            fetch(`http://34.209.233.51/api/chat/all-message/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                var res = JSON.parse(result);
                // console.log(res)
                setMessages(res.messages)
                
                var element=document.getElementById("divmsg")
                element.scrollTop = element.scrollHeight;
                
                setLoading(false)
                setUrl("")
            })
            .catch(error =>{ 
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
    },[id])
   


    const textHandler=(e)=>setText(e.target.value)

    const fileHandler=(e)=>{
        setLoading(true)
        const file = e.target.files[0];
        if(file){
            var formdata = new FormData();
            formdata.append("type", "message");
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
                // console.log(file.type.split('/')[0])
                setType(file.type.split('/')[0])
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

    const submitHandler=(e)=>{
        setLoading(true)
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "message": text,
        "media": url,
        "mediaType": type,
        "conversationId": id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/chat/send-message", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            setLoading(false)

            var myHeaders = new Headers();
            myHeaders.append("token", token);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch(`http://34.209.233.51/api/chat/all-message/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                var res = JSON.parse(result);
                // console.log(res)
                setMessages(res.messages)
                // var element=document.getElementById("divmsg")
                // element.scrollTop = element.scrollHeight;
                setText("")
                setUrl("")
                handler()
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
        {loading?<Loader loading={loading}/>:<div className={`col-7 d-flex d-flex-column border-rounded-16 p-8 border-light-gray`}>
            <div className={`col-11 d-flex d-flex-row d-align-center gap-5 top-none`}>
                <Avatar/>
                <div className={`d-flex d-flex-column d-align-start gap-1`}>
                    <h3 className={`font-normal f-700 l-28 color-black`}>{name}</h3>
                    <h5 className={`font-normal text-uppercase f-700 l-22 color-gray`}>Agent</h5>
                </div>
            </div>
            <div id='divmsg' className={`${styles["msgs"]} col-12 h-538 d-flex d-flex-column gap-6 mt-2 mb-5 oy-scroll`}>
                {messages&&messages.map((item,index)=>(<>
                    {item.sendBy.userType==="admin"&&item.message&&<div className={`w-fit-content self-end pl-4 pr-4 pt-3 pb-3 bg-primary border-msg-s font-normal font-20 f-600 l-28 color-white`}>{item.message}</div>}
                    {item.sendBy.userType==="admin"&&item.media&&<img className={`${styles["img-msg"]} self-end`} src={item.media}/>}
                    {item.sendBy.userType==="assistant"&&item.media&&<img className={`${styles["img-msg"]} self-start`} src={item.media}/>}
                    {item.sendBy.userType==="assistant"&&item.message&&<div className={`w-fit-content self-start pl-4 pr-4 pt-3 pb-3 bg-lighter-gray border-msg-r font-normal font-20 f-600 l-28 color-black`}>{item.message}</div>}
                    {item.sendBy.userType==="agent"&&item.media&&<img className={`${styles["img-msg"]} self-start`} src={item.media}/>}
                    {item.sendBy.userType==="agent"&&item.message&&<div className={`w-fit-content self-start pl-4 pr-4 pt-3 pb-3 bg-lighter-gray border-msg-r font-normal font-20 f-600 l-28 color-black`}>{item.message}</div>}
                </>))}
            </div>
            {url&&
            <div className={`p-relative d-flex d-align-center d-justify-center`}><img className={`${styles["image"]} p-absolute`} src={url}/></div>}
            <form onSubmit={submitHandler} className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between pt-3 pb-3 bg-lighter-gray border-rounded-12`}>
                <input className={`col-10 border-none bg-lighter-gray h-fit-content ml-4 f-700 font-16 l-22 color-gray`} type='text' placeholder='Message' value={text} onChange={textHandler}/>
                <div className={`d-flex d-flex-row d-align-center gap-6 mr-4`}>
                    <div onClick={(event)=>{
                            event.preventDefault();
                            fileInputRef.current.click();
                            }}><img src='images/eva_file-add-fill1.svg' alt='add-file-icon'/></div>
                    <button type="submit" className={`border-none`}><img src='images/eva_paper-plane-fill.svg' alt='send-icon'/></button>
                    <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} onChange={fileHandler}/>
                </div>
            </form>
            
        </div>}
        <ToastContainer/>
    </>
  )
}

export default ChatScreen