import React from 'react'
import { useState } from 'react'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UpdateModalContent(props) {
    const[title, setTitle]=useState(props.title)
    const[amount, setAmount]=useState(props.amount)
    const[check, setCheck]=useState(false)
    const[loading,setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    const titleHandler=(e)=>{
        setTitle(e.target.value)
    }
    const amountHandler=(e)=>{
        setAmount(e.target.value)
    }
    const checkHandler=()=>{
        setCheck(prev => !prev)
     }
     const submitHandler=(e)=>{
        setLoading(true)
        e.preventDefault();
        if(title && amount){
            var myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "title": title,
            "amount": amount,
            "chargedHourly": check
            });

            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(`http://34.209.233.51/api/taskPrice/update/${props.id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false)
                props.handler()
                toast.success("Price updated",{
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
        }
        
    }
  return (
    <>
        {loading?<Loader loading={loading}/>:
            <form onSubmit={submitHandler} className={`d-flex d-flex-column d-align-start p-4`}>
                <h2 className={`font-normal f-700 l-28 color-black mb-8`}>Set a price</h2>
                <div className={`col-12 d-flex d-flex-column d-align-start gap-1 mb-4`}>
                    <h5 className={`font-normal f-700 l-22 color-black`}>Title</h5>
                    <textarea className={`col-11 pl-4 pr-4 pt-2 pb-2 border-light-gray border-rounded-4`} type='text' placeholder={props.title} value={title} onChange={titleHandler}/>
                </div>
                <div className={`col-12 d-flex d-flex-column d-align-start gap-1 mb-4`}>
                    <h5 className={`font-normal f-700 l-22 color-black`}>Amount</h5>
                    <textarea className={`col-11 pl-4 pr-4 pt-2 pb-2 border-light-gray border-rounded-4`} type='number' placeholder={props.amount} value={amount} onChange={amountHandler}/>
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between mb-5`}>
                    <h5 className={`font-normal f-700 l-22 color-black`}>Should this task be charged hourly?</h5>
                    <div>
                        <label className={`switch`}>
                            <input type='checkbox' onChange={checkHandler}/>
                            <span className={`slider`}/>
                    </label>
                    </div>
                </div>
                <button type='submit' className={`col-5 self-center btn`}>Send</button>
            </form>}
        <ToastContainer/>
    </>
  )
}

export default UpdateModalContent