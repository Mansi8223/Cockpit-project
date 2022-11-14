import Link from 'next/link'
import React, { useEffect } from 'react'
import ChatScreen from './ChatScreen'
import {getOnBoardFromCookie} from '../auth/userCookies';
import { useState } from 'react';
import ChatCard from './ChatCard';
import { Avatar } from '@material-ui/core'
function Chats() {
    const[searchTerm,setSearchTerm]=useState("")
    const[users,setUsers]=useState("")
    const[convo,setConvo]=useState("")
    const[activeChat,setActiveChat]=useState(false)
    const[id,setId]=useState("")
    const[name,setName]=useState("")
    var token = getOnBoardFromCookie()
    useEffect(()=>{
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
            console.log(res)
            console.log(res.count)
            setConvo(res.conversations)
        })
        .catch(error => console.log('error', error));

        // setInterval(getNotification, 1000);

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
            console.log(res.notification)
        })
        .catch(error => console.log('error', error));
    },[])

    const handler=()=>{
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
        })
        .catch(error => console.log('error', error));
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
            console.log(res.notification)
        })
        .catch(error => console.log('error', error));
    }



    const createHandler=(e)=>{
        setSearchTerm(e.target.value)

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
        })
        .catch(error => console.log('error', error));
    }
    const dataHandler=({id})=>{
        setId(id)
        setActiveChat(true)

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
        })
        .catch(error => console.log('error', error));
    }
  return (
    <div className={`col-11 d-flex d-flex-row d-align-start p-8 bg-white box-s mt-12 ml-7 border-rounded-16 mb-full`}>
        <div className={`col-5 d-flex d-flex-column d-align-start`}>
            <div className={`col-12 d-flex d-flex-row d-align-center gap-10 mb-8 pr-2`}>
                <div className={`d-flex d-flex-row d-align-center gap-1 border-bottom-primary`}>
                    <span className={`font-normal font-31 f-700 l-40 color-black`}>Chats</span>
                    <h3 className={`d-flex d-align-center d-justify-center pl-2 pr-1 border-circle bg-light-red font-normal f-700 l-28 color-red`}>1</h3>
                </div>
                <Link href="/DisputeMessages">
                    <div className={`d-flex d-flex-row d-align-center gap-1 cursor`}>
                        <span className={`font-normal font-31 f-700 l-40 color-gray`}>Disputes</span>
                        <h3 className={`d-flex d-align-center d-justify-center pl-2 pr-1 border-circle bg-light-red font-normal f-700 l-28 color-red`}>2</h3>
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
            <div className={`col-11 d-flex d-flex-column d-align-center`}>
                {convo&&convo.map((item,index)=>(
                    <div key={index+1} onClick={()=>{
                        setId(item._id)
                        setActiveChat(true)
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
                        {item.messages&&item.messages.map((item,index)=>(
                            <div key={index+1} className={`d-flex d-flex-column d-align-center gap-2`}>
                                <span className={`font-normal font-13 f-700 l-18 color-gray`}>{item.messageTime.split(" ")[4].slice(0,5)}</span>
                                {/* <h3 className={`d-flex d-align-center d-justify-center pl-2 pr-1 border-circle bg-primary font-normal f-600 l-28 color-white`}></h3> */}
                            </div>))}
                </div>
                ))}
            </div>}
        </div>
        {activeChat&&<ChatScreen id={id} name={name} handler={handler}/>}
    </div>
  )
}

export default Chats