import React from 'react'
import { useState } from 'react'
import { useRef } from 'react' 
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';

function AssistantActivity({item}) {
    const fileInputRef = useRef();
    const[screenshot,setScreenshot]=useState("")
    const[loading, setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    const screenshotHandler=(e)=>{
        setLoading(true)
        const file = e.target.files[0];
        // console.log(e.target.files[0])
        if(file&& file.type.substr(0,5)=== "image"){    
            var formdata = new FormData();
            formdata.append("type", "deliverables");
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
                setScreenshot(res.url)
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
    const uploadHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "deliverables": screenshot
        });

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/assistant/add-deliverable/${item.task}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            setLoading(false)
            toast.success("screenshot added",{
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
            setScreenshot('')
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
        {loading?<Loader loading={loading}/>:<div className={`col-11 d-flex d-flex-row d-align-start d-justify-space-between p-4 bg-white box-s border-rounded-12 mt-6`}>
            <div className={`col-10 d-flex d-flex-column d-align-start gap-4`}>
                <div className={`d-flex d-flex-row d-align-center gap-2`}>
                    {item.activityType && item.activityType==="assigned" && <img src='/images/feather_plus-circle.svg' alt='plus-circle-icon'/>}
                    {item.activityType && item.activityType==="deadline" && <img src='/images/eva_clock-fill.svg' alt='clock-icon'/>}
                    {item.activityType && item.activityType==="completed" && <img src='/images/eva_checkmark-circle-2-fill (2).svg' alt=''/>}
                    {item.activityType && item.activityType==="request" && <img src='/images/eva_question-mark-circle-fill.svg' alt='question-mark-icon'/>}
                    {item.activityType && item.activityType==="started" && <img src='/images/eva_checkmark-circle-2-fill (1).svg' alt=''/>}
                    {/* <img src='/images/eva_checkmark-circle-2-fill (1).svg' alt=''/>
                    <img src='/images/eva_checkmark-circle-2-fill (2).svg' alt=''/> */}
                    <h3 className={`font-normal f-700 l-28 color-black text-ellipsis`}>{item.activity}</h3>
                </div>
                <h5 className={`font-normal f-700 l-22 color-gray`}>{item.date.split("GMT")[0].slice(0,15).replace(" ",", ")}</h5>
                <div className={`d-flex d-flex-row d-align-center gap-4`}>
                    <div className={`d-flex d-flex-row d-align-center gap-1`}>
                    <h5 className={`font-normal f-700 l-22 color-black`}>Status:</h5>
                    {item.activityType && item.activityType==="assigned" &&<button className={`btn-secondary-black`}>{item.activityType}</button>}
                    {item.activityType && item.activityType==="deadline" &&<button className={`btn-secondary-red`}>{item.activityType}</button>}
                    {item.activityType && item.activityType==="completed" &&<button className={`btn-secondary-blue`}>{item.activityType}</button>}
                    {item.activityType && item.activityType==="request" &&<button className={`btn-secondary-yellow`}>{item.activityType}</button>}
                    {item.activityType && item.activityType==="started" &&<button className={`btn-secondary-green`}>{item.activityType}</button>}
                    </div>
                    <div className={`d-flex d-flex-row d-align-center gap-1`}>
                        <h5 className={`font-normal f-700 l-22 color-black`}>Screenshot:</h5>
                        <div className={`d-flex d-flex-column d-align-center`}>
                            <div className={``}>
                                <div onClick={(event)=>{
                                event.preventDefault();
                                fileInputRef.current.click();
                                }}>
                                    {screenshot?<img className={`deliverables`} src={screenshot}/>:<button className={`btn-tertiary`}>Upload</button>}
                                </div>
                                <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={screenshotHandler}/> 
                            </div>
                            {screenshot&&<button onClick={uploadHandler} className={`btn-tertiary`}>Upload</button>}
                        </div>
                    </div>
                </div>
            </div>
            <h3 className={`col-2 font-normal f-700 l-28 color-yellow`}>+ $232</h3>
        </div>}
        <ToastContainer/>
    </>
  )
}

export default AssistantActivity