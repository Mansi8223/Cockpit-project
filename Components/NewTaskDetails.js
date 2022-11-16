import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import {Avatar} from "@material-ui/core"
import Modal from './Modal';
import ModalContent from './ModalContent';
import RejectModal from './RejectModal'
import RejectModalContent from './RejectModalContent'
import AddNewField from './AddNewField';
import AddNewFieldContent from './AddNewFieldContent';
import NewItemModal from './NewItemModal'
import NewItemModalContent from './NewItemModalContent'
import EditTasksFields from './EditTasksFields';
import {getOnBoardFromCookie} from '../auth/userCookies';
import {useRouter} from 'next/router'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const dropDownValues=[
    {
      'value':'Unassigned',
      'class':'btn-status-gray'
    },
    {
      'value':'Not started',
      'class':'btn-status-red'
    },
    {
      'value':'in progress',
      'class':'btn-status-green'
    },
    {
      'value':'Completed',
      'class':'btn-status-blue'
    },
    {
      'value':'Req revision',
      'class':'btn-status-yellow'
    }
  ]
function NewTaskDetails() {
    const fileInputRef = useRef();
    const videoInputRef= useRef();
    const[url,setUrl]=useState("")
    const[date, setDate]=useState("")
    const[pre, setPre]=useState("")
    const[accept, setAccept]=useState(false)
    const[assign, setAssign]=useState(false)
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("Unassigned");
    const[cls, setCls]=useState('btn-status-gray');
    const[reject, setReject]=useState(false);
    const[edit, setEdit]=useState(false)
    const[open, setOpen]=useState(false)
    const[addItem, setAddItem]=useState(false)
    const[data, setData]=useState("")
    const[details, setDetails]=useState("")
    const[checklist, setChecklist]=useState("")
    const[activities, setActivities]=useState("")
    const[title, setTitle]=useState("")
    const[category, setCategory]=useState("")
    const[subCategory, setSubCategory]=useState("")
    const[description, setDescription]=useState("")
    const[showingLocation, setShowingLocation]=useState("")
    const[showingDetails, setShowingDetails]=useState("")
    const[newFields, setNewFields]=useState("")
    const[cl,setCl]=useState("")
    const[image,setImage]=useState(false)
    const[loading, setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    const router = useRouter();
    const Id = router.query["id"];
    useEffect(()=>{
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`http://34.209.233.51/api/task/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          // console.log(res)
          if(res.task){
            setTitle(res.task.taskDetails.title)
            setCategory(res.task.taskDetails.category)
            setSubCategory(res.task.taskDetails.subCategory)
            setDescription(res.task.taskDetails.taskDescription)
            setShowingLocation(res.task.taskDetails.showingLocation)
            setShowingDetails(res.task.taskDetails.showingDetails)
            setData(res.task);
            setDetails(res.task.taskDetails);
            setCl(res.task.taskDetails.checklist)
            setChecklist(res.task.taskDetails.checklist)
            setNewFields(res.task.taskDetails.addNewFields)
            setLoading(false)
        }
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
      
      fetch(`http://34.209.233.51/api/task/all-activities/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result =>{ 
          var res = JSON.parse(result);
          // console.log(res.activity)
          setActivities(res.activity)
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
        setAssign(prev => !prev)
    }
    const rejectHandler=()=>{
      setReject(prev => !prev);
    }
    const editHandler=()=>{
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`http://34.209.233.51/api/task/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          // console.log(res)
          if(res.task){
            setTitle(res.task.taskDetails.title)
            setCategory(res.task.taskDetails.category)
            setSubCategory(res.task.taskDetails.subCategory)
            setDescription(res.task.taskDetails.taskDescription)
            setShowingLocation(res.task.taskDetails.showingLocation)
            setShowingDetails(res.task.taskDetails.showingDetails)
            setData(res.task);
            setDetails(res.task.taskDetails);
            setCl(res.task.taskDetails.checklist)
            setChecklist(res.task.taskDetails.checklist)
            setNewFields(res.task.taskDetails.addNewFields)
            setEdit(true)
            setLoading(false)
        }
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
      const addNewHandler=()=>{
        setOpen(prev => !prev)
    }
    const getFieldHandler=(props)=>{
      var key = props.title
      var value = props.value
      const data={key,value}
      // console.log(data)
      if(key && value){
        setNewFields((ls)=>[...ls,data])
        toast.success("New field added",{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      })
      }
      
    }
    const checklistHandler=()=>{
      setAddItem(prev => !prev)
    }
    const getChecklistElement=(props)=>{
      var value = props.element
      const data = {value}
      if(value){
        setChecklist((cl)=>[...cl,data])
        toast.success("Element added",{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      
    }
    const acceptHandler=()=>{
      setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://34.209.233.51/api/task/approve-task/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            setAccept(true)
            setLoading(false)
            toast.success("Task accepted",{
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
    const timelineHandler=(e)=>{
      setLoading(true)
      e.preventDefault()
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("Content-Type", "application/json");
    
      var raw = JSON.stringify({
        "timeline": date
      });
    
      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    
      fetch(`http://34.209.233.51/api/task/add-timeline/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setDate("")
          setLoading(false)
          toast.success("Timeline added",{
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
    const titleHandler=(e)=>{
      setTitle(e.target.value)
    }
    const categoryHandler=(e)=>{
      setCategory(e.target.value)
    }
    const subCategoryHandler=(e)=>{
      setSubCategory(e.target.value)
    }
    const descriptionHandler=(e)=>{
      setDescription(e.target.value)
    }
    const showingLocationHandler=(e)=>{
      setShowingLocation(e.target.value)
    }
    const showingDetailsHandler=(e)=>{
      setShowingDetails(e.target.value)
    }
    const discardHandler=()=>{
      setEdit(false)
    }
    const submitHandler=(e)=>{
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "title": title,
        "category": category,
        "subCategory": subCategory,
        "taskDescription": description,
        "checklist":checklist,
        "showingLocation": showingLocation,
        "propertyPhoto": url,
        "showingDetails": showingDetails,
        "addNewFields": newFields
      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(`http://34.209.233.51/api/task/edit-task/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setEdit(false)
          setLoading(false)
          toast.success("Task edited",{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          setLoading(true)
          var myHeaders = new Headers();
          myHeaders.append("token", token);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
      
          fetch(`http://34.209.233.51/api/task/${Id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
              var res = JSON.parse(result);
              // console.log(res)
              if(res.task){
                setTitle(res.task.taskDetails.title)
                setCategory(res.task.taskDetails.category)
                setSubCategory(res.task.taskDetails.subCategory)
                setDescription(res.task.taskDetails.taskDescription)
                setShowingLocation(res.task.taskDetails.showingLocation)
                setShowingDetails(res.task.taskDetails.showingDetails)
                setData(res.task);
                setDetails(res.task.taskDetails);
                setCl(res.task.taskDetails.checklist)
                setChecklist(res.task.taskDetails.checklist)
                setNewFields(res.task.taskDetails.addNewFields)
                setLoading(false)
            }
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
const videoHandler=(e)=>{
  setLoading(true)
  const file = e.target.files[0];
  if(e.target.files[0].type.split('/')[0]==="image"){setImage(true)}
  // console.log(e.target.files[0])
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
          setPre(res.url)
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
const deliverableHandler=()=>{
  setLoading(true)
  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "deliverables": pre
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://34.209.233.51/api/task/add-deliverables/${Id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      // console.log(result)
      setPre("")
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

  return (
    <>
      {loading ? <Loader loading={loading}/>:
        <>
            <div className={`row col-12 d-flex d-flex-row gap-8 mt-12 ml-6 mb-full`}>
            {edit? <form className={`col-5 col-md-10 col-lg-10 col-xl-5 h-fit-content p-8 bg-white border-light-gray border-rounded-16 box-s`}>
              <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-6`}>
                <div className={`font-31 f-700 l-40`}>Task details</div>
                <div className={`d-flex d-flex-row d-align-center gap-3`}>
                  <div onClick={submitHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-2 pb-2 pr-5 bg-primary border-rounded-12 cursor`}>
                      <img src='/images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                      <h5 className={`f-700 l-22 color-white`}>Save</h5>
                  </div>
                  <div onClick={discardHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4  pt-2 pb-2 pr-5 bg-lighter-gray border-rounded-12 cursor`}>
                      <img src='/images/eva_close-fill (2).svg' alt='close-icon'/>
                      <h5 className={`f-700 l-22 color-gray`}>Discard</h5>
                  </div>
                </div>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Title of task</h3>
                <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={title} onChange={titleHandler}/>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Category</h3>
                <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={category} onChange={categoryHandler}/>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Sub-Category</h3>
                <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={subCategory} onChange={subCategoryHandler}/>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Task Description</h3>
                <textarea className={`col-7 h-80 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={description} onChange={descriptionHandler}/>
              </div>
              {newFields && newFields.map((item,index)=>(
                <div key={index+1} className={`col-12 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>{item.key}</h3>
                  <h3 className={`col-7 f-600 l-28 color-gray`}>{item.value}</h3>
                </div>
              ))}
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Checklist</h3>
                <div className={`col-7 d-flex d-flex-column gap-2`}>
                  {checklist && checklist.map((item,index)=>(
                      <div key={index} className={`d-flex d-flex-row d-align-start gap-2`}>
                        <img src='/images/feather_square.svg' alt='checkbox-icon'/>
                        <h3 className={`f-600 l-28 color-gray`}>{item.value}</h3>
                      </div>
                    ))}
                  <div onClick={checklistHandler} className={`d-flex d-flex-row gap-4 mt-1 cursor`}>
                        <img src='/images/eva_plus-fill (1).svg' alt='plus-icon'/>
                        <h3 className={`f-600 l-28 color-primary`}>New item</h3>
                  </div>
                </div>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Showing Location</h3>
                <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={showingLocation} onChange={showingLocationHandler}/>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Upload property photo</h3>
                <div className={`col-6`}>
                  <div onClick={(event)=>{
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}>
                    {url ? <div className={`p-relative d-flex d-flex-row d-align-end`}>
                      <img className={`p-relative deliverables`} src={url}/>
                      <div className={`p-absolute d-flex d-justify-center bg-white p-2 m-1 border-rounded-8`}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8336 16.6667H4.16691C3.9459 16.6667 3.73394 16.7545 3.57766 16.9108C3.42138 17.0671 3.33358 17.279 3.33358 17.5C3.33358 17.7211 3.42138 17.933 3.57766 18.0893C3.73394 18.2456 3.9459 18.3334 4.16691 18.3334H15.8336C16.0546 18.3334 16.2666 18.2456 16.4228 18.0893C16.5791 17.933 16.6669 17.7211 16.6669 17.5C16.6669 17.279 16.5791 17.0671 16.4228 16.9108C16.2666 16.7545 16.0546 16.6667 15.8336 16.6667ZM4.16691 15H4.24191L7.71691 14.6834C8.09758 14.6455 8.45361 14.4777 8.72525 14.2084L16.2252 6.70838C16.5163 6.40085 16.6737 5.99047 16.6627 5.56716C16.6518 5.14385 16.4735 4.74213 16.1669 4.45004L13.8836 2.16671C13.5856 1.88679 13.1951 1.72618 12.7864 1.71542C12.3776 1.70467 11.9792 1.84452 11.6669 2.10838L4.16691 9.60838C3.89755 9.88001 3.72983 10.236 3.69191 10.6167L3.33358 14.0917C3.32235 14.2138 3.33819 14.3368 3.37996 14.452C3.42174 14.5673 3.48842 14.6719 3.57525 14.7584C3.65311 14.8356 3.74546 14.8967 3.84699 14.9382C3.94852 14.9797 4.05724 15.0007 4.16691 15ZM12.7252 3.33338L15.0002 5.60838L13.3336 7.23338L11.1002 5.00004L12.7252 3.33338Z" fill="#2D2D2D"/>
                        </svg>
                      </div>
                    </div>:
                    <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-7 pb-7 bg-lighter-gray border-rounded-12`}>
                      <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                      <h5 className={`f-700 l-22 color-gray`}>Select files</h5>
                    </div>}
                  </div>
                  <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef}  onChange={fileHandler}/>
                </div>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Showing Details</h3>
                <textarea className={`col-7 h-80 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={showingDetails} onChange={showingDetailsHandler}/>
              </div>
              <div className={`col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-7 d-flex d-flex-row gap-12`}>
                <div className={`col-5`}></div>
                <div onClick={addNewHandler} className={`col-7 d-flex d-flex-row d-align-center d-justify-center pt-3 pb-3 bg-secondary border-primary border-rounded-8`}>
                    <img src='/images/eva_plus-fill (1).svg' alt='plus-icon'/>
                    <h5 className={`font-normal f-700 l-22 color-primary`}>Add new field</h5>
                </div>
              </div>
            </form>
          :<div className={`col-5 col-md-10 col-lg-10 col-xl-5 h-fit-content p-8 bg-white border-light-gray border-rounded-16 box-s`}>
              <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-6`}>
                <div className={`col-6 font-31 f-700 l-40`}>Task details</div>
                <div onClick={editHandler} className={`col-3 col-lg-2 col-xl-4 col-xxl-3 d-flex d-flex-row d-align-center d-justify-center gap-3 bg-secondary border-rounded-12`}>
                  <img src='/images/eva_edit-2-fill.svg' alt='edit-icon'/>
                  <h5 className={`f-700 l-22 color-primary`}>Edit details</h5>
                </div>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Title of task</h3>
                <h3 className={`col-7 f-600 l-28 color-gray`}>{details.title}</h3>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Category</h3>
                <h3 className={`col-7 f-600 l-28 color-gray`}>{details.category}</h3>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Sub-category</h3>
                <h3 className={`col-7 f-600 l-28 color-gray`}>{details.subCategory}</h3>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Task Description</h3>
                <h3 className={`col-7 f-600 l-28 color-gray`}>{details.taskDescription}</h3>
              </div>
              {newFields && newFields.map((item,index)=>(
                <div key={index+1} className={`col-12 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>{item.key}</h3>
                  <h3 className={`col-7 f-600 l-28 color-gray`}>{item.value}</h3>
                </div>
              ))}
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Checklist</h3>
                <div className={`col-7 d-flex d-flex-column gap-2`}>
                  {cl && cl.map((item,index)=>(
                    <div key={index} className={`d-flex d-flex-row d-align-start gap-2`}>
                      <img src='/images/feather_square.svg' alt='checkbox-icon'/>
                      <h3 className={`f-600 l-28 color-gray`}>{item.value}</h3>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Showing Location</h3>
                <h3 className={`col-7 f-600 l-28 color-gray`}>{details.showingLocation}</h3>
              </div>
              {details.propertyPhoto && <div className={`col-12 d-flex d-flex-row mb-6`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Upload property photo</h3>
                <img className={`deliverables`} src={details.propertyPhoto}/>
                {/* <div className={`col-6`}>
                  <div onClick={(event)=>{
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}>
                    {url ? <img className={`deliverables`} src={url}/>:
                    <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-7 pb-7 bg-lighter-gray border-rounded-12`}>
                      <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                      <h5 className={`f-700 l-22 color-gray`}>Select files</h5>
                    </div>}
                  </div>
                  <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef}  onChange={fileHandler}/>
                </div> */}
              </div>}
              <div className={`col-12 d-flex d-flex-row`}>
                <h3 className={`col-5 f-700 l-28 color-black`}>Showing Details</h3>
                <h3 className={`col-7 f-600 l-28 color-gray`}>{showingDetails}</h3>
              </div>
            </div>}
                {accept ? <div className={`col-5 col-md-10 col-lg-10 col-xl-5 d-flex d-flex-column gap-8`}>
                    <div className={`col-12 d-flex d-flex-column p-8 bg-white border-light-gray border-rounded-16 box-s`}>
                        <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between mb-6`}>
                            <div className={`col-7 mr-5 font-31 f-700 l-40`}>Assignees & Timeline</div>
                            <div className={`col-7 col-md-5 col-lg-4 col-xl-7 d-flex d-flex-row d-align-center`}>
                              <h3 className={`ml-12 mr-5 f-600 l-20`}>Status:</h3>
                              {data.taskType&&data.taskType==="Virtual-assistant"?<div className={`col-12 p-relative d-flex d-flex-column`}>
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
                            </div>:
                              <>{data.status==="Unassigned"&&<button className={`btn-status-gray pl-5 pt-2 pb-2 pr-5`}>{data.status}</button>}
                                {data.status==="Not-started"&&<button className={`btn-status-red pl-5 pt-2 pb-2 pr-5`}>{data.status}</button>}
                                {data.status==="In-progress"&&<button className={`btn-status-green pl-5 pt-2 pb-2 pr-5`}>{data.status}</button>}
                                {data.status==="Completed"&&<button className={`btn-status-blue pl-5 pt-2 pb-2 pr-5`}>{data.status}</button>}
                                {data.status==="Request-revision"&&<button className={`btn-status-yellow pl-5 pt-2 pb-2 pr-5`}>{data.status}</button>}
                              </>
                              }
                            </div>
                        </div>
                        <div className={`col-12 d-flex d-flex-row mb-6`}>
                            <h3 className={`col-5 f-700 l-28 color-black`}>Assigned by</h3>
                            {data.assignedBy && <div className={`w-fit-content d-flex d-flex-row d-align-center gap-3 bg-secondary pl-3 pt-3 pr-4 pb-3 border-rounded-12`}>
                              <Avatar src={data.assignedBy.user.image}/>
                              <div className={`d-flex d-flex-column`}>
                                <h5 className={`f-700 l-22`}>{data.assignedBy.user.name}</h5>
                                <span className={`font-13 f-700 l-18 color-gray`}>{data.assignedBy.user.userType}</span>
                              </div>
                            </div>}
                        </div>
                        <div className={`col-12 d-flex d-flex-row mb-6`}>
                            <h3 className={`col-5 f-700 l-28 color-black`}>Assignees</h3>
                            {data.assignee?
                              <div className={`w-fit-content d-flex d-flex-row d-align-center gap-3 bg-secondary pl-3 pt-3 pr-4 pb-3 border-rounded-12`}>
                                <Avatar src={data.assignee.user.image}/>
                                <div className={`d-flex d-flex-column`}>
                                  <h5 className={`f-700 l-22`}>{data.assignee.user.name}</h5>
                                  <span className={`font-13 f-700 l-18 color-gray`}>{data.assignee.assistantType} ass.</span>
                                </div>
                              </div>
                              :<div onClick={modalHandler} className={`w-fit-content d-flex d-flex-row d-align-center gap-3 bg-lighter-gray pl-3 pt-3 pr-4 pb-3 border-rounded-12 cursor`}> 
                                <img src='/images/group-18.svg' alt='add-icon'/>
                                <h5 className={`f-700 l-22 color-gray`}>Assign person</h5>
                              </div>
                            }
                        </div>
                        <div className={`col-12 d-flex d-flex-row mb-6`}>
                          <h3 className={`col-5 f-700 l-28 color-black`}>Timeline</h3>
                          {date?<div className={`col-7 d-flex d-flex-row d-align-start gap-2`}>
                            <h3 className={`col-xl-7 col-xxl-8 font-normal f-600 l-28 color-gray`}>Due on {date}</h3>
                            <button onClick={timelineHandler} className={`border-none font-normal font-16 f-600 l-28 color-primary bg-secondary border-rounded-8 cursor`}>save date</button>
                          </div>:
                            <input className={`col-3 col-md-2 col-xl-4 col-xxl-3 bg-lighter-gray border-none pl-4 pr-3 d-flex border-circle`} type='date' name='date-time' value={date} onChange={(e)=>setDate(e.target.value)}/>}
                        </div>
                        <div className={`col-12 d-flex d-flex-row`}>
                            <h3 className={`col-5 f-700 l-28 color-black`}>Deliverables</h3>
                            <h3 className={`col-7 f-600 l-28 color-gray`}>Video files showcasing clients and house</h3>
                        </div>
                        <div className={`col-12 d-flex d-flex-row mt-6`}>
                          <h3 className={`col-5 f-700 l-28 color-black`}>Upload deliverables</h3>
                          <div className={`col-5 col-xl-6 col-xxl-5`}>
                            <div className={`col-12`} >
                              <div onClick={(event)=>{
                                event.preventDefault();
                                videoInputRef.current.click();
                              }}>
                                {pre ?<> 
                                    {image?<img className={`deliverables`} src={pre}/>:<video className={`deliverables`} src={pre}/>}
                                  </>:
                                <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-3 pb-3 bg-lighter-gray border-rounded-12`}>
                                  <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                                  <h5 className={`f-700 l-22 color-gray`}>Select files</h5>
                                </div>}
                              </div>
                              <input type="file" name='video' style={{display: 'none'}} ref={videoInputRef} onChange={videoHandler}/>
                            </div>
                            {pre&&<button onClick={deliverableHandler} className={`border-none font-normal font-16 f-600 l-28 color-primary bg-secondary border-rounded-8 cursor`}>Upload</button>}
                          </div>
                        </div>
                    </div>
                    <div className={`col-12 d-flex d-flex-column p-8 bg-white border-light-gray border-rounded-16 box-s`}>
                        <div className={`font-31 f-700 l-40 mb-6`}>Activity</div>
                        {/* <h3 className={`f-700 l-28 color-gray`}>No activity available</h3> */}
                        <div className={`col-12 d-flex d-flex-column-reverse`}>
                          {activities && activities.map((item,index)=>(
                            <div key={index+1} className={`d-flex d-flex-column d-align-start gap-4 p-4 mb-6 bg-white border-rounded-12 box-s`}>
                              <div className={`d-flex d-flex-row gap-2`}>
                                {item.activityType && item.activityType==="assigned" && <img src='/images/feather_plus-circle.svg' alt='plus-circle-icon'/>}
                                {item.activityType && item.activityType==="deadline" && <img src='/images/eva_clock-fill.svg' alt='clock-icon'/>}
                                {item.activityType && item.activityType==="completed" && <img src='/images/eva_checkmark-circle-2-fill.svg' alt='checkmark-icon'/>}
                                {item.activityType && item.activityType==="request" && <img src='/images/eva_question-mark-circle-fill.svg' alt='question-mark-icon'/>}
                                {item.activityType && item.activityType==="started" && <img src='/images/feather_play-circle.svg' alt='play-icon'/>}
                                <h3 className={`f-700 l-28`}>{item.activity} Jake Mentose</h3>
                              </div>
                              <h5 className={`f-700 l-22 color-gray`}>{item.date.split("GMT")[0].replace(" ",",").split(",")[1].replace(" ",",")}</h5>
                            </div>
                          ))}
                        </div>
                    </div>
                </div>:
                <div className={`col-5 col-md-10 col-lg-10 col-xl-5 d-flex d-flex-column gap-8`}>
                    <div className={`col-12 d-flex d-flex-row d-align-center gap-4 p-8 bg-white border-light-gray border-rounded-16 box-s`}>
                        <h2 className={`col-6 f-700 l-28`}>Do you approve this task?</h2>
                        <div className={`col-6 col-lg-5 col-xl-7 col-xxl-6 d-flex d-flex-row gap-2`}>
                            <button onClick={acceptHandler} className={`col-6 d-flex d-flex-row d-align-center d-justify-center gap-2 pt-4 pb-4 border-none bg-green color-white font-normal font-16 f-700 l-22 border-circle`}><img src="/images/eva_checkmark-fill.svg" alt="approve-icon"/>Approve</button>
                            <button onClick={rejectHandler} className={`col-6 d-flex d-flex-row d-align-center d-justify-center gap-3 pt-4 pb-4 border-none bg-red color-white font-normal font-16 f-700 l-22 border-circle`}><img src='/images/eva_close-fill.svg' alt='close-icon'/>Deny</button>
                        </div>
                    </div>
                    <div className={`col-12 d-flex d-flex-column p-8 bg-white border-light-gray border-rounded-16 box-s`}>
                        <div className={`font-31 f-700 l-40 mb-6`}>Assignees & Timeline</div>
                        <div className={`col-12 d-flex d-flex-row mb-6`}>
                            <h3 className={`col-5 f-700 l-28 color-black`}>Assigned by</h3>
                            {data.assignedBy && <div className={`w-fit-content d-flex d-flex-row d-align-center gap-3 bg-secondary pl-3 pt-3 pr-4 pb-3 border-rounded-12`}>
                                <Avatar src={data.assignedBy.user.image}/>
                                <div className={`d-flex d-flex-column`}>
                                    <h5 className={`f-700 l-22`}>{data.assignedBy.user.name}</h5>
                                    <span className={`font-13 f-700 l-18 color-gray`}>{data.assignedBy.user.userType}</span>
                                </div>
                            </div>}
                        </div>
                        <div className={`col-12 d-flex d-flex-row`}>
                            <h3 className={`col-5 f-700 l-28 color-black`}>Deliverables</h3>
                            <h3 className={`col-7 f-600 l-28 color-gray`}>Video files showcasing clients and house</h3>
                        </div>
                    </div>
                </div>}
            </div>
            {assign && <Modal modalClass="modal-verify">
                <ModalContent handler={modalHandler} id={Id} title={data.taskName}></ModalContent>
            </Modal>}
            {reject && <RejectModal modalClass="modal-verify">
                <RejectModalContent handler={rejectHandler} id={Id}></RejectModalContent>
            </RejectModal>}
            {addItem && <NewItemModal modalClass="modal-verify">
                <NewItemModalContent handler={checklistHandler} dataHandler={getChecklistElement}></NewItemModalContent>
            </NewItemModal> }
            {open && <AddNewField modalClass="modal-verify">
                <AddNewFieldContent handler={addNewHandler} dataHandler={getFieldHandler}></AddNewFieldContent>
          </AddNewField> }
        </>
      }
      <ToastContainer/>
    </>
  )
}

export default NewTaskDetails