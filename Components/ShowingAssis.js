import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import ShowingAssisTable from './ShowingAssisTable';
import { useEffect } from 'react';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../css/Task.module.css'
function ShowingAssis() {
    const[data, setData]=useState("")
    const[searchTerm, setSearchTerm]=useState("")
    const[loading,setLoading]=useState(false)
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("All")
    const[filter,setFilter]=useState(false)
    const dropdownValues = ["Available","Assigned","Unavailable"]
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
    var ty= "All"
    var f= "All"
    var token = getOnBoardFromCookie()
    useEffect(()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token",token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/assistant/all-assistant?time=${ty}&status=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.assistants)
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
        myHeaders.append("token",token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/assistant/all-assistant?time=${ty}&status=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.assistants)
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
    const filterHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token",token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/assistant/all-assistant?time=${ty}&status=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.assistants)
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
    const toggle=()=>{
        setFilter(prev => !prev)
        f="All"
        var myHeaders = new Headers();
        myHeaders.append("token",token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/assistant/all-assistant?time=${ty}&status=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.assistants)
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
            {loading?<Loader loading={loading}/>:
                <div className={`row col-11 mt-12 ml-12 mb-full p-3 bg-white d-flex border-rounded-16 box-s`}>
                    <div className={` col-12 d-flex d-flex-row d-align-center d-justify-space-between m-3`}>
                        <span className={`font-normal font-31 f-700 l-40 color-black cursor`}>Showing Assistants</span>
                        <Link href='/AddNewAssistant'>
                            <div className={`d-flex d-flex-row d-align-center d-justify-center pl-6 pr-5 pt-4 pb-4 gap-2 bg-primary border-circle cursor`}>
                                <img src='/images/eva_plus-fill.png'/>
                                <h4 className={`f-700 l-22 color-white`}>Add new assistant</h4>
                            </div>
                        </Link>
                    </div> 
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
                            <div className={`p-relative col-3 d-flex d-flex-column d-align-center`}>
                                <div onClick={toggle} className={`h-40 d-flex d-flex-row d-align-center d-justify-center gap-2 pl-3 pr-2 border-light-gray border-rounded-8`}>
                                    <img src='/images/eva_funnel-fill.svg' alt='funnel-icon'/>
                                    <h5 className={`f-700 l-22 color-black`}>Filter</h5>
                                </div>
                                {filter && (
                                <div className={`col-12 ${styles["dropdown-content"]} p-absolute z-index-popup mt-12 d-flex d-flex-column d-align-center bg-lighter-gray border-rounded-12`}>
                                    {dropdownValues.map((item,index) =>(
                                    <div key={index} className={`cursor gap-2 f-700 l-22 p-2`} onClick={()=>{
                                        f=item
                                        filterHandler()}}>
                                        <h5>{item}</h5>
                                    </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <ShowingAssisTable data={data} searchTerm={searchTerm}/>
                </div>}
            <ToastContainer/>
        </>
    )
}

export default ShowingAssis