import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import NewRequestsTable from './NewRequestsTable';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../css/NewRequests.module.css'
function NewRequests() {
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("All")
    const types = ['All','Virtual-assistant','Showing-assistant']
    const[activeTime, setActiveTime]=useState(false);
    const[time,setTime]=useState("All")
    const[activedeadline, setActiveDeadline]=useState(false);
    const[deadline, setDeadline]=useState("All")
    const[data, setData]=useState("")
    const[searchTerm, setSearchTerm]=useState("")
    const[loading, setLoading]=useState(false)
    const[filter,setFilter]=useState(false)
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
    const dropDownValues=["pending-approval","upcoming-request"]
    var ty= "All"
    var t="All"
    var d="All"
    var f="All"
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

        fetch(`http://34.209.233.51/api/task/all-requests?taskType=${ty}&time=${t}&deadline=${d}&requestStatus=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.tasks)
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

        fetch(`http://34.209.233.51/api/task/all-requests?taskType=${ty}&time=${t}&deadline=${d}&requestStatus=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.tasks)
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
    const typeHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/all-requests?taskType=${ty}&time=${t}&deadline=${d}&requestStatus=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.tasks)
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
    const deadlineHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/all-requests?taskType=${ty}&time=${t}&deadline=${d}&requestStatus=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.tasks)
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
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/all-requests?taskType=${ty}&time=${t}&deadline=${d}&requestStatus=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.tasks)
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
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/all-requests?taskType=${ty}&time=${t}&deadline=${d}&requestStatus=${f}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.tasks)
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
                <div className={`row col-11 d-flex p-3 mt-12 ml-12 mb-full bg-white border-rounded-16 box-s`}>
                    <div className={` col-12 d-flex d-flex-row d-align-center d-justify-space-between m-3`}>
                        <div className={` d-flex d-flex-row d-align-start gap-10 h-48`}>
                            <div className={`d-flex d-flex-row d-align-center cursor gap-1  border-bottom-primary`}>
                                <h2 className={`f-700 l-40 color-black cursor`}>New Requests</h2>
                                {data.length>0 && <h3 className={`${styles['count']} d-flex d-align-center d-justify-center f-700 l-28 color-red bg-light-red border-circle`}>{data.length}</h3>}
                                {/* <h3 className={`${styles['count']} d-flex d-align-center d-justify-center f-700 l-28 color-red bg-light-red border-circle`}>2</h3> */}
                            </div>
                            <Link href='/TaskWrapper'><h2 className={`f-700 l-40 cursor color-light-gray`}>All Tasks</h2></Link>
                            <Link href='/Template'><h2 className={`f-700 l-40 cursor color-light-gray`}>Templates</h2></Link>
                        </div>
                        <Link href='/CreateTask'>
                            <div className={`col-md-3 create-task d-flex d-flex-row d-align-center d-justify-center pt-4 pb-4 gap-2 bg-primary border-circle cursor`}>
                                <img src='/images/eva_plus-fill.png'/>
                                <h4 className={`f-700 l-22 color-white`}>Create new task</h4>
                            </div>
                        </Link>
                    </div>
                    <div className={`col-12 wrap-xxl d-flex d-flex-column gap-2 ml-5 mr-5`}>
                        <div className={`col-12 d-flex d-flex-row d-align-start gap-8`}>
                            <div className={`w-max-content p-relative d-flex d-flex-column d-align-center bg-white`}>
                                <div className={`w-max-content d-flex d-flex-row d-align-center d-justify-space-between h-40 pl-1 pr-1 word-break f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setIsActive(!isActive)}>
                                    <div className={`d-flex d-flex-row d-align-center gap-2 d-justify-center`}>
                                        <h5>Employee Type:</h5>
                                        <h5>{selected}</h5>
                                    </div> 
                                    <img src='/images/feather_chevron-down.png'/> 
                                </div>
                                {isActive && (
                                    <div className={`col-11 p-absolute z-index-popup mt-12 d-flex d-flex-column d-align-center bg-lighter-gray border-rounded-12`}>
                                        {types.map((type,index) =>(
                                        <div key={index} className={`cursor gap-2 f-700 l-22 p-1`} onClick={()=>{
                                            setSelected(type)
                                            setIsActive(false)
                                            ty=type
                                            typeHandler()}}>
                                            <h5>{type}</h5>
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={`col-3 col-md-3 col-lg-3 col-xl-3 col-xxl-2 p-relative d-flex d-flex-column d-align-center bg-white`}>
                                <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between h-40 pl-1 pr-1 word-break f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setActiveTime(!activeTime)}>
                                    <div className={`col-11 d-flex d-flex-row d-align-center gap-2 d-justify-center`}>
                                    <h5>Time:</h5>
                                    <h5>{time}</h5>
                                    </div>
                                    <img src='/images/feather_chevron-down.png'/> 
                                </div>
                                {activeTime && (
                                    <div className={`col-12 p-absolute z-index-popup mt-12 d-flex d-flex-column d-align-center bg-lighter-gray border-rounded-12`}>
                                        {times.map((item,index)=>(
                                        <div key={index} className={`cursor gap-2 f-700 l-22 p-1`} onClick={( )=>{
                                            setTime(item.value)
                                            t=item.key
                                            setActiveTime(false)
                                            timeHandler()}}>
                                            <h5>{item.value}</h5>
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={`w-max-content p-relative d-flex d-flex-column d-align-center bg-white `}>
                                <div className={`w-max-content d-flex d-flex-row d-align-center d-justify-space-between h-40 pl-1 pr-1 word-break f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setActiveDeadline(!activedeadline)}>
                                    <div className={`d-flex d-flex-row d-align-center gap-2 d-justify-center`}>
                                        <h5>Deadline:</h5>
                                        <h5>{deadline}</h5> 
                                    </div>
                                    <img src='/images/feather_chevron-down.png'/> 
                                </div>
                                {activedeadline && (
                                    <div className={`col-12 p-absolute z-index-popup mt-12 d-flex d-flex-column d-align-center bg-lighter-gray border-rounded-12`}>
                                        {times.map((item,index) =>(
                                        <div key={index} className={`cursor gap-2 f-700 l-22 p-1`} onClick={( )=>{
                                            setDeadline(item.value)
                                            d=item.key
                                            setActiveDeadline(false)
                                            deadlineHandler()}}>
                                            <h5>{item.value}</h5>
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* <div className={`col-4 p-relative d-flex d-flex-column bg-white `}>
                                <div className={`col-11 d-flex d-flex-row d-align-center d-justify-space-between h-40 pl-1 pr-1 word-break f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setActiveRevision(!activeRevision)}>
                                    <div className={`col-11 d-flex d-flex-row d-align-center gap-2 d-justify-center`}>
                                        <h5>Requested revision:</h5>
                                        <h5>{revision}</h5> 
                                    </div>
                                    <img src='/images/feather_chevron-down.png'/> 
                                </div>
                                {activeRevision && (
                                    <div className={`col-12 p-absolute mt-12 d-flex d-flex-column d-align-center bg-lighter-gray border-rounded-12`}>
                                        {revisions.map((item,index) =>(
                                        <div key={index} className={`cursor gap-2 f-700 l-22 p-1`} onClick={( )=>{
                                            setRevision(item)
                                            setActiveRevision(false)}}>
                                            <h5>{item}</h5>
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div> */}
                        </div>
                        <div className={`col-5 d-flex d-flex-row gap-3 `}>
                            <div className={`col-9 d-flex d-flex-row d-align-center gap-2 border-light-gray border-rounded-8 pl-3 pr-2 bg-lighter-gray`}>
                                <img src='/images/eva_search-fill.svg' alt='search-icon'/>
                                <input className={`search-input h-40 border-none bg-lighter-gray f-700 font-16 l-22`} type='text' value={searchTerm} placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)}/>
                            </div> 
                            <div className={`p-relative col-3 d-flex d-flex-column d-align-center`}>
                                <div onClick={toggle} className={`h-40 d-flex d-flex-row d-align-center d-justify-center gap-2 pl-3 pr-2 border-light-gray border-rounded-8`}>
                                    <img src='/images/eva_funnel-fill.svg' alt='funnel-icon'/>
                                    <h5 className={`f-700 l-22 color-black`}>Filter</h5>
                                </div>
                                {filter && (
                                <div className={`col-12 ${styles["dropdown-content"]} p-absolute z-index-popup mt-12 d-flex d-flex-column d-align-center bg-lighter-gray border-rounded-12`}>
                                    {dropDownValues.map((item,index) =>(
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
                    <NewRequestsTable data={data} searchTerm={searchTerm}/>
                </div>
            }
            <ToastContainer/>
        </>
    )
}

export default NewRequests