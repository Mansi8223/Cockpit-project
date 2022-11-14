import React from 'react'
import SubTaskTable from './SubTaskTable'
import Link from 'next/link'
import { useState } from 'react'
import {useRouter} from 'next/router'
import { useEffect } from 'react';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../css/Task.module.css'
function SubTask() {
  const[data, setData]=useState("")
  const[searchTerm, setSearchTerm]=useState("")
  const[nqLength,setNqLength]=useState("")
  const[loading,setLoading]=useState(false)
  const router = useRouter();
  const Id = router.query["id"];
  var token = getOnBoardFromCookie();
  useEffect(()=>{
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://34.209.233.51/api/subTask/all/${Id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        var res = JSON.parse(result);
        // console.log(res)
        setData(res.subTask)
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
              <Link href='/Template'><h2 className={`f-700 l-40 color-black cursor border-bottom-primary`}>Templates</h2></Link>
            </div>
            <Link href={`/SubTaskForm/${Id}`}>
              <div className={`col-md-3 create-task d-flex d-flex-row d-align-center d-justify-center pt-4 pb-4 gap-2 bg-primary border-circle cursor`}>
                <img src='/images/eva_plus-fill.png'/>
                <h4 className={`f-700 l-22 color-white`}>Create sub task</h4>
              </div>
            </Link>
          </div> 
          <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between gap-2 ml-5 mr-5 pr-1`}>
            <h3 className={`mb-5 font-normal f-700 l-28`}>Tasks > Sub-tasks</h3>
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
          <SubTaskTable searchTerm={searchTerm} data={data}/>
        </div>
      }
      <ToastContainer/>
    </>
  )
}

export default SubTask