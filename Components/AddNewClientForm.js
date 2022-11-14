import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRef } from 'react';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddNewClientForm() {
  const fileInputRef = useRef();
  const fileInputRef1 = useRef();
  const[isChecked, setCheck]=useState(false);
  const[name, setName]=useState("")
  const[email, setEmail]=useState("")
  const[password, setPassword]=useState("")
  const[mlsId, setMlsId]=useState("")
  const[licence, setLicence]=useState("")
  const[contact, setContact]=useState("")
  const[brokeageNumber, setBrokeageNumber]=useState("")
  const[allianceSystem, setAllianceSystem]=useState("")
  const[inspectionCompany, setInspectionCompany]=useState("")
  const[transactionPerMonth, setTransactionPerMonth]=useState("")
  const[processOfSubmit, setProcessOfSubmit]=useState("")
  const[additionalProcess, setAdditionalProcess]=useState("")
  const[organization, setOrganization]=useState("")
  const[notes, setNotes]=useState("")
  const[url, setUrl]=useState("")
  const[logo, setLogo]=useState("")
  const[loading,setLoading]=useState(false)
  var token = getOnBoardFromCookie()

  const checkHandler=()=>{
    setCheck(prev => !prev)
  }
  const submitHandler=(e)=>{
    setLoading(true)
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "mlsId": mlsId,
    "licence": licence,
    "contact": contact,
    "brokeageNumber": brokeageNumber,
    "brokeageAllianceSystem": allianceSystem,
    "inspectionCompany": inspectionCompany,
    "transactionPerMonth": transactionPerMonth,
    "processOfSubmit": processOfSubmit,
    "additionalProcesses": additionalProcess,
    "isWorkinOrganization": isChecked,
    "organization": organization,
    "organizationLogo": "https://images.unsplash.com/photo-1663743556587-b0cd1a9cd61d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1886&q=80",
    "notes": notes,
    "name": name,
    "email": email,
    "password": password,
    "image": "https://images.unsplash.com/photo-1663743556587-b0cd1a9cd61d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1886&q=80"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://34.209.233.51/api/client/create-client", requestOptions)
    .then(response => response.text())
    .then(result =>{ 
        setUrl("")
        setName("")
        setEmail("")
        setPassword("")
        setMlsId("")
        setLicence("")
        setContact("")
        setBrokeageNumber("")
        setAllianceSystem("")
        setInspectionCompany("")
        setTransactionPerMonth("")
        setProcessOfSubmit("")
        setAdditionalProcess("")
        setOrganization("")
        setLogo("")
        setNotes("")
        setCheck(false)
        setLoading(false)
        toast.success("Client added",{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
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
    const nameHandler=(e)=>{setName(e.target.value)}
    const emailHandler=(e)=>{setEmail(e.target.value)}
    const passwordHandler=(e)=>{setPassword(e.target.value)}
    const mlsIdHandler=(e)=>{setMlsId(e.target.value)}
    const licenseHandler=(e)=>{setLicence(e.target.value)}
    const contactHandler=(e)=>{setContact(e.target.value)}
    const brokeageNumberHandler=(e)=>{setBrokeageNumber(e.target.value)}
    const allianceSystemHandler=(e)=>{setAllianceSystem(e.target.value)}
    const inspectionCompanyHandler=(e)=>{setInspectionCompany(e.target.value)}
    const transactionHandler=(e)=>{setTransactionPerMonth(e.target.value)}
    const processOfSubmitHandler=(e)=>{setProcessOfSubmit(e.target.value)}
    const additionalProcessHandler=(e)=>{setAdditionalProcess(e.target.value)}
    const organizationHandler=(e)=>{setOrganization(e.target.value)}
    const notesHandler=(e)=>{setNotes(e.target.value)}
    const fileHandler=(e)=>{
        setLoading(true)
        const file = e.target.files[0];
        console.log(e.target.files[0])
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
    const logoHandler=(e)=>{
        setLoading(true)
        const file = e.target.files[0];
        console.log(e.target.files[0])
        if(file&& file.type.substr(0,5)=== "image"){    
            var formdata = new FormData();
            formdata.append("type", "agentOrganizationLogo");
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
                setLogo(res.url)
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
            <form className={`col-10 ml-12 mt-12 mb-full h-fit-content p-10 bg-white border-light-gray border-rounded-16 box-s`}>
                <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-8`}>
                    <span className={`col-6 font-31 f-700 l-40`}>Add new client</span>
                    <div className={`d-flex d-flex-row gap-3`}>
                        <div onClick={submitHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pr-5 bg-primary border-rounded-12 cursor`}>
                            <img src='/images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                            <h5 className={`f-700 l-22 color-white`}>Save changes</h5>
                        </div>
                        <Link href='/Clients'>
                            <div className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pr-5 bg-lighter-gray border-rounded-12 cursor`}>
                                <img src='/images/eva_close-fill (2).svg' alt='close-icon'/>
                                <h5 className={`f-700 l-22 color-gray`}>Discard</h5>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={`col-9 col-md-12 col-lg-11 col-xl-10 col-xxl-9 d-flex d-flex-column mb-full`}>
                    <div className={`col-12 d-flex d-flex-row mb-6`}>
                        <h3 className={`col-5 f-700 l-28 color-black`}>Add client profile</h3>
                        <div className={`col-5 ml-6`}>
                            <div onClick={(event)=>{
                            event.preventDefault();
                            fileInputRef.current.click();
                            }}>
                            {url ? <img src={url}/>:
                                <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-5 pb-5 bg-lighter-gray border-rounded-12`}>
                                    <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                                    <h5 className={`f-700 l-22 color-gray`}>Select or Drag the deliverables here</h5>
                                </div>}
                            </div>
                            <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={fileHandler}/>
                        </div>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Name of the client</h3>
                        <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={name} onChange={nameHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Email</h3>
                        <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={email} onChange={emailHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Password</h3>
                        <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={password} onChange={passwordHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>MLS ID</h3>
                        <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={mlsId} onChange={mlsIdHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>License</h3>
                        <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={licence} onChange={licenseHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Best contact method</h3>
                        <input className={`col-5 ml-6 color-gray pl-4 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='number' placeholder='Enter text' value={contact} onChange={contactHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Brokeage number</h3>
                        <input className={`col-5 ml-6 color-gray pl-4 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='number' placeholder='Enter text' value={brokeageNumber} onChange={brokeageNumberHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Brokeage aliance system</h3>
                        <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={allianceSystem} onChange={allianceSystemHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Inspection Company Buyer will use, if known? (Company Name & Number)</h3>
                        <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={inspectionCompany} onChange={inspectionCompanyHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>About how many transactions do you close per month?</h3>
                        <input className={`col-5 ml-6 color-gray pl-4 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='number' placeholder='Enter text' value={transactionPerMonth} onChange={transactionHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>What is the process for completing/submitting the Disbursement Authorization (Pay at Close) for your brokerage?</h3>
                        <textarea className={`col-5 ml-6 h-100px color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={processOfSubmit} onChange={processOfSubmitHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Are there any additional processes that you or your brokerage require that we should be aware of?</h3>
                        <textarea className={`col-5 ml-6 h-100px color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={additionalProcess} onChange={additionalProcessHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Do you work in any organization?</h3>
                        <label className={`switch ml-6`}>
                            <input type='checkbox' onChange={checkHandler}/>
                            <span className={`slider`}/>
                        </label>
                    </div>
                    {isChecked && <>
                        <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                            <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Name of the organization</h3>
                            <textarea className={`col-5 ml-6 color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={organization} onChange={organizationHandler} />
                        </div>
                        <div className={`col-12 d-flex d-flex-row mb-6`}>
                            <h3 className={`col-5 f-700 l-28 color-black`}>Organisation logo</h3>
                            <div className={`col-5 ml-6`}>
                                <div onClick={(event)=>{
                                event.preventDefault();
                                fileInputRef1.current.click();
                                }}>
                                {logo ? <img src={logo}/>:
                                    <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-5 pb-5 bg-secondary border-rounded-12`}>
                                        <img src='/images/eva_file-add-fill-blue.svg' alt='add-file-icon'/>
                                        <h5 className={`f-700 l-22 color-primary`}>Select or Drag the deliverables here</h5>
                                    </div>}
                                </div>
                                <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef1} accept='images/*' onChange={logoHandler}/>
                            </div>
                        </div>
                    </>}
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Notes</h3>
                        <textarea className={`col-5 ml-6 h-100px color-gray pl-4 pt-2 pb-2 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} placeholder='Enter text' value={notes} onChange={notesHandler}/>
                    </div>
                </div>
            </form>}
    </>
  )
}

export default AddNewClientForm