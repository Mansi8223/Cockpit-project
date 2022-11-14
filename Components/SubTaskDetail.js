import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import AddNewField from './AddNewField';
import AddNewFieldContent from './AddNewFieldContent';
import {useRouter} from 'next/router'
import {getOnBoardFromCookie} from '../auth/userCookies';
import NewItemModal from './NewItemModal'
import NewITemModalContent from './NewItemModalContent'
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const option=[
    {
      'title':'Title of task',
      'value':'Task title'
    },
    {
        'title':'Category',
        'value':'Create Offer'
    },
    {
        'title':'Sub-category',
        'value':'Offer'
    },
    {
        'title':'Task Description',
        'value':'One of the most important thing you can do is write a great offer. Please provide us the details for the contract of your clients desires'
    },
  ]
function SubTaskDetail() {
    const fileInputRef = useRef();
    const[url,setUrl]=useState("")
    const[assign, setAssign]=useState(false)
    const[edit, setEdit]=useState(false)
    const[open, setOpen]=useState(false)
    const[addItem, setAddItem]=useState(false)
    const[checklist, setChecklist]=useState("")
    const[title, setTitle]=useState("")
    const[subCategory, setSubCategory]=useState("")
    const[description, setDescription]=useState("")
    const[showingLocation, setShowingLocation]=useState("")
    const[showingDetails, setShowingDetails]=useState("")
    const[newFields, setNewFields]=useState("")
    const[cl,setCl]=useState("")
    const[propertyPhoto,setPropertyPhoto]=useState("")
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
        
        fetch(`http://34.209.233.51/api/subTask/${Id}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            var res = JSON.parse(result);
            // console.log(res)
            setUrl(res.subTask.propertyPhoto)
            setPropertyPhoto(res.subTask.propertyPhoto)
            setTitle(res.subTask.title)
            setSubCategory(res.subTask.subCategory)
            setDescription(res.subTask.taskDescription)
            setShowingLocation(res.subTask.showingLocation)
            setShowingDetails(res.subTask.showingDetails)
            setCl(res.subTask.checklist)
            setChecklist(res.subTask.checklist)
            setNewFields(res.subTask.addNewFields)
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
    const editHandler=()=>{
      setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`http://34.209.233.51/api/subTask/${Id}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            var res = JSON.parse(result);
            // console.log(res)
            setUrl(res.subTask.propertyPhoto)
            setTitle(res.subTask.title)
            setSubCategory(res.subTask.subCategory)
            setDescription(res.subTask.taskDescription)
            setShowingLocation(res.subTask.showingLocation)
            setShowingDetails(res.subTask.showingDetails)
            setCl(res.subTask.checklist)
            setChecklist(res.subTask.checklist)
            setNewFields(res.subTask.addNewFields)
            setEdit(true)
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
    const deleteHandler=()=>{
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`http://34.209.233.51/api/subTask/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setLoading(false)
          toast.success("Task deleted",{
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
    const titleHandler=(e)=>{
      setTitle(e.target.value)
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
      e.preventDefault()
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "title": title,
        "subCategory": subCategory,
        "taskDescription": description,
        "checklist": checklist,
        "showingLocation": showingLocation,
        "propertyPhoto": "https://images.unsplash.com/photo-1663811396744-f86d18cdf073?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
        "showingDetails": showingDetails,
        "addNewFields": newFields
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://34.209.233.51/api/subTask/edit/${Id}`, requestOptions)
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
          });

          setLoading(true)
          var myHeaders = new Headers();
          myHeaders.append("token", token);
          
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch(`http://34.209.233.51/api/subTask/${Id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
              var res = JSON.parse(result);
              // console.log(res)
              setUrl(res.subTask.propertyPhoto)
              setTitle(res.subTask.title)
              setSubCategory(res.subTask.subCategory)
              setDescription(res.subTask.taskDescription)
              setShowingLocation(res.subTask.showingLocation)
              setShowingDetails(res.subTask.showingDetails)
              setCl(res.subTask.checklist)
              setChecklist(res.subTask.checklist)
              setNewFields(res.subTask.addNewFields)
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
        })
        .catch(error => {
          setLoading(false)
          toast.error("Error while logout"+error.message,{
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
    return (
      <>
        {loading? <Loader loading={loading}/>:
          <>
            <div className={`row col-12 d-flex d-flex-row gap-8 mt-12 ml-6 mb-full`}>
            {edit? <form className={`col-11 h-fit-content p-8 bg-white border-light-gray border-rounded-16 box-s`}>
                <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-6`}>
                  <div className={`font-31 f-700 l-40`}>Task details</div>
                  <div className={`d-flex d-flex-row d-align-center gap-3`}>
                    <div onClick={submitHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-3 pb-3 pr-5 bg-primary border-rounded-12 cursor`}>
                        <img src='/images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
                        <h5 className={`f-700 l-22 color-white`}>Save changes</h5>
                    </div>
                    <div onClick={discardHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4  pt-3 pb-3 pr-5 bg-lighter-gray border-rounded-12 cursor`}>
                        <img src='/images/eva_close-fill (2).svg' alt='close-icon'/>
                        <h5 className={`f-700 l-22 color-gray`}>Discard</h5>
                    </div>
                  </div>
                </div>
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Title of task</h3>
                  <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={title} onChange={titleHandler}/>
                </div>
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Sub-Category</h3>
                  <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={subCategory} onChange={subCategoryHandler}/>
                </div>
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Task Description</h3>
                  <textarea className={`col-7 h-80 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={description} onChange={descriptionHandler}/>
                </div>
                {newFields && newFields.map((item,index)=>(
                  <div key={index+1} className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>{item.key}</h3>
                    <h3 className={`col-7 f-600 l-28 color-gray`}>{item.value}</h3>
                  </div>
                ))}
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
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
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Showing Location</h3>
                  <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={showingLocation} onChange={showingLocationHandler}/>
                </div>
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Upload property photo</h3>
                  <div className={`col-7`}>
                    <div onClick={(event)=>{
                      event.preventDefault();
                      fileInputRef.current.click();
                    }}>
                      {url ?  <div className={`p-relative d-flex d-flex-row d-align-end`}>
                      <img className={`p-relative deliverables`} src={url}/>
                        <div className={`p-absolute d-flex d-justify-center bg-white p-2 m-1 border-rounded-8`}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8336 16.6667H4.16691C3.9459 16.6667 3.73394 16.7545 3.57766 16.9108C3.42138 17.0671 3.33358 17.279 3.33358 17.5C3.33358 17.7211 3.42138 17.933 3.57766 18.0893C3.73394 18.2456 3.9459 18.3334 4.16691 18.3334H15.8336C16.0546 18.3334 16.2666 18.2456 16.4228 18.0893C16.5791 17.933 16.6669 17.7211 16.6669 17.5C16.6669 17.279 16.5791 17.0671 16.4228 16.9108C16.2666 16.7545 16.0546 16.6667 15.8336 16.6667ZM4.16691 15H4.24191L7.71691 14.6834C8.09758 14.6455 8.45361 14.4777 8.72525 14.2084L16.2252 6.70838C16.5163 6.40085 16.6737 5.99047 16.6627 5.56716C16.6518 5.14385 16.4735 4.74213 16.1669 4.45004L13.8836 2.16671C13.5856 1.88679 13.1951 1.72618 12.7864 1.71542C12.3776 1.70467 11.9792 1.84452 11.6669 2.10838L4.16691 9.60838C3.89755 9.88001 3.72983 10.236 3.69191 10.6167L3.33358 14.0917C3.32235 14.2138 3.33819 14.3368 3.37996 14.452C3.42174 14.5673 3.48842 14.6719 3.57525 14.7584C3.65311 14.8356 3.74546 14.8967 3.84699 14.9382C3.94852 14.9797 4.05724 15.0007 4.16691 15ZM12.7252 3.33338L15.0002 5.60838L13.3336 7.23338L11.1002 5.00004L12.7252 3.33338Z" fill="#2D2D2D"/>
                          </svg>
                        </div>
                      </div>:
                      <div className={`col-10 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-7 pb-7 bg-lighter-gray border-rounded-12`}>
                        <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                        <h5 className={`f-700 l-22 color-gray`}>Select or Drag the files here</h5>
                      </div>}
                    </div>
                    <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef}  onChange={fileHandler}/>
                  </div>
                </div>
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Showing Details</h3>
                  <textarea className={`col-7 h-80 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={showingDetails} onChange={showingDetailsHandler}/>
                </div>
                <div className={`col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row gap-12`}>
                  <div className={`col-5`}></div>
                  <div onClick={addNewHandler} className={`col-9 d-flex d-flex-row d-align-center d-justify-center pt-3 pb-3 bg-secondary border-primary border-rounded-8`}>
                      <img src='/images/eva_plus-fill (1).svg' alt='plus-icon'/>
                      <h5 className={`font-normal f-700 l-22 color-primary`}>Add new field</h5>
                  </div>
                </div>
              </form>
            :<div className={`col-11 h-fit-content p-8 bg-white border-light-gray border-rounded-16 box-s`}>
                <div className={`col-12 d-flex d-flex-row d-justify-space-between mb-6`}>
                    <div className={`font-31 f-700 l-40`}>Task details</div>
                    <div className={`d-flex d-flex-row d-align-center gap-3`}>
                        <div onClick={editHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-3 pb-3 pr-5 bg-secondary border-rounded-12`}>
                            <img src='/images/eva_edit-2-fill.svg' alt='edit-icon'/>
                            <h5 className={`f-700 l-22 color-primary`}>Edit details</h5>
                        </div>
                        <div onClick={deleteHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-3 pl-4 pt-3 pb-3 pr-5 bg-light-red border-rounded-12`}>
                            <img src='/images/eva_close-fill (1).svg' alt='cross-icon'/>
                            <h5 className={`f-700 l-22 color-red`}>Delete task</h5>
                        </div>
                    </div>
                </div>
                <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Title of task</h3>
                  <h3 className={`col-7 f-600 l-28 color-gray`}>{title}</h3>
                </div>
                <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Sub-category</h3>
                  <h3 className={`col-7 f-600 l-28 color-gray`}>{subCategory}</h3>
                </div>
                <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Task Description</h3>
                  <h3 className={`col-7 f-600 l-28 color-gray`}>{description}</h3>
                </div>
                {newFields && newFields.map((item,index)=>(
                  <div key={index+1} className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>{item.key}</h3>
                    <h3 className={`col-7 f-600 l-28 color-gray`}>{item.value}</h3>
                  </div>
                ))}
                <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
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
                <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Showing Location</h3>
                  <h3 className={`col-7 f-600 l-28 color-gray`}>{showingLocation}</h3>
                </div>
                {propertyPhoto&&<div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row mb-6`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Upload property photo</h3>
                  <img className={`deliverables`} src={propertyPhoto}/>
                  {/* <div className={`col-7`}>
                    <div onClick={(event)=>{
                      event.preventDefault();
                      fileInputRef.current.click();
                    }}>
                      {url ?  <img className={`deliverables`} src={url}/>:
                      <div className={`col-10 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-7 pb-7 bg-lighter-gray border-rounded-12`}>
                        <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                        <h5 className={`f-700 l-22 color-gray`}>Select or Drag the files here</h5>
                      </div>}
                    </div>
                    <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef}  onChange={fileHandler}/>
                  </div> */}
                </div>}
                <div className={`col-7 col-md-9 col-lg-8 col-xl-8 col-xxl-7 d-flex d-flex-row`}>
                  <h3 className={`col-5 f-700 l-28 color-black`}>Showing Details</h3>
                  <h3 className={`col-7 f-600 l-28 color-gray`}>{showingDetails}</h3>
                </div>
              </div>}
            </div>
            {addItem && <NewItemModal modalClass="modal-verify">
                <NewITemModalContent handler={modalHandler} dataHandler={getChecklistElement}></NewITemModalContent>
            </NewItemModal> }
            {open && <AddNewField modalClass="modal-verify">
                <AddNewFieldContent handler={addNewHandler} dataHandler={getFieldHandler}></AddNewFieldContent>
            </AddNewField> }
          </>}
          <ToastContainer/>
      </>
  )
}

export default SubTaskDetail