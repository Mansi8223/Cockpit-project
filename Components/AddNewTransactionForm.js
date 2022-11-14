import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const dropDownValues=[
    {
      'value':'pending',
      'class':'btn-status-orange'
    },
    {
      'value':'done',
      'class':'btn-status-blue'
    }
  ]
function AddNewTransactionForm() {
    const router = useRouter();
    const Id = router.query["id"];
    const fileInputRef = useRef();
    const[image, setImage]=useState();
    const[preview, setPreview]=useState("");
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("pending")
    const[cls, setCls]=useState('btn-status-orange');
    const[emd, setEmd]=useState("")
    const[financing, setFinancing]=useState("")
    const[appraisal, setApprisal]=useState("")
    const[diligency, setDiligency]=useState("")
    const[title, setTitle]=useState("")
    const[amount, setAmount]=useState("")
    const[seller, setSeller]=useState("")
    const[requestedPrice, setRequestedPrice]=useState("")
    const[address, setAddress]=useState("")
    const[buyer, setBuyer]=useState("")
    const[purchasePrice, setPurchasePrice]=useState("")
    const[commision, setCommision]=useState("")
    const[loading,setLoading]=useState(false)
    useEffect(()=>{
        if(image){
          const reader = new FileReader();
          reader.onloadend =() =>{
             setPreview(reader.result);
          }
          reader.readAsDataURL(image);
        }else{
            setPreview(null);
        }
      }, [image])

      const submitHandler=(e)=>{
        setLoading(true)
        e.preventDefault();
        var token = getOnBoardFromCookie();
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "clientId": Id,
        "status": selected,
        "title": title,
        "amount": amount,
        "contract": "http://bjhsbx",
        "Emd": {
            "dueDate": emd
        },
        "financing": {
            "endDate": financing
        },
        "appraisal": {
            "endDate": appraisal
        },
        "deligence": {
            "endDate": diligency
        },
        "sellerName": seller,
        "sellerRequestedPrice": requestedPrice,
        "sellerAddress": address,
        "buyerName": buyer,
        "buyerPurchasePrice": purchasePrice,
        "buyerCommission": commision
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/transaction/add", requestOptions)
        .then(response => response.text())
        .then(result => {
            setEmd("")
            setFinancing("")
            setApprisal("")
            setDiligency("")
            setTitle("")
            setAmount("")
            setSeller("")
            setRequestedPrice("")
            setAddress("")
            setBuyer("")
            setPurchasePrice("")
            setCommision("")
            setLoading(false)
            toast.success("Transaction added",{
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
    const emdHandler=(e)=>setEmd(e.target.value)
    const financingHandler=(e)=>setFinancing(e.target.value)
    const appraisalHandler=(e)=>setApprisal(e.target.value)
    const diligencyHandler=(e)=>setDiligency(e.target.value)
    const titleHandler=(e)=>setTitle(e.target.value)
    const amountHandler=(e)=>setAmount(e.target.value)
    const sellerHandler=(e)=>setSeller(e.target.value)
    const requestedPriceHandler=(e)=>setRequestedPrice(e.target.value)
    const addressHandler=(e)=>setAddress(e.target.value)
    const buyerHandler=(e)=>setBuyer(e.target.value)
    const purchasePriceHandler=(e)=>setPurchasePrice(e.target.value)
    const commisionHandler=(e)=>setCommision(e.target.value)
  return (
    <>
        {loading? <Loader loading={loading}/>:
            <form className={`col-10 ml-12 mt-12 mb-full h-fit-content p-10 bg-white border-light-gray border-rounded-16 box-s`}>
                <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-6`}>
                    <span className={`col-6 font-31 f-700 l-40`}>Add new transaction</span>
                    <div className={`d-flex d-flex-row gap-3`}>
                        <Link href={`/Clients/${Id}`}>
                            <div onClick={submitHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-10 pb-10 pr-5 bg-primary border-rounded-12 cursor`}>
                                <img src='/images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                                <h5 className={`f-700 l-22 color-white`}>Save changes</h5>
                            </div>
                        </Link>
                        <Link href={`/Clients/${Id}`}>
                            <div className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-10 pb-10 pr-5 bg-lighter-gray border-rounded-12 cursor`}>
                                <img src='/images/eva_close-fill (2).svg' alt='close-icon'/>
                                <h5 className={`f-700 l-22 color-gray`}>Discard</h5>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={`col-7 col-md-8 col-lg-7 col-xxl-6 d-flex d-flex-column mb-full`}>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Status</h3>
                        <div className={`p-relative col-4 d-flex d-flex-column`}>
                            <div className={cls} onClick={()=>setIsActive(!isActive)}>
                                <h5>{selected}</h5> 
                                <img src='/images/entypo_chevron-down.svg' alt="chevron-down-icon"/> 
                            </div>
                            {isActive && (
                                <div className={`p-absolute mt-12 bg-lighter-gray border-rounded-12 col-12 d-flex d-flex-column d-align-center`}>
                                    {dropDownValues.map((item,index) =>(
                                    <div key={index} className={`col-12 cursor gap-2`} onClick={()=>{
                                        setSelected(item.value)
                                        setIsActive(false)
                                        setCls(item.class)}}>
                                        <h5 className={`font-normal f-700 l-22 p-2 color-black`}>{item.value}</h5>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>EMD</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='date' value={emd} onChange={emdHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Financing</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='date' value={financing} onChange={financingHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Appraisal</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='date' value={appraisal} onChange={appraisalHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Diligency</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='date' value={diligency} onChange={diligencyHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Title</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='text' placeholder='Enter title' value={title} onChange={titleHandler} />
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Amount</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='number' placeholder='$ Enter amount' value={amount} onChange={amountHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Seller</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='text' placeholder='Enter name' value={seller} onChange={sellerHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Seller's requested price</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='number' placeholder='$ Enter price' value={requestedPrice} onChange={requestedPriceHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Seller's Address</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='text' placeholder='Enter address' value={address} onChange={addressHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Buyer</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='text' placeholder='Enter name' value={buyer} onChange={buyerHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Purchase price</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='number' placeholder='$ Enter price' value={purchasePrice} onChange={purchasePriceHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row d-align-center mb-6`}>
                        <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Commision</h3>
                        <input className={`col-7 ml-6 color-gray pl-4 pt-1 pb-1 pr-4 font-normal f-400 font-20 l-28 color-gray border-rounded-4 border-light-gray`} type='number' placeholder='$ Enter amount' value={commision} onChange={commisionHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-row`}>
                        <h3 className={`col-5 f-700 l-28 color-black`}>Upload contract</h3>
                        <div className={`col-6 col-md-7`}>
                            <div onClick={(event)=>{
                            event.preventDefault();
                            fileInputRef.current.click();
                            }}>
                            {preview ? <img src={preview}/>:
                                <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-5 pb-5 bg-lighter-gray border-rounded-12`}>
                                    <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                                    <h5 className={`f-700 l-22 color-gray`}>Select or Drag the deliverables here</h5>
                                </div>}
                            </div>
                            <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={(event)=>{
                                const file = event.target.files[0];
                                if(file&& file.type.substr(0,5)=== "image"){
                                    setImage(file);
                                }else{
                                    setImage(null);
                                }
                            }}/>
                        </div>
                    </div>
                </div>
            </form>}
        <ToastContainer/>
    </>
  )
}

export default AddNewTransactionForm