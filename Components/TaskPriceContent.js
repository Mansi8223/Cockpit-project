import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AddPriceModal from './AddPriceModal'
import AddPriceModalContent from './AddPriceModalContent'
import {getOnBoardFromCookie} from '../auth/userCookies';
import UpdateModal from './UpdateModal'
import UpdateModalContent from './UpdateModalContent'
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskPriceContent() {
  const[addTaskActive, setAddTaskActive]=useState(false)
  const[addBoostActive, setAddBoostActive]=useState(false)
  const[taskPrice, setTaskPrice]=useState("")
  const[boostPrice, setBoostPrice]=useState("")
  const[update, setUpdate]=useState(false)
  const[id, setId]=useState("")
  const[title, setTitle]=useState("")
  const[amount, setAmount]=useState("")
  const[loading,setLoading]=useState(false)
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

    fetch("http://34.209.233.51/api/taskPrice/task-price/get-all", requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        var res = JSON.parse(result);
        // console.log(res.taskprices)
        setTaskPrice(res.taskprices)
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
      
      fetch("http://34.209.233.51/api/taskPrice/boost-price/get-all", requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          // console.log(res.allBoostPrice)
          setBoostPrice(res.allBoostPrice)
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
  const taskModalHandler=()=>{
    setAddTaskActive(prev => !prev)
  }
  const taskDataHandler=(props)=>{
    setLoading(true)
    if(props.title && props.amount){
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "title": props.title,
      "amount": props.amount,
      "chargedHourly": props.check
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://34.209.233.51/api/taskPrice/task-price/add", requestOptions)
      .then(response => response.text())
      .then(result => {
        setLoading(false)
        toast.success("Task price added",{
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
  const boostModalHandler=()=>{
    setAddBoostActive(prev => !prev)
  }
  const boostDataHandler=(props)=>{
    setLoading(true)
    if(props.title && props.amount){ 
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "title": props.title,
        "amount": props.amount,
        "chargedHourly": props.check
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://34.209.233.51/api/taskPrice/boost-price/add", requestOptions)
        .then(response => response.text())
        .then(result => {
          setLoading(false)
          toast.success("Boost Price Added",{
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
  const updateHandler=()=>{
    setUpdate(prev => !prev)
  }
  return (
    <>
      {loading?<Loader loading={loading}/>:
        <>
          <div className={`col-6 col-md-9 col-lg-8 col-xl-7 col-xxl-6 d-flex d-flex-column d-align-center gap-6 ml-12 mt-12 mb-full`}>
            <div className='col-12 d-flex d-flex-column d-align-start bg-white border-rounded-16 h-fit-content p-8 ml-12'>
              <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-8`}>
                <span className={`font-31 f-700 l-40 color-black`}>Task Price</span>
                <div onClick={taskModalHandler} className={`col-2 col-md-3 addNew d-flex d-flex-row d-align-center d-justify-center gap-4 bg-primary border-rounded-12 cursor`}>
                  <img src='images/eva_plus-fill.png' alt='plus-icon'/>
                  <h5 className={` font-normal f-700 l-22 color-white`}>Add new</h5>
                </div>
              </div>
              {taskPrice && taskPrice.map((item,index)=>(
                <div key={index+1} className={`col-11 d-flex d-flex-column gap-4 bg-white box-s border-rounded-12 p-8 mb-6`}>
                  <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                    <h2 className={`font-normal f-700 l-28 color-gray`}>{item.title}</h2>
                    <h2 className={`font-normal f-700 l-28 color-black`}>${item.amount}</h2>
                  </div>
                  <div onClick={()=>{
                    setId(item._id) 
                    setTitle(item.title)
                    setAmount(item.amount)
                    setUpdate(true);}} className={`col-3 d-flex d-flex-row d-align-center d-justify-center pt-2 pb-2 gap-3 bg-secondary border-rounded-12`}>
                    <img src="images/eva_edit-2-fill.svg"/>
                    <h5 className={`font-normal f-700 l-22 color-primary`}>Update price</h5>
                  </div>
                </div>))}
            </div>
            <div className={`col-12 d-flex d-flex-column d-align-start bg-white border-rounded-16 h-fit-content p-8 ml-12`}>
              <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-8`}>
                <span className={`font-31 f-700 l-40 color-black`}>Boost Price</span>
                <div onClick={boostModalHandler} className={`col-2 col-md-3 addNew  d-flex d-flex-row d-align-center d-justify-center gap-4 bg-primary border-rounded-12 cursor`}>
                  <img src='images/eva_plus-fill.png' alt='plus-icon'/>
                  <h5 className={`font-normal f-700 l-22 color-white`}>Add new</h5>
                </div>
              </div>
              {boostPrice && boostPrice.map((item,index)=>(
                <div key={index+1} className={`col-11 d-flex d-flex-column gap-4 bg-white box-s border-rounded-12 p-8 mb-6`}>
                  <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                    <h2 className={`font-normal f-700 l-28 color-gray`}>{item.title}</h2>
                    <h2 className={`font-normal f-700 l-28 color-black`}>{item.amount}/per hour</h2>
                  </div>
                  <div onClick={()=>{
                    setId(item._id) 
                    setTitle(item.title)
                    setAmount(item.amount)
                    setUpdate(true);}} className={`col-3 d-flex d-flex-row d-align-center d-justify-center pt-2 pb-2 gap-3 bg-secondary border-rounded-12`}>
                    <img src="images/eva_edit-2-fill.svg"/>
                    <h5 className={`font-normal f-700 l-22 color-primary`}>Update price</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {addTaskActive && <AddPriceModal>
            <AddPriceModalContent handler={taskModalHandler} dataHandler={taskDataHandler}></AddPriceModalContent>
          </AddPriceModal>}
          {addBoostActive && <AddPriceModal>
            <AddPriceModalContent handler={boostModalHandler} dataHandler={boostDataHandler}></AddPriceModalContent>
          </AddPriceModal>}
          {update && <UpdateModal>
              <UpdateModalContent handler={updateHandler} id={id} title={title} amount={amount}></UpdateModalContent>
            </UpdateModal>}
        </>}
    </>
  )
}
 
export default TaskPriceContent