import React from 'react'
import { useState } from 'react'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDetailModalContent(props) {
    const[check, setCheck]=useState(false)
    const[title, setTitle]=useState("")
    const[type, setType]=useState("")
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("Select")
    const types=[
        {
            'key':0,
            'value':'Password'
          
        },
        {
          'key':1,
          'value':'E-signature'
        }
    ]
    const[loading, setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    const titleHandler=(e)=>{
        setTitle(e.target.value)
    }
    const checkHandler=()=>{
       setCheck(prev => !prev)
    }
    const submitHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "title": title,
        "type": type,
        "isClientOnly": check
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/client/add-detail/${props.id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setLoading(false)
            toast.success("Details added",{
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
        })
        .catch(error => {
            console.log('error', error)
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
        // else{
        //     toast.error("Title and type required",{
        //         position: "bottom-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //         toastId:"2"
        //     });
        //     props.handler()
        // }
       
    }
  return (
    <>
        {loading ? <Loader loading={loading}/>:
            <div className={`p-4`}>
                <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                    <h5 className={`font-normal f-700 l-22 color-black`}>Ask for this client only</h5>
                    <div>
                        <label className={`switch`}>
                            <input type='checkbox' onChange={checkHandler}/>
                            <span className={`slider`}/>
                    </label>
                    </div>
                </div>
                <form onSubmit={submitHandler} className={`col-12 d-flex d-flex-column gap-4 mt-6`}>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h5 className={`font-normal f-700 l-22 color-black`}>Title</h5>
                        <textarea className={`col-11 pl-4 pr-4 pt-2 pb-2 border-light-gray border-rounded-4`} type='text' placeholder='Enter text' value={title} onChange={titleHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h5 className={`font-normal f-700 l-22 color-black`}>Type</h5>
                        <div className={`col-11 p-relative d-flex d-flex-column d-align-center bg-white ml-4`}>
                            <div className={`col-12 p-relative d-flex d-flex-row d-align-center d-justify-space-between pr-4 pt-3 pb-3 pl-4 border-light-gray border-rounded-4 bg-white`}onClick={()=>setIsActive(!isActive)}>
                                <h3 className={`font-normal f-400 l-28 color-gray`}>{selected}</h3> 
                                <img className={`mr-5`} src='/images/entypo_chevron-down (1).svg' alt='chevron-down'/> 
                            </div>
                            {isActive && (
                                <div className={`p-absolute z-index-popup col-12 d-flex d-flex-column d-align-center mt-popup border-rounded-12 bg-lighter-gray`}>
                                {types.map((item,index) =>(
                                <div key={index} className={`col-11 d-flex d-justify-center p-2 font-20 f-400 l-28 color-gray cursor transition`} onClick={()=>{
                                    setSelected(item.value)
                                    setType(item.key)
                                    setIsActive(false)}}>
                                    {item.value}
                                </div>
                                ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <button type='submit' className={`col-5 self-center btn`}>Send</button>
                </form>
            </div>}
        <ToastContainer/>
    </>
  )
}

export default AddDetailModalContent