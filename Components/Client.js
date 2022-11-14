import React from 'react'
import { useState } from 'react';
import ClientTable from './ClientTable';
import Link from 'next/link';
import { useEffect } from 'react';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Client() {
    const[data, setData]=useState("")
    const[searchTerm, setSearchTerm]=useState("")
    const[loading, setLoading]=useState(false)
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("All")
    const times=[
        {
            'key':'All',
            'value':'All'
          
        },
        {
          'key':45,
          'value':'Last 45 days'
        },
        {
            'key':30,
            'value':'Last 30 days'
        },
        {
            'key':15,
            'value':'Last 15 days'
        },
        {
            'key':7,
            'value':'Last week'
        }
    ]
    var token = getOnBoardFromCookie()
    var ty= "All"
    useEffect(()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/client/all-client?time=${ty}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.clients)
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
    },[])
    const timeHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/client/all-client?time=${ty}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.clients)
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
  return (
        <>
            {loading? <Loader loading={loading}/>:
                <div className={`row col-11 mt-12 ml-12 mb-full p-3 bg-white d-flex border-rounded-16 box-s`}>
                    <div className={` col-12 d-flex d-flex-row d-align-center d-justify-space-between m-3`}>
                        <span className={`font-normal font-31 f-700 l-40 color-black cursor`}>Clients</span>
                        <Link href='/AddNewClient'>
                            <div className={`col-md-3 create-task d-flex d-flex-row d-align-center d-justify-center pt-4 pb-4 gap-2 bg-primary border-circle cursor`}>
                                <img src='/images/eva_plus-fill.png'/>
                                <h4 className={`f-700 l-22 color-white`}>Add new client</h4>
                            </div>
                        </Link>
                    </div> 
                    <h3 className={`ml-5 mb-5 font-normal f-700 l-28`}>All clients</h3>
                    <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between gap-2 ml-5 mr-5 pr-1`}>
                        <div className={`col-2 p-relative col-md-3 col-lg-3 col-xl-3 col-xxl-2 d-flex d-flex-column d-align-center bg-white`}>
                            <div className={`col-11 p-relative d-flex d-flex-row d-align-center d-justify-center h-40 word-break gap-1 f-700 l-22 border-light-gray border-rounded-8 bg-white`}onClick={()=>setIsActive(!isActive)}>
                                <h5>Time:</h5>
                                <h5>{selected}</h5> 
                                <img src='/images/feather_chevron-down.png'/> 
                            </div>
                            {isActive && (
                                <div className={`col-11 mt-12 p-absolute z-index-popup d-flex d-flex-column d-align-center border-rounded-8 bg-lighter-gray`}>
                                    {times.map((item,index) =>(
                                    <div key={index} className={`cursor p-2 f-700 l-22 p-1 `} onClick={()=>{
                                        setSelected(item.value)
                                        setIsActive(false)
                                        ty = item.key
                                        timeHandler()}}>
                                        <h5>{item.value}</h5>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={`col-4 col-md-6 col-lg-4 d-flex d-flex-row gap-3 ml-1`}>
                            <div className={`col-9 d-flex d-flex-row d-align-center gap-2 border-light-gray border-rounded-8 pl-3 pr-2 bg-lighter-gray`}>
                                <img src='/images/eva_search-fill.svg' alt='search-icon'/>
                                <input className={`h-40 border-none bg-lighter-gray f-700 font-16 l-22`} type='text' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                            </div> 
                            <div className={`col-2 col-md-3 col-lg-2 h-40 d-flex d-flex-row d-align-center d-justify-center gap-2 pl-3 pr-2 border-light-gray border-rounded-8`}>
                                <img src='/images/eva_funnel-fill.svg' alt='funnel-icon'/>
                                <h5 className={`f-700 l-22 color-black`}>Filter</h5>
                            </div>
                        </div>
                    </div>
                    <ClientTable data={data} searchTerm={searchTerm}/>
                </div>}
                <ToastContainer/>
        </>
    )
}

export default Client