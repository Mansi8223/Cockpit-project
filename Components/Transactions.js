import React from 'react'
import { useState } from 'react'
import {getOnBoardFromCookie} from '../auth/userCookies';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import style from '../css/Transactions.module.css'
function Transactions(props) {
    var item = props.item
    const[emdDate,setEmdDate]=useState(item.Emd.dueDate)
    const[financeDate, setFinanceDate]=useState(item.finance.endDate)
    const[apprisalDate, setApprisalDate]=useState(item.appraisal.endDate)
    const[diligencyDate, setDiligencyDate]=useState(item.deligence.endDate)
    const[loading,setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    const emdDateHandler=(e)=>{
        setEmdDate(e.target.value)
    }
    const financeDateHandler=(e)=>{
        setFinanceDate(e.target.value)
    }
    const appraisalDateHandler=(e)=>{
        setApprisalDate(e.target.value)
    }
    const diligencyDateHandler=(e)=>{
        setDiligencyDate(e.target.value)
    }
    const editHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "EmdDate": emdDate,
        "financingDate": financeDate,
        "appraisalDate": apprisalDate,
        "deligenceDate": diligencyDate
        });

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/transaction/${item._id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            setLoading(false)
            toast.success('Dates Saved',{
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
        });});
    }
  return (
    <>
        {loading? <Loader loading={loading}/>:
            <div className={`col-11 d-flex d-flex-row d-align-start d-justify-space-between p-6 border-rounded-12 bg-white box-s`}>
                <div className={`col-10 d-flex d-flex-column d-align-start gap-5`}>
                    <div className={`col-12 d-flex d-flex-row d-align-center gap-2`}>
                        <img src='/images/feather_dollar-sign.svg' alt='dollar-icon'/>
                        <h3 className={`font-normal f-700 l-28 color-black`}>{item.title}</h3>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center pt-1 pb-1`}>
                        <div className='col-6 d-flex d-flex-column border-right-gray pr-5 gap-2'>
                            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                                <img src='/images/feather_alert-triangle.svg' alt='alert-icon'/>
                                <h5 className={`col-10 font-normal f-700 l-22 color-gray ml-1`}>EMD: {emdDate}</h5>
                                <input className={`${style['calander']} col-1 d-flex d-justify-center h-fit-content bg-secondary color-primary border-circle border-none`} type='date' onChange={emdDateHandler}/>
                            </div>
                            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                                <img src='/images/eva_checkmark-circle-2-fill (3).svg' alt=''/>
                                <h5 className={`col-10 font-normal f-700 l-22 color-gray ml-1`}>Financing: {financeDate}</h5>
                                <input className={`${style['calander']} col-1 d-flex d-justify-center h-fit-content bg-secondary color-primary border-circle border-none`} type='date' onChange={financeDateHandler}/>
                            </div>
                        </div>
                        <div className='col-6 d-flex d-flex-column pl-5 gap-2'>
                            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                                <img src='/images/eva_checkmark-circle-2-fill (3).svg' alt='checkmark'/>
                                <h5 className={`col-10 font-normal f-700 l-22 color-gray ml-1`}>Appraisal: {apprisalDate}</h5>
                                <input className={`${style['calander']} col-1 d-flex d-justify-center h-fit-content bg-secondary color-primary border-circle border-none`} type='date' onChange={appraisalDateHandler}/>
                            </div>
                            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                                <img src='/images/eva_checkmark-circle-2-fill (3).svg' alt='checkmark'/>
                                <h5 className={`col-10 font-normal f-700 l-22 color-gray ml-1`}>Diligency: {diligencyDate}</h5>
                                <input className={`${style['calander']} col-1 d-flex d-justify-center h-fit-content bg-secondary color-primary border-circle border-none`} type='date' onChange={diligencyDateHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center gap-4`}>
                        <div className={`d-flex d-flex-row d-align-center gap-1`}>
                            <h5>Status:</h5>
                            {item.status ==="pending" && <button className={`btn-secondary-orange`}>{item.status}</button>}
                            {item.status ==="completed" && <button className={`btn-secondary-blue`}>{item.status}</button>}
                        </div>
                        <button onClick={editHandler} className={`btn-tertiary`}>Save Dates</button>
                    </div>
                </div>
                <h3 className={`col-2 font-normal f-700 l-28 color-gray`}>${item.amount}</h3>
            </div>}
        <ToastContainer/>
    </>
  )
}

export default Transactions