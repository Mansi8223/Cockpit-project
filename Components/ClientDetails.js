import Link from 'next/link'
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react'
import { useState } from 'react'
import AddDetailModal from './AddDetailModal'
import AddDetailModalContent from './AddDetailModalContent'
import {getOnBoardFromCookie} from '../auth/userCookies';
import {useRouter} from 'next/router'
import Transactions from './Transactions'
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Password from './Password';
function ClientDetails() {
    var token = getOnBoardFromCookie()
    const router = useRouter();
    const Id = router.query["id"];
    const[data, setData]=useState("")
    const[show, setShow]=useState(false)
    const[passwords, setPasswords]=useState("")
    const[crmShow, setCrmShow]=useState(false)
    const[mlsShow, setMlsShow]=useState(false)
    const[facebook, setFacebook]=useState(false)
    const[compliance, setCompliance]=useState(false)
    const[homeWarranty, setHomeWarranty]=useState(false)
    const[instagram, setInstagram]=useState(false)
    const[twitter, setTwitter]=useState(false)
    const[youtube, setYoutube]=useState(false)
    // const[emdDate,setEmdDate]=useState('')
    // const[financeDate, setFinanceDate]=useState("")
    // const[apprisalDate, setApprisalDate]=useState("")
    // const[diligencyDate, setDiligencyDate]=useState("")
    const[active, setActive]=useState(false)
    const[edit, setEdit]=useState(false)
    const[name, setName]=useState("")
    const[notes, setNotes]=useState("")
    const[transaction, setTransaction]=useState("")
    const[user, setUser]=useState("")
    const[favouriteTask, setFavouriteTask]=useState("")
    const fileInputRef = useRef();
    // const[image, setImage]=useState();
    // const[preview, setPreview]=useState("");
    const[url, setUrl]=useState("")
    const[profile,setProfile]=useState("")
    const[loading,setLoading]=useState(false)
    // useEffect(()=>{
    //     if(image){
    //       const reader = new FileReader();
    //       reader.onloadend =() =>{
    //          setPreview(reader.result);
    //       }
    //       reader.readAsDataURL(image);
    //     }else{
    //         setPreview(null);
    //     }
    //   }, [image])
    useEffect(()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/client/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            // console.log(res.client)
            if(res.client.user)setName(res.client.user.name)
            setNotes(res.client.notes)
            setUrl(res.client.user.image)
            setProfile(res.client.user.image)
            if(res.client.passwords)setPasswords(res.client.passwords)
            if(res.client.user)setUser(res.client.user)
            if(res.client.favrouriteTasks)setFavouriteTask(res.client.favrouriteTasks)
            setData(res.client)
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

        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/transaction/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result =>{ 
            var res = JSON.parse(result);
            // console.log(res.transactions)
            setTransaction(res.transactions)
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

    const modalHandler=()=>{
        setActive(prev => !prev)
    }
    // const emdDateHandler=(e)=>{
    //    setEmdDate(e.target.value)
    // }
    // const financeDateHandler=(e)=>{
    //     setFinanceDate(e.target.value)
    // }
    // const appraisalDateHandler=(e)=>{
    //     setApprisalDate(e.target.value)
    // }
    // const diligencyDateHandler=(e)=>{
    //     setDiligencyDate(e.target.value)
    // }
    const editHandler=()=>{
        setEdit(true)
    }
    const nameHandler=(e)=>{
        setName(e.target.value)
    }
    const notesHandler=(e)=>{
        setNotes(e.target.value)
    }
    const discardHandler=()=>{
        setEdit(false)
    }
    const submitHandler=(e)=>{
        setLoading(true)
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "notes": notes,
        "name": name,
        "image": url
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/client/edit/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            setEdit(false)
            setLoading(false)
            toast.success('Client Details Edited',{
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
    const deleteHandler=()=>{
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`http://34.209.233.51/api/client/delete/${Id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false)
                toast.success('Client Deleted',{
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
    const fileHandler=(e)=>{
        setLoading(true)
        const file = e.target.files[0];
        if(file&& file.type.substr(0,5)=== "image"){
            var formdata = new FormData();
            formdata.append("type", "userImage");
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
                setUrl(res.url)
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
  return (
    <>
        {loading?<Loader loading={loading}/>:
            <>
                <div className={`row cd-wrapper col-12 d-flex d-flex-column d-align-start gap-12 mt-12 ml-7 mb-full`}>
                    <div className={`col-5 col-md-10 col-lg-10 col-xl-5 d-flex d-flex-column d-align-center gap-10 ml-7`}>
                        <div className={`col-12 d-flex d-flex-column bg-white box-s border-rounded-16 p-8 h-fit-content`}>
                            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between mb-6`}>
                                <span className={`font-normal font-31 f-700 l-40`}>Client details</span>
                                {edit?<div className={` d-flex d-flex-row d-align-center gap-3`}>
                                    <div onClick={submitHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-2 pb-2 pr-5 bg-primary border-rounded-12 cursor`}>
                                        <img src='/images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                                        <h5 className={`f-700 l-22 color-white`}>Save</h5>
                                    </div>
                                    <div onClick={discardHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4  pt-2 pb-2 pr-5 bg-lighter-gray border-rounded-12 cursor`}>
                                        <img src='/images/eva_close-fill (2).svg' alt='close-icon'/>
                                        <h5 className={`f-700 l-22 color-gray`}>Discard</h5>
                                    </div>
                                </div>:<div className={`col-7 col-md-6 col-lg-5 col-xl-7 d-flex d-flex-row d-align-center gap-3`}>
                                    <div onClick={editHandler} className={`col-6 d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-2 pb-2 pr-5 bg-secondary border-rounded-12 cursor`}>
                                        <img src='/images/eva_edit-2-fill.svg' alt='edit-icon'/>
                                        <h5 className={`f-700 l-22 color-primary`}>Edit details</h5>
                                    </div>
                                    <div onClick={deleteHandler} className={`col-6 d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-2 pb-2 pr-5 bg-light-red border-rounded-12 cursor`}>
                                        <img src='/images/eva_close-fill (1).svg' alt='cross-icon'/>
                                        <h5 className={`f-700 l-22 color-red`}>Delete client</h5>
                                    </div>
                                </div>}
                            </div>
                            {edit?<form>
                                <div>
                                    <div onClick={(event)=>{
                                        event.preventDefault();
                                        fileInputRef.current.click();
                                        }} className={`col-12 d-flex mb-12 `}>
                                        {url ? 
                                        <div className={`p-relative d-flex d-flex-row d-align-end`}>
                                                <img className={`w-100px h-100px d-flex d-justify-center border-circle`} src={url}/>
                                            <div className={`p-absolute p-1 border-circle bg-white `}>
                                                <div className={`pl-2 pt-2 pr-1 bg-white border-circle`}>
                                                    <img src='/images/eva_edit-2-fill (2).svg' alt='edit-icon-3'/>
                                                </div>
                                            </div>
                                        </div>
                                        :<div className={`p-relative d-flex d-flex-row d-align-end`}>
                                            <div className={`d-flex d-justify-center p-10 bg-lighter-gray border-circle`}>
                                                <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                                            </div>
                                            <div className={`p-absolute p-1 border-circle bg-white`}>
                                                <div className={`bg-white p-2 border-circle d-flex d-justify-center`}>
                                                    <img src='/images/eva_edit-2-fill (2).svg' alt='edit-icon-3'/>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                    <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={fileHandler}/>
                                </div>
                                <div className={`col-12 d-flex d-flex-column`}>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Name</h3>
                                        {data && <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={name} onChange={nameHandler}/>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Email</h3>
                                        {data&&<h3 className={`col-7 f-600 l-28 color-gray`}>{data.user.email}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start pb-4 mb-6 border-bottom-gray`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Password</h3>
                                        {data && <div className={`col-7 d-flex d-flex-row d-align-center`}>
                                            <input type={show? "text":"password"} value={data.user.password} className={`col-5 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly/>
                                            <div onClick={()=>setShow(!show)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div>}
                                    </div>

                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>No. of unused hrs</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.unusedHours}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>No. of used hrs</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.usedHours}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Last order</h3>
                                        <h3 className={`col-7 f-600 l-28 color-gray`}>Qui aut cumque animi a ipsam</h3>
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Last order date</h3>
                                        <h3 className={`col-7 f-600 l-28 color-gray`}>11/15/21</h3>
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Tasks used</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.task.length}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Reward pts</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.rewardPoints}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start pb-4 border-bottom-gray mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Last login</h3>
                                        <h3 className={`col-7 f-600 l-28 color-gray`}>11/14/21, 10:00 AM</h3>
                                    </div>

                                    <div className={`col-12 d-flex d-flex-row d-align-start`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Notes</h3>
                                        <textarea className={`col-7 h-100px color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={notes} onChange={notesHandler}/>
                                    </div>
                                </div>
                            </form>:<>
                                {profile ? 
                                        <div className={`p-relative d-flex d-flex-row d-align-end mb-12`}>
                                                <img className={`w-100px h-100px d-flex d-justify-center border-circle`} src={profile}/>
                                            {/* <div className={`p-absolute p-1 border-circle bg-white `}>
                                                <div className={`pl-2 pt-2 pr-1 bg-white border-circle`}>
                                                    <img src='/images/eva_edit-2-fill (2).svg' alt='edit-icon-3'/>
                                                </div>
                                            </div> */}
                                        </div>
                                        :<div className={`p-relative d-flex d-flex-row d-align-end mb-12`}>
                                            <div className={`d-flex d-justify-center p-10 bg-lighter-gray border-circle`}>
                                                <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                                            </div>
                                            {/* <div className={`p-absolute p-1 border-circle bg-white`}>
                                                <div className={`bg-white p-2 border-circle d-flex d-justify-center`}>
                                                    <img src='/images/eva_edit-2-fill (2).svg' alt='edit-icon-3'/>
                                                </div>
                                            </div> */}
                                        </div>}
                                <div className={`col-12 d-flex d-flex-column`}>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Name</h3>
                                        {data&&<h3 className={`col-7 f-600 l-28 color-gray`}>{data.user.name}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Email</h3>
                                        {data&&<h3 className={`col-7 f-600 l-28 color-gray`}>{data.user.email}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start pb-4 mb-6 border-bottom-gray`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Password</h3>
                                        {data && <div className={`col-7 d-flex d-flex-row d-align-center`}>
                                            <input type={show? "text":"password"} value={data.user.password} className={`col-5 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly/>
                                            <div onClick={()=>setShow(!show)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div>}
                                    </div>

                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>No. of unused hrs</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.unusedHours}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>No. of used hrs</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.usedHours}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Last order</h3>
                                        <h3 className={`col-7 f-600 l-28 color-gray`}>Qui aut cumque animi a ipsam</h3>
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Last order date</h3>
                                        <h3 className={`col-7 f-600 l-28 color-gray`}>11/15/21</h3>
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Tasks used</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.task.length}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Reward pts</h3>
                                        {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.rewardPoints}</h3>}
                                    </div>
                                    <div className={`col-12 d-flex d-flex-row d-align-start pb-4 border-bottom-gray mb-6`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Last login</h3>
                                    {user.lastLogin ? <h3 className={`col-7 f-600 l-28 color-gray`}>{user.lastLogin.split("GMT")[0].replace(" ",",")}</h3> : <h3 className={`col-7 f-600 l-28 color-gray`}>N/A</h3>}
                                    </div>

                                    <div className={`col-12 d-flex d-flex-row d-align-start`}>
                                        <h3 className={`col-5 f-700 l-28 color-black`}>Notes</h3>
                                        {data&&<h3 className={`col-7 f-600 l-28 color-gray`}>{data.notes}</h3>}
                                    </div>
                                </div>
                            </>}
                        </div>
                        <div className={`col-12 bg-white box-s border-rounded-16 p-8 h-fit-content`}>
                            <span className={`font-normal font-31 f-700 l-40`}>Onboarding info</span>
                            <div className={`col-12 d-flex d-flex-column d-align-start mt-6`}>
                                {passwords && <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>CRM passwords</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>{passwords.crm.username}</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={crmShow? "text":"password"} value={passwords.crm.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setCrmShow(!crmShow)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div>}
                                {passwords.mls && passwords.mls.map((item, index)=>(
                                    <div key={index+1} className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>MLS passwords</h3>
                                        <div  className={`col-7 d-flex d-flex-column d-align-start`}>
                                            <h5 className={`font-normal f-700 l-22 color-black`}>{item.username}</h5>
                                            <div className={`d-flex d-flex-row d-align-center`}>
                                                <input type={mlsShow? "text":"password"} value={item.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                                <div onClick={()=>setMlsShow(!mlsShow)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                            </div> 
                                        </div>
                                    </div>
                                ))}
                                {/* <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>MLS passwords</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>camwilliam@crm.com</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={mlsShow? "text":"password"} value="passwordmls" className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setMlsShow(!mlsShow)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div> */}
                                {passwords.facebook && <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Facebook</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>{passwords.facebook.username}</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={facebook? "text":"password"} value={passwords.facebook.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setFacebook(!facebook)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div>}
                                {passwords.instagram && <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Instagram</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>{passwords.instagram.username}</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={instagram? "text":"password"} value={passwords.instagram.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setInstagram(!instagram)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div>}
                                {passwords.twitter && <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Twitter</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>{passwords.twitter.username}</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={twitter? "text":"password"} value={passwords.twitter.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setTwitter(!twitter)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div>}
                                {passwords.youtube && <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Youtube</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>{passwords.youtube.username}</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={youtube? "text":"password"} value={passwords.youtube.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setYoutube(!youtube)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div>}
                                {passwords.compliance && <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Compliance</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>{passwords.compliance.username}</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={compliance? "text":"password"} value={passwords.compliance.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setCompliance(!compliance)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div>}
                                {passwords.homeWarranty && <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Home Warranty</h3>
                                    <div className={`col-7 d-flex d-flex-column d-align-start`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>{passwords.homeWarranty.username}</h5>
                                        <div className={`d-flex d-flex-row d-align-center`}>
                                            <input type={homeWarranty? "text":"password"} value={passwords.homeWarranty.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                                            <div onClick={()=>setHomeWarranty(!homeWarranty)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                                        </div> 
                                    </div>
                                </div>}
                                {passwords.addDetail && passwords.addDetail.map((item,index)=>( 
                                    <Password key={index+1} item={item}/>
                                ))}
                                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                    <h3 className={`col-5 font-normal f-700 l-28 color-black`}>E-signature</h3>
                                    <div className={`col-4 col-md-3 col-lg-3 col-xl-5 col-xxl-4 h-fit-content bg-lighter-gray p-1 border-rounded-12`}>
                                        <img src='' alt=''/>
                                    </div>
                                </div>
                                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                                    <h3 className={`col-5 f-700 l-28 color-black`}>Payment details</h3>
                                    <h3 className={`col-7 f-600 l-28 color-gray`}>Connected with Stripe</h3>
                                </div>
                                <div className={`col-12 d-flex d-flex-row d-align-start`}>
                                    <div className={`col-5`}></div>
                                    <div onClick={modalHandler} className={`col-3 col-xl-4 col-xxl-3 d-flex d-flex-row d-justify-center gap-4 bg-secondary border-rounded-12 p-3 cursor`}>
                                        <img src='/images/eva_plus-fill (1).svg' alt=''/>
                                        <span className={`font-normal font-16 f-700 l-22 color-primary`}>Add detail</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` col-5 col-md-10 col-lg-10 col-xl-5 container-right d-flex d-flex-column d-align-center gap-10 ml-7`}>
                        <div className={`col-12 bg-white box-s border-rounded-16 p-8 h-fit-content`}>
                            <span className={`font-normal font-31 f-700 l-40`}>Favorite tasks</span>
                            <div className={`col-12 d-flex d-flex-column d-align-start mt-6`}>
                            {favouriteTask && favouriteTask.map((item,index)=>( 
                                    <div key={index+1} className={`col-11 d-flex d-flex-column d-align-start gap-5 p-6 box-s bg-white border-rounded-12`}>
                                        <div className={`d-flex d-flex-row d-align-center gap-3`}>
                                            <img src='/images/eva_star-fill.svg' alt='star-icon'/>
                                            <h3 className={`font-normal f-700 l-28 color-black`}>{item.task.taskName}</h3>
                                        </div>
                                        <h5 className={`font-normal f-700 l-22 color-gray`}>{item.date.split("GMT")[0].slice(0,15).replace(" ",", ")}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`col-12 bg-white box-s border-rounded-16 p-8 h-fit-content`}>
                            <div className={`d-flex d-flex-row d-align-center d-justify-space-between`}>
                                <span className={`font-normal font-31 f-700 l-40`}>Tasks activity</span>
                                <div className={`d-flex d-flex-row d-align-center gap-1`}>
                                    <h3 className={`font-normal f-600 l-28 color-gray`}>Total amount spent:</h3>
                                    <h3 className={`font-normal f-700 l-28 color-yellow`}>$438</h3>
                                </div>
                            </div>
                            <div className={`d-flex d-flex-row d-align-start d-justify-space-between p-4 bg-white box-s border-rounded-12 mt-6`}>
                                <div className={`col-10 d-flex d-flex-column d-align-start gap-4`}>
                                    <div className={`d-flex d-flex-row d-align-center gap-2`}>
                                        <img src='/images/eva_checkmark-circle-2-fill (1).svg' alt=''/>
                                        {/* <img src='/images/eva_checkmark-circle-2-fill (2).svg' alt=''/> */}
                                        <h3 className={`font-normal f-700 l-28 color-black text-ellipsis`}>Qui aut cumque animi a ipsam</h3>
                                    </div>
                                    <h5 className={`font-normal f-700 l-22 color-gray`}>20 Sept,21</h5>
                                    <div className={`d-flex d-flex-row d-align-center gap-4`}>
                                        <div className={`d-flex d-flex-row d-align-center gap-1`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>Status:</h5>
                                        <button className={`btn-secondary-green`}>In progress</button>
                                        </div>
                                        <div className={`d-flex d-flex-row d-align-center gap-1`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>Screenshot:</h5>
                                        <button className={`btn-tertiary`}>Upload</button>
                                        </div>
                                    </div>
                                </div>
                                <h3 className={`col-2 font-normal f-700 l-28 color-yellow`}>+ $232</h3>
                            </div>
                            <div className={`d-flex d-flex-row d-align-start d-justify-space-between p-4 box-s border-rounded-12 bg-white mt-6`}>
                                <div className={`col-10 d-flex d-flex-column d-align-start gap-4`}>
                                    <div className={`d-flex d-flex-row d-align-center gap-2`}>
                                        {/* <img src='/images/eva_checkmark-circle-2-fill (1).svg' alt=''/> */}
                                        <img src='/images/eva_checkmark-circle-2-fill (2).svg' alt=''/>
                                        <h3 className={`font-normal f-700 l-28 color-black`}>Qui aut cumque animi a ipsam</h3>
                                    </div>
                                    <h5 className={`font-normal f-700 l-22 color-gray`}>20 Sept,21</h5>
                                    <div className={`d-flex d-flex-row d-align-center gap-4`}>
                                        <div className={`d-flex d-flex-row d-align-center gap-1`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>Status:</h5>
                                        <button className={`btn-secondary-blue`}>Completed</button>
                                        </div>
                                        <div className={`d-flex d-flex-row d-align-center gap-1`}>
                                        <h5 className={`font-normal f-700 l-22 color-black`}>Screenshot:</h5>
                                        <button className={`btn-tertiary`}>Upload</button>
                                        </div>
                                    </div>
                                </div>
                                <h3 className={`col-2 font-normal f-700 l-28 color-yellow`}>+ $232</h3>
                            </div>
                        </div>
                        <div className={`col-12 bg-white box-s border-rounded-16 p-8 h-fit-content`}>
                            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between mb-6`}>
                                <span className={`font-normal font-31 f-700 l-40`}>Transaction details</span>
                                <Link href={`/AddNewTransaction/${Id}`}>
                                    <h5 className={`font-normal f-700 l-22 text-uppercase color-primary cursor`}>Add transaction</h5>                
                                </Link>
                            </div>
                            <div className={`col-12 d-flex d-flex-column d-align-start gap-6`}>
                                {transaction && transaction.map((item,index)=>(
                                    <Transactions key={index+1} item={item}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {active&&<AddDetailModal modalClass="modal-verify">
                    <AddDetailModalContent handler={modalHandler} id={Id}></AddDetailModalContent>
                </AddDetailModal>}
            </>}
        <ToastContainer/>
    </>
  )
}

export default ClientDetails