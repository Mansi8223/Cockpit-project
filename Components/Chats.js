import Link from 'next/link'
import React, { useEffect } from 'react'
import ChatScreen from './ChatScreen'
import {getOnBoardFromCookie} from '../auth/userCookies';
import { useState } from 'react';
import ChatCard from './ChatCard';
import { Avatar } from '@material-ui/core'
import styles from '../css/Chats.module.css'
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';

function Chats() {
    const[searchTerm,setSearchTerm]=useState("")
    const[users,setUsers]=useState("")
    const[convo,setConvo]=useState("")
    const[activeChat,setActiveChat]=useState(false)
    const[id,setId]=useState("")
    const[name,setName]=useState("")
    const[notification,setNotification]=useState("")
    const[loading,setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    useEffect(()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/chat/admin/all-chat", requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setConvo(res.conversations)
            setLoading(false)
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

        setInterval(getNotification, 1000);

    },[])

    const handler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/chat/admin/all-chat", requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            // console.log(res.conversations)
            setLoading(false)
            setConvo(res.conversations)
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
    }

    const getNotification=()=>{
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/chat/all-notification", requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setNotification(res.notification)
            setLoading(false)
            if(res.notification.length!=0){
                var myHeaders = new Headers();
                myHeaders.append("token", token);

                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };

                fetch("http://34.209.233.51/api/chat/admin/all-chat", requestOptions)
                .then(response => response.text())
                .then(result => {
                    var res = JSON.parse(result);
                    setConvo(res.conversations)
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
                });
            }
        })
        .catch(error => {
            setLoading(false)
        });
    }



    const createHandler=(e)=>{
        setSearchTerm(e.target.value)

        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/user/all-users", requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            // console.log(res.users)
            setUsers(res.users)
            setLoading(false)
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
    }
    const dataHandler=({id})=>{
        setId(id)
        setActiveChat(true)

        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/chat/admin/all-chat", requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            // console.log(res.conversations)
            setConvo(res.conversations)
            setLoading(false)
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
    }
  return (
    <>
        {loading?<Loader loading={loading}/>:<div className={`col-11 d-flex d-flex-row d-align-start p-8 bg-white box-s mt-12 ml-7 border-rounded-16 mb-5`}>
            <div className={`col-5 d-flex d-flex-column d-align-start`}>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-10 mb-8 pr-2`}>
                    <div className={`d-flex d-flex-row d-align-center gap-1 border-bottom-primary`}>
                        <span className={`font-normal font-31 f-700 l-40 color-black`}>Chats</span>
                        <h3 className={`${styles["circle"]} d-flex d-align-center d-justify-center border-circle bg-light-red font-normal f-700 l-28 color-red`}>{notification.length}</h3>
                    </div>
                    <Link href="/DisputeMessages">
                        <div className={`d-flex d-flex-row d-align-center gap-1 cursor`}>
                            <span className={`font-normal font-31 f-700 l-40 color-gray`}>Disputes</span>
                            <h3 className={`${styles["circle"]} d-flex d-align-center d-justify-center border-circle bg-light-red font-normal f-700 l-28 color-red`}>2</h3>
                        </div>
                    </Link>
                </div>
                <div className={`col-10 d-flex d-flex-row gap-2 pl-4 pr-7 pt-3 pb-3 bg-lighter-gray border-circle mb-6`}>
                    <img src='images/eva_search-fill.svg' alt='search-icon'/>
                    <input className={`col-11 h-fit-content border-none bg-lighter-gray f-700 font-16 l-22 color-gray`} type='text' placeholder='Search for people and more' value={searchTerm} onChange={createHandler}/>
                </div>
                {searchTerm?<div className={`col-11 d-flex d-flex-column d-align-center`}>
                    {users&&users.filter((val)=>{
                    if(searchTerm == ""){
                    return 
                    }
                    else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                    }
                    }).map((item,index)=>(
                        <ChatCard key={index+1} item={item} dataHandler={dataHandler}/>
                    ))}
                </div>:
                <div className={`${styles["conversation-list"]} col-11 d-flex d-flex-column d-align-center`}>
                    {convo&&convo.map((item,index)=>(
                        <div key={index+1} id={item._id} onClick={()=>{
                            setId(item._id)
                            setActiveChat(true)
                            if(id){
                                var ele = document.getElementById(id)
                                if(ele.classList.contains('bg')){
                                    ele.classList.remove('bg')
                            }
                            }
                            if(item.user1&&item.user2)setName(item.user1.name +","+ item.user2.name)
                            else if(item.user1)setName(item.user1.name)
                        }} className={`col-11 d-flex d-flex-row d-align-start d-justify-space-between pl-4 pr-4 pt-3 pb-3 mb-4 border-rounded-16 border4-lighter-gray`}>
                            <div className='d-flex d-flex-row d-align-center gap-5'>
                                <Avatar />
                                <div className={`d-flex d-flex-column d-align-start`}>
                                    <div className={`d-flex d-flex-row d-align-center`}>
                                        {item.user1&&<h3 className={`font-normal f-600 l-28 color-black`}>{item.user1.name},</h3>}
                                        {item.user2&&<h3 className={`font-normal f-600 l-28 color-black`}>{item.user2.name},</h3>}
                                        <h3 className={`font-normal f-600 l-28 color-black`}>admin</h3>
                                    </div>
                                    {item.messages&&item.messages.map((item,index)=>(
                                        <>
                                            {item.media?<h3 className={`font-normal f-600 l-28 color-gray`}>Media</h3>:<h3 className={`font-normal f-600 l-28 color-gray`}>{item.message}</h3>}
                                        </>
                                    ))}
                                    {/* {item.messages&&<>{item.messages[0].media?<h3 className={`font-normal f-600 l-28 color-gray`}>Media</h3>:<h3 className={`font-normal f-600 l-28 color-gray`}>{item.messages[0].message}</h3>}</>} */}
                                </div>
                            </div>
                            <div className={`d-flex d-flex-column d-align-center gap-2`}>
                                {item.messages&&item.messages.map((item,index)=>(
                                    <span key={index+1} className={`font-normal font-13 f-700 l-18 color-gray`}>{item.messageTime.split(" ")[4].slice(0,5)}</span>
                                ))}
                                {item.count&&<h5 className={`${styles["count"]} d-flex d-align-center d-justify-center border-circle bg-primary font-normal f-700 l-22 color-white`}>{item.count}</h5>}
                            </div>
                    </div>
                    ))}
                </div>}
            </div>
            {activeChat&&<ChatScreen id={id} name={name} handler={handler}/>}
        </div>}
        <ToastContainer/>
    </>
  )
}

export default Chats