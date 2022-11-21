import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import {getOnBoardFromCookie} from '../auth/userCookies';
import {useRouter} from 'next/router'
import Loader from './Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssistantActivity from './AssistantActivity';
function AssistantDetails() {
  var token = getOnBoardFromCookie()
  const router = useRouter();
  const Id = router.query["id"];
  const[data, setData]=useState("")
  const[taskType, setTaskType]=useState("")
  const[edit, setEdit]=useState(false)
  const[name, setName]=useState('Cameron William')
  const[show, setShow]=useState(false)
  const fileInputRef = useRef();
  const fileInputRef1 = useRef();
  const[url, setUrl]=useState("")
  const[profile,setProfile]=useState("")
  const[activities,setActivities]=useState("")
  const[screenshot,setScreenshot]=useState("")
  const[loading, setLoading]=useState(false)

  useEffect(()=>{
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`http://34.209.233.51/api/assistant/${Id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        var res = JSON.parse(result);
        // console.log(res.assistant)
        setName(res.assistant.user.name)
        setUrl(res.assistant.user.image)
        setProfile(res.assistant.user.image)
        setTaskType(res.assistant.taskTypes)
        setData(res.assistant)
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

      fetch(`http://34.209.233.51/api/assistant/task-activity/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
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

  const editHandler=()=>{
    setEdit(true)
}
const nameHandler=(e)=>{
  setName(e.target.value)
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
    "name": name,
    "image": url
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://34.209.233.51/api/assistant/edit/${Id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      setEdit(false)
      setLoading(false)
      toast.success('Assistant Details Edited',{
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

  fetch(`http://34.209.233.51/api/assistant/delete/${Id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      setLoading(false)
      toast.success('Assistant Deleted',{
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

const screenshotHandler=(e)=>{
    setLoading(true)
    const file = e.target.files[0];
    // console.log(e.target.files[0])
    if(file&& file.type.substr(0,5)=== "image"){    
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
            setScreenshot(res.url)
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
        <div className={`row cd-wrapper col-12 d-flex d-flex-column d-align-start ml-7 mt-12 mb-full gap-8`}>
          <div className={`col-5 col-md-10 col-lg-10 col-xl-5 d-flex d-flex-column d-align-start gap-10 d-flex d-flex-column bg-white box-s border-rounded-16 p-8 h-fit-content`}>
            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
                <span className={`font-normal font-31 f-700 l-40`}>Assistant details</span>
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
                      <h5 className={`f-700 l-22 color-red`}>Delete assis.</h5>
                  </div>
                </div>}
            </div>
            {/* <div className={`col-2 p-relative d-flex d-flex-row d-align-end mb-6`}>
                <img src='/images/ellipse-28.png' alt='profile-picture'/>
                <div className={`p-absolute ml-16 d-flex d-justify-center border-circle bg-white p-2 border-circle`}>
                    <img src='/images/eva_edit-2-fill (2).svg' alt='edit-icon-3'/>
                </div>
            </div> */}
            <div className={`col-12 d-flex d-flex-column`}>
                {edit?<form>
                  <div>
                    <div onClick={(event)=>{
                      event.preventDefault();
                      fileInputRef1.current.click();
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
                    <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef1} accept='images/*' onChange={fileHandler}/>
                  </div>
                  <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>Name</h3>
                    <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={name} onChange={nameHandler}/>
                  </div>
                  <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                      <h3 className={`col-5 f-700 l-28 color-black`}>Email</h3>
                      {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.user.email}</h3>}
                  </div>
                  <div className={`col-12 d-flex d-flex-row d-align-start pb-4 mb-6 border-bottom-gray`}>
                      <h3 className={`col-5 f-700 l-28 color-black`}>Password</h3>
                      {data && <div className={`col-7 d-flex d-flex-row d-align-center`}>
                          <input type={show? "text":"password"} value={data.user.password} className={`col-5 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly/>
                          <div onClick={()=>setShow(!show)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                      </div>}
                  </div>
                </form>:<>
                {profile ? <div className={`p-relative d-flex d-flex-row d-align-end mb-12`}>
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
                  <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                      <h3 className={`col-5 f-700 l-28 color-black`}>Name</h3>
                      {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.user.name}</h3>}
                  </div>
                  <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                      <h3 className={`col-5 f-700 l-28 color-black`}>Email</h3>
                      {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.user.email}</h3>}
                  </div>
                  <div className={`col-12 d-flex d-flex-row d-align-start pb-4 mb-6 border-bottom-gray`}>
                      <h3 className={`col-5 f-700 l-28 color-black`}>Password</h3>
                      {data && <div className={`col-7 d-flex d-flex-row d-align-center`}>
                          <input type={show? "text":"password"} value={data.user.password} className={`col-5 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly/>
                          <div onClick={()=>setShow(!show)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                      </div>}
                  </div>
                </>}

                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>Assistant type</h3>
                    <h3 className={`col-7 f-600 l-28 color-gray`}>Showing assistant</h3>
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>No. of hrs worked</h3>
                    {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.workedHours}</h3>}
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>Last task</h3>
                    <h3 className={`col-7 f-600 l-28 color-gray`}>Qui aut cumque animi a ipsam</h3>
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>Tasks completed</h3>
                    {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.task.length}</h3>}
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>Area Selected</h3>
                    {data && <h3 className={`col-7 f-600 l-28 color-gray`}>{data.area}</h3>}
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-start mb-6`}>
                    <h3 className={`col-5 f-700 l-28 color-black`}>Type of task</h3>
                    {taskType && taskType.map((item,index)=>(<h3 key={index+1} className={`col-3 f-600 l-28 color-gray`}>{item}</h3>))}
                </div>
            </div>
          </div>
          <div className={`col-5 col-md-10 col-lg-10 col-xl-5 d-flex d-flex-column bg-white box-s border-rounded-16 p-8 h-fit-content`}>
            <span className={`self-start font-normal font-31 f-700 l-40 mb-8`}>Tasks activity</span>
            {/* <div className={`col-12 d-flex d-flex-row mb-6`}>
              <h3 className={`col-5 f-700 l-28 color-black`}>Upload screenshots</h3>
              <div className={`col-6 col-lg-4 col-xl-7 col-xxl-6`}>
                <div onClick={(event)=>{
                event.preventDefault();
                fileInputRef.current.click();
                }}>
                {screenshot ? <img className={`deliverables`} src={screenshot}/>:
                    <div className={`col-12 d-flex d-flex-column d-align-center d-justify-center gap-3 pt-5 pb-5 bg-lighter-gray border-rounded-12`}>
                        <img src='/images/eva_file-add-fill.svg' alt='add-file-icon'/>
                        <h5 className={`f-700 l-22 color-gray`}>Select or Drag the Pictures here</h5>
                    </div>}
                </div>
                <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={screenshotHandler}/>
              </div>
            </div> */}
            <div className={`d-flex d-flex-column d-align-center`}>
              {activities && activities.map((item,index)=>(
                <AssistantActivity key={index+1} item={item}/> 
            ))}
            </div>
          </div>
        </div>}
        <ToastContainer/>
    </>
  )
}

export default AssistantDetails