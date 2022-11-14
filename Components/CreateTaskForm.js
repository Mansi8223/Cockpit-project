import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import AddChecklistModal from './AddChecklistModal';
import AddChecklistModalContent from './AddChecklistModalContent';
import AddNewModal from './AddNewModal';
import AddNewModalContent from './AddNewModalContent';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Link from 'next/link';
import AddAssigneeModalContent from './AddAssigneeModalContent';
import AddAssigneeModal from './AddAssigneeModal'
import {Avatar} from "@material-ui/core"
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateTaskForm() {
  const fileInputRef = useRef();
  const[url, setUrl]=useState("")
  const[assigneCheck, setAssigneCheck]=useState(false)
  const[addressCheck, setAddressCheck]=useState(false)
  const[isActive, setIsActive]=useState(false);
  const[selected, setSelected]=useState("Select")
  const[isActive1, setIsActive1]=useState(false);
  const[selected1, setSelected1]=useState("Select")
  const[assign, setAssign]=useState(false)
  const[checklist, setChecklist]=useState([])
  const[addChecklist, setAddChecklist]=useState(false)
  const[addNew, setAddNew]=useState(false)
  const[list, setList]=useState([])
  const[title, setTitle]=useState("")
  const[category, setCategory]=useState("Select")
  const[subCategory, setSubCategory]=useState("")
  const[description, setDescription]=useState("")
  const[address, setAddress]=useState("")
  const[taskPrice, setTaskPrice]=useState([])
  const[type, setType]=useState("")
  const[boostPrice, setBoostPrice]=useState([])
  const[boost, setBoost]=useState("")
  const[id, setId]=useState("")
  const[assigneeName, setAssigneeName]=useState("")
  const[assigneeType, setAssigneeType]=useState("")
  const[profile,setProfile]=useState("")
  const[loading,setLoading]=useState(false)
  const[isOpen, setOpen]=useState(false)
  const categories = ["Transaction","Field Activity","Virtual tasks"]
  const[active, setActive]=useState(false)
  const[taskType, setTaskType]=useState("Select")
  const taskTypeArray = ["Virtual-assistant","Showing-assistant"]
 
  useEffect(()=>{
    setLoading(true)
    var token = getOnBoardFromCookie()
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://34.209.233.51/api/taskPrice/task-price/get-all", requestOptions)
      .then(response => response.text())
      .then(result => {
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
  
  const titleHandler=(e)=>{
    setTitle(e.target.value)
  }
  const subCategoryHandler=(e)=>{
    setSubCategory(e.target.value)
  }
  const descriptionHandler=(e)=>{
    setDescription(e.target.value)
  }
  const addressHandler=(e)=>{
    setAddress(e.target.value)
  }
  const modalHandler=()=>setAssign(prev => !prev)
  const addAssigneeDataHandler = (item)=>{
    console.log(item.user)
    if(item){
      setId(item._id)
      setAssigneeName(item.user.name)
      setAssigneeType(item.user.userType)
      setProfile(item.user.image)
    }
  }
  const assigneCheckHandler=()=>{
    setAssigneCheck(prev => !prev)
  }
  const addressCheckHandler=()=>{
    setAddressCheck(prev => !prev)
  }
  const checkListHandler=()=>{
    setAddChecklist(prev => !prev)
  }
  const checkListDataHandler=(props)=>{
    var value = props.element
    const data = {value}
    // console.log(data)
    if(value){
      setChecklist((cl)=>[...cl,data])
    }
  }
  const addNewHandler=()=>{
    setAddNew(prev => !prev)
  }
  const addNewDataHandler=(props)=>{
    var key = props.title
    var value = props.value
    const data={key,value}
    // console.log(data)
    if(key && value){setList((ls)=>[...ls,data])}
  }
  const submitHandler=(e)=>{
    setLoading(true)
    e.preventDefault()
    var token = getOnBoardFromCookie()
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "title": title,
      "taskType": taskType,
      "taskPrice": type,
      "category": category,
      "subcategory": subCategory,
      "boostPrice": boost,
      "assignee": id,
      "taskDescription": description,
      "checklist": checklist,
      "propertyPhoto": url,
      "address": address,
      "preDefinedAssignee": assigneCheck,
      "addAddress": addressCheck,
      "addNewFields": list
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://34.209.233.51/api/task/create-task", requestOptions)
      .then(response => response.text())
      .then(result => {
        setTitle("")
        setCategory("")
        setSubCategory("")
        setDescription("")
        setAddress("")
        setChecklist([])
        setList([])
        setUrl("")
        setLoading(false)
        toast.success("Task added",{
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
  const fileHandler=(e)=>{
    setLoading(true)
    const file = e.target.files[0];
    // console.log(e.target.files[0])
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
          <form className={`col-10 ml-12 mt-12 mb-full h-fit-content p-10 bg-white border-light-gray border-rounded-16 box-s`}>
            <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-6`}>
              <span className={`col-6 font-31 f-700 l-40`}>Create new task</span>
              <div className={`d-flex d-flex-row gap-3`}>
                <div onClick={submitHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-10 pb-10 pr-5 bg-primary border-rounded-12 cursor`}>
                  <img src='images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                  <h5 className={`f-700 l-22 color-white`}>Save changes</h5>
                </div>
                <Link href='/TaskWrapper'>
                  <div className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-10 pb-10 pr-5 bg-lighter-gray border-rounded-12 cursor`}>
                    <img src='images/eva_close-fill (2).svg' alt='close-icon'/>
                    <h5 className={`f-700 l-22 color-gray`}>Discard</h5>
                  </div>
                </Link>
              </div>
            </div>
            <div className={`col-12 d-flex d-flex-column gap-6`}>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-center`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Title of task</h3>
                <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} type='text' placeholder='Enter text' value={title} onChange={titleHandler}/>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-center`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Task type</h3>
                <div className={`col-7 p-relative d-flex d-flex-column d-align-center bg-white pr-1`}>
                  <div className={`col-12 p-relative d-flex d-flex-row d-align-center d-justify-space-between pl-4 pt-3 pb-3 border-light-gray border-rounded-4 bg-white`}onClick={()=>setActive(!active)}>
                    <h3 className={`font-normal f-400 l-28 color-gray`}>{taskType}</h3> 
                    <img className={`mr-5`} src='images/entypo_chevron-down (1).svg' alt='chevron-down'/> 
                  </div>
                  {active && (
                    <div className={`p-absolute z-index-popup col-12 d-flex d-flex-column d-align-center mt-popup border-rounded-12 bg-white`}>
                      {taskTypeArray.map((item,index) =>(
                      <div key={index} className={`col-11 d-flex d-justify-center p-2 font-20 f-400 l-28 color-gray border-bottom-gray bg-white cursor transition`} onClick={()=>{
                        setTaskType(item)
                        setActive(false)}}>
                        {item}
                      </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-center`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Category</h3>
                <div className={`col-7 p-relative d-flex d-flex-column d-align-center bg-white pr-1`}>
                  <div className={`col-12 p-relative d-flex d-flex-row d-align-center d-justify-space-between pl-4 pt-3 pb-3 border-light-gray border-rounded-4 bg-white`}onClick={()=>setOpen(!isOpen)}>
                    <h3 className={`font-normal f-400 l-28 color-gray`}>{category}</h3> 
                    <img className={`mr-5`} src='images/entypo_chevron-down (1).svg' alt='chevron-down'/> 
                  </div>
                  {isOpen && (
                    <div className={`p-absolute z-index-popup col-12 d-flex d-flex-column d-align-center mt-popup border-rounded-12 bg-white`}>
                      {categories.map((item,index) =>(
                      <div key={index} className={`col-11 d-flex d-justify-center p-2 font-20 f-400 l-28 color-gray border-bottom-gray bg-white cursor transition`} onClick={()=>{
                        setCategory(item)
                        setOpen(false)}}>
                        {item}
                      </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-center`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Sub-category</h3>
                <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} type='text' placeholder='Enter text' value={subCategory} onChange={subCategoryHandler}/>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-start`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Task Description</h3>
                <textarea className={`col-7 h-100px color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} type='text' placeholder='Enter text' value={description} onChange={descriptionHandler}/>
              </div>
              {
                list && list.map((l,index)=>(
                  <div key={index} className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>{l.key}</h3>
                    <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={l.value} type='text' placeholder='Enter text'/>
                  </div>
                ))
              }
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-start`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Task type(for price)</h3>
                <div className={`col-7 p-relative d-flex d-flex-column d-align-center bg-white pr-1`}>
                  <div className={`col-12 p-relative d-flex d-flex-row d-align-center d-justify-space-between pl-4 pt-3 pb-3 border-light-gray border-rounded-4 bg-white`}onClick={()=>setIsActive(!isActive)}>
                    <h3 className={`font-normal f-400 l-28 color-gray`}>{selected}</h3> 
                    <img className={`mr-5`} src='images/entypo_chevron-down (1).svg' alt='chevron-down'/> 
                  </div>
                  {isActive && (
                    <div className={`p-absolute z-index-popup col-12 d-flex d-flex-column d-align-center mt-popup border-rounded-12 bg-white`}>
                      {taskPrice.map((type,index) =>(
                      <div key={index} className={`col-11 d-flex d-justify-center p-2 font-20 f-400 l-28 color-gray border-bottom-gray bg-white cursor transition`} onClick={()=>{
                        setSelected(type.title)
                        setType(type._id)
                        setIsActive(false)}}>
                        {type.title}
                      </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-start `}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Boost Price</h3>
                <div className={`col-7 p-relative d-flex d-flex-column d-align-center bg-white pr-1`}>
                  <div className={`col-12 p-relative d-flex d-flex-row d-align-center d-justify-space-between pl-4 pt-3 pb-3 border-light-gray border-rounded-4 bg-white`} onClick={()=>setIsActive1(!isActive1)}>
                    <h3 className={`font-normal f-400 l-28 color-gray`}>{selected1}</h3> 
                    <img className={`mr-5`} src='images/entypo_chevron-down (1).svg' alt='chevron-down'/> 
                  </div>
                  {isActive1 && (
                    <div className={`p-absolute z-index-popup col-12 d-flex d-flex-column d-align-center mt-popup border-rounded-12 bg-white`}>
                      {boostPrice.map((a,index)=>(
                      <div key={index} className={`col-11 d-flex d-justify-center p-2 font-20 f-400 l-28 color-gray border-bottom-gray cursor transition`} onClick={()=>{
                        setSelected1(a.title)
                        setBoost(a._id)
                        setIsActive1(false)}}>
                        {a.title}
                      </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={`col-8 col-md-11 col-lg-10 col-xxl-9 d-flex d-flex-row d-align-start`}>
                <h3 className={`col-4 font-normal f-700 l-28 color-black`}>Checklist</h3>
                <div className={`col-7 d-flex d-flex-column gap-4`}>
                  {
                    checklist && checklist.map((c,index)=>(
                      <div key={index} className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between`}>
                        <div className={`col-8 col-md-7 col-lg-8 d-flex d-flex-row d-align-start gap-2`}>
                          <img src='images/feather_square.svg' alt='checkbox-icon'/>
                          <h3 className={`word-break f-600 l-28 color-gray`}>{c.value}</h3>
                        </div> 
                        <h5 className={`col-4 col-md-5 col-lg-4 col-xxl-4 d-flex d-justify-center font-normal f-700 l-22 color-primary pt-1 pb-1 bg-secondary border-rounded-8 `}>Mark as milestone</h5>
                      </div>
                    ))
                  }
                  <div onClick={checkListHandler} className={`d-flex d-flex-row gap-4 cursor`}>
                    <img src='images/eva_plus-fill (1).svg' alt='plus-icon'/>
                    <h3 className={`f-600 l-28 color-primary`}>New item</h3>
                  </div>
                </div>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Add task image</h3>
                <div className={`col-6 col-md-7 col-lg-6`}>
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
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-start`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Set predefined assignee</h3>
                <div className={`col-7 d-flex d-flex-column gap-4`}>
                  <label className={`switch`}>
                    <input type='checkbox' onChange={assigneCheckHandler}/>
                    <span className={`slider`}/>
                  </label>
                  {assigneeName?<div className={`w-fit-content d-flex d-flex-row d-align-center gap-3 bg-secondary pl-3 pt-3 pr-4 pb-3 border-rounded-12`}>
                    <Avatar src={profile}/>
                    <div className={`d-flex d-flex-column`}>
                      <h5 className={`f-700 l-22`}>{assigneeName}</h5>
                      <span className={`font-13 f-700 l-18 color-gray`}>{assigneeType}</span>
                    </div>
                  </div>:
                  <div onClick={modalHandler} className={`w-fit-content d-flex d-flex-row d-align-center gap-3 bg-lighter-gray pl-3 pt-3 pr-4 pb-3 border-rounded-12 cursor`}> 
                    <img src='images/group-18.svg' alt='add-icon'/>
                    <h5 className={`f-700 l-22 color-gray`}>Assign person</h5>
                  </div>}
                </div>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-start`}>
                <h3 className={`col-5 font-normal f-700 l-28 color-black`}>Add address</h3>
                <div className={`col-7 d-flex d-flex-column gap-4`}>
                  <label className={`switch`}>
                    <input type='checkbox' onChange={addressCheckHandler}/>
                    <span className={`slider`}/>
                  </label>
                  {addressCheck && <textarea className={`col-11 h-100px color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} type='text' value={address} placeholder='Enter text' onChange={addressHandler}/>}
                </div>
              </div>
              <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row`}>
                <div className={`col-5`}></div>
                <div onClick={addNewHandler} className={`col-7 d-flex d-flex-row d-align-center d-justify-center pt-3 pb-3 bg-secondary border-primary border-rounded-8`}>
                  <img src='images/eva_plus-fill (1).svg' alt='plus-icon'/>
                  <h5 className={`font-normal f-700 l-22 color-primary`}>Add new field</h5>
                </div>
              </div>
            </div>
          </form>
          {assign && <AddAssigneeModal modalClass="modal-verify">
            <AddAssigneeModalContent handler={modalHandler} dataHandler={addAssigneeDataHandler}></AddAssigneeModalContent>
          </AddAssigneeModal>}
          {addChecklist && <AddChecklistModal modalClass="modal-verify">
            <AddChecklistModalContent handler={checkListHandler} dataHandler={checkListDataHandler}></AddChecklistModalContent>
          </AddChecklistModal>}
          {addNew && <AddNewModal modalClass="modal-verify">
            <AddNewModalContent handler={addNewHandler} dataHandler={addNewDataHandler}></AddNewModalContent>
          </AddNewModal>}
        </>}
        <ToastContainer/>
    </>
  )
}

export default CreateTaskForm