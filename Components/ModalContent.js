import React, { useEffect } from 'react'
import { useState } from 'react';
import Banner from './Banner';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ModalContent(props) {
    const[data, setData]=useState("")
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("All")
    const[id, setId]=useState("")
    const[loading, setLoading]=useState(false)
    const[searchTerm,setSearchTerm]=useState("")
    const types = ['All','virtual','showing']
    var ty= "All"
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

        fetch(`http://34.209.233.51/api/assistant/all-available?assistantType=${ty}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            // console.log(res.assistants)
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
    const typeHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/assistant/all-available?assistantType=${ty}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            // console.log(res.assistants)
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
    const yesClicked = (e) =>{
        setLoading(true)
        e.preventDefault()
        if(id){
            var myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "assistantId": id
            });

            var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(`http://34.209.233.51/api/task/add-assignee/${props.id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                props.handler()
                setLoading(false)
                toast.success("Assignee added",{
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
        else{
            props.handler()
            setLoading(false)
        }
    }
    const dataHandler=(item)=>{
        setId(item._id)
    }
  return (
    <>
        {loading?<Loader loading={loading}/>:
            <div className={`col-12`}>
                <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between mb-8`}>
                <span className={`font-31 f-700 l-40 color-black`}>Add assignee</span>
                <button className={`d-flex d-flex-row d-align-center d-justify-center gap-2 pl-4 pt-3 pb-3 pr-5 border-none bg-primary color-white font-normal font-16 f-700 border-circle cursor`} onClick={yesClicked}>
                    <img src='/images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                    Assign
                </button>
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-3 mb-6`}>
                <h3 className={`f-700 l-28 color-black`}>Title of task:</h3>
                <h3 className={`f-600 l-28 color-gray`}>{props.title}</h3>
                </div>
                <div className={`col-12 d-flex d-flex-column d-align-start gap-4 mb-6`}>
                    <div className={`col-9 d-flex d-flex-row d-align-center gap-2 border-light-gray border-rounded-4 pl-3 pr-2 bg-lighter-gray`}>
                        <img src='/images/eva_search-fill.svg' alt='search-icon'/>
                        <input className={`search-input h-40 border-none bg-lighter-gray f-700 font-16 l-22`} type='text' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                    </div>
                    <div className={`col-md-9 col-xl-8 col-xxl-8 p-relative d-flex d-flex-column bg-white`}>
                        <div className={`col-11 p-relative  d-flex d-flex-row d-align-center d-justify-center h-40 pl-2 pr-2 word-break gap-2 f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setIsActive(!isActive)}>
                            <h5>Employee Type:</h5>
                            <h5>{selected}</h5> 
                            <img src='/images/feather_chevron-down.png'/> 
                        </div>
                        {isActive && (
                            <div className={`col-8 mt-12 p-absolute z-index-popup bg-white pl-9 pr-9 d-flex d-flex-column d-align-center `}>
                                {types.map((item,index) =>(
                                <div key={index} className={`cursor gap-2 f-700 l-22 p-1`} onClick={()=>{
                                    setSelected(item)
                                    setIsActive(false)
                                    ty = item
                                    typeHandler()}}>
                                    <h5>{item}</h5>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <h5 className={`f-700 l-22 color-gray mb-5`}>Choose Assignee</h5>
                
                <div className={`oy-scroll banners col-12 h-358`}>
                {data && data.filter((val)=>{
                        if(searchTerm == ""){
                        return val
                        }else if(val.user.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val
                        }
                    }).map((item,index)=>(
                        <Banner key={index+1} item={item} dataHandler={dataHandler}/>
                    ))}
                </div>
            </div>
        }
        <ToastContainer/>
    </>
  )
}

export default ModalContent