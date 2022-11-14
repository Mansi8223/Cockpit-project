import React, { useState } from 'react'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RejectModalContent(props) {
  const[reason, setReason]=useState("")
  const[loading,setLoading]=useState(false)
    var Id = props.id;
    const reasonHandler=(e)=>{
      setReason(e.target.value)
    }

    const closeHandler=(e)=>{
      setLoading(true)
      e.preventDefault();
      if(reason){
        var token = getOnBoardFromCookie()
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "reasonForDeny": reason
        });

        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/deny-task/${Id}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            props.handler()
            setLoading(false)
            toast.success("Task rejected",{
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
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
        else{
          setLoading(false)
          toast.error('Reason required',{
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
        props.handler()
        }
    }
  return (
    <>
      {loading?<Loader loading={loading}/>:
        <div className={`col-12 d-flex d-flex-column gap-2`}>
            <h2 className={`f-700 l-28 color-black`}>Reason for denying</h2>
            <form onSubmit={closeHandler} className={`d-flex d-flex-column gap-2 pr-1`}>
                <h5 className={`f-400 l-22`}>Give us a reason why you can't accept the task.</h5>
                <textarea className={`col-12 textarea h-140 border-none font-normal f-700 font-16 l-22 color-gray bg-lighter-gray border-rounded-12 outline-none`} value={reason} onChange={reasonHandler}/>
                <button type='submit' className={`col-5 self-center btn`}>Send</button>
            </form>
        </div>
      }
      <ToastContainer/>
    </>
  )
}

export default RejectModalContent