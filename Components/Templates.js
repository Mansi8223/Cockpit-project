import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import TemplateTable from './TemplateTable';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../css/Task.module.css'
function Templates() {
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("All")
    const[data, setData]=useState("")
    const[searchTerm, setSearchTerm]=useState("")
    const[nqLength,setNqLength]=useState("")
    const[loading, setLoading]=useState(false)
    const types = ['All','Virtual-assistant','Showing-assistant']
    var token = getOnBoardFromCookie()
    var ty = "All"
    useEffect(()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/all-templates?taskType=${ty}`, requestOptions)
        .then(response => response.text())
        .then(result =>{ 
            var res = JSON.parse(result);
            // console.log(res.templates)
            setData(res.templates)
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

        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/all-requests`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setNqLength(res.tasks.length)
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
    const typeHandler=()=>{
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/all-templates?taskType=${ty}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            setData(res.templates)
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
                        <div className={` d-flex d-flex-row d-align-start gap-10 h-48`}>
                            <Link href='/NewRequest'>
                                <div className={`d-flex d-flex-row d-align-center cursor gap-1`}>
                                    <h2 className={`f-700 l-40 color-light-gray`}>New Requests</h2>
                                    {nqLength>0 && <h3 className={`${styles["count"]} d-flex d-align-center d-justify-center f-700 l-28 color-red bg-light-red border-rounded-20`}>{nqLength}</h3>}
                                </div>
                            </Link>
                            <Link href='/TaskWrapper'><h2 className={`f-700 l-40 color-light-gray cursor`}>All Tasks</h2></Link>
                            <h2 className={`f-700 l-40 color-black cursor border-bottom-primary`}>Templates</h2>
                        </div>
                        <Link href='/CreateTask'>
                            <div className={`col-md-3 create-task d-flex d-flex-row d-align-center d-justify-center pt-4 pb-4 gap-2 bg-primary border-circle cursor`}>
                                <img src='/images/eva_plus-fill.png'/>
                                <h4 className={`f-700 l-22 color-white`}>Create new task</h4>
                            </div>
                        </Link>
                    </div> 
                    <h3 className={`ml-5 mb-5 font-normal f-700 l-28`}>All tasks</h3>
                    <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between gap-2 ml-5 mr-5 pr-1`}>
                        <div className={`col-3 p-relative d-flex d-flex-column d-align-center bg-white`}>
                            <div className={`col-11 d-flex d-flex-row d-align-center d-justify-space-between h-40 pl-1 pr-1 word-break f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setIsActive(!isActive)}>
                                <div className={`col-11 d-flex d-flex-row d-align-center gap-2 d-justify-center`}>
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
                    <TemplateTable data={data} searchTerm={searchTerm}/>
                </div>
            }
            <ToastContainer/>
        </>
    )
}

export default Templates