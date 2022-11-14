import React, { useEffect } from 'react'
import {Avatar} from "@material-ui/core"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import ProfileEditModal from './ProfileEditModal';
import ProfileEditModalContent from './ProfileEditModalContent';
import {removeOnBoardCookie} from '../auth/userCookies'
import useFirebaseAuth from '../auth/useFirebaseAuth';
import {useRouter} from 'next/router'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from '../Components/Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Header() {
  const[active, setActive]=useState(false)
  const[isActive, setIsActive]=useState(false)
  const[edit, setEdit]=useState(false)
  const[data, setData]=useState("")
  const[user, setUser]=useState("")
  const[loading, setLoading]=useState(false)
  const router = useRouter();
  const {signOut} = useFirebaseAuth()
  var token = getOnBoardFromCookie()
  var notif_id = ""
  useEffect(()=>{
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://34.209.233.51/api/notification/", requestOptions)
      .then(response => response.text())
      .then(result => {
        var res = JSON.parse(result);
        // console.log(res.notifications)
        setData(res.notifications)
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
    
    fetch("http://34.209.233.51/api/user/detail", requestOptions)
      .then(response => response.text())
      .then(result => {
        var res = JSON.parse(result);
        // console.log(res.user)
        setUser(res.user)
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
      })
  },[])
  const myElement=(e)=>{
    var element=document.getElementById("sb")
    element.classList.remove('sidebar')
    element.classList.add('sidebar-active')
  }
  const notificationHandler=()=>{
    setActive(prev => !prev)
  }
  const profileHandler=()=>{
    setIsActive(prev => !prev)
  }
  const logoutHandler=()=>{
      signOut()
      .catch((error)=>{
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
      })
      router.push("/Login")
  }
  const modalHandler=()=>setEdit(prev => !prev)
  const singleNotificationHandler=()=>{
    setLoading(true)
    // console.log("called",notif_id)
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "isRead": true
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://34.209.233.51/api/notification/${notif_id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        setLoading(false)
        toast.success("Marked this notification as read",{
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
  const markReadHandler=()=>{
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://34.209.233.51/api/notification/", requestOptions)
      .then(response => response.text())
      .then(result => {
        setLoading(false)
        toast.success("Marked all notifications as read",{
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
  let bell = "/images/vector (3).svg"
  return (
    <>
      {loading?<Loader loading={loading}></Loader>:
        <>
          <div className={`row d-flex d-flex-row d-align-center d-justify-space-between h-80 pl-5 pr-9 bg-white box-s`} >
            <div className={`d-flex d-flex-row d-align-center gap-3`}>
              <div className={`menu-icon color-primary`} onClick={myElement}><MenuIcon/></div>
              <img src='/images/cockpit-logo (1).png' alt='logo2'/>
            </div>
            <div className={`col-2 col-md-4 col-lg-3 col-xl-3 col-xxl-2 d-flex d-flex-row d-align-center d-justify-space-between`}>
              <div className={`d-flex d-flex-column d-align-end`}>
                <img className={`cursor`} onClick={notificationHandler} src={bell} alt='notification-icon'/>
                {active && <div className={`col-3 col-md-4 col-lg-4 col-xl-3 col-xxl-3 notification p-absolute d-flex d-flex-column z-index-popup oy-scroll h-538 p-5 mt-12 bg-white border-rounded-16 box-s`}>
                  <div className={`bg-white d-flex d-flex-row d-align-center d-justify-space-between`}>
                    <h3 className={`font-normal f-700 l-28 color-black`}>Notifications</h3>
                    <span onClick={markReadHandler} className='font-13 f-700 l-18 color-primary text-uppercase cursor'>Mark all as read</span>
                  </div>
                  {data && data.map((item,index)=>(
                    <div key={index+1} 
                      onClick={()=>{notif_id = item._id
                        singleNotificationHandler()}} 
                      className={`d-flex d-flex-row d-align-start gap-2 mt-5 pb-4 border-bottom-gray`}>
                        <img src='/images/feather_plus-circle (1).svg' alt='plus-circle-icon'/>
                        <div className={`d-flex d-flex-column d-align-start`}>
                          <h3 className={`font-normal f-600 l-28 color-black mt-1`}>{item.title}</h3>
                          <h5 className={`font-normal f-400 l-22 color-black`}>{item.body}</h5>
                          <span className={`font-normal font-13 f-700 l-18 color-gray`}>{item.createdAt.split("T")[0] + ", " + item.createdAt.split("T")[1].split(".")[0].split(":")[0]+ ":" + item.createdAt.split("T")[1].split(".")[0].split(":")[1] }</span>
                        </div>
                    </div>
                  ))}
                </div>}
              </div>
              <div className={`d-flex d-flex-column d-align-end`}>
                <div onClick={profileHandler} className={`col-12 h-48 d-flex d-flex-row d-align-center gap-1 border-light-gray border-circle pl-2 pr-2 pb-1 pt-1 cursor`}>
                  {user && <Avatar src={user.image}/> }
                  <div className={`d-flex d-flex-column`}>
                    {user && <h5 className={`f-700 l-22`}>{user.name}</h5>}
                    <h6 className={`f-700 l-14 color-gray`}>ADMIN</h6>
                  </div>
                </div>
                {isActive && <div className={`col-2 col-md-4 col-lg-3 col-xl-3 col-xxl-2 d-flex d-flex-row d-align-start d-justify-space-between p-absolute z-index-popup p-5 mt-popup bg-white border-rounded-16 box-s`}>
                  {user && <Avatar src={user.image}/> }
                  <div className={`col-8 d-flex d-flex-column`}>
                    {user && <h3 className={`font-normal f-600 l-28 color-black`}>{user.name}</h3>}
                    {user && <h5 className={`mt-1 font-normal f-700 l-22 color-gray`}>{user.email}</h5>}
                    <button onClick={logoutHandler} className={`col-7 mt-2 p-3 border-none border-rounded-20 font-normal font-13 f-700 l-18 text-uppercase bg-light-red color-red cursor`}>Log out</button>
                  </div>
                  <div onClick={modalHandler} className={`bg-primary p-2 border-circle d-flex d-justify-center cursor`}>
                    <img src='/images/eva_edit-2-fill (1).svg' alt='edit-icon-2'/>
                  </div>
                </div>}
              </div>
            </div>
          </div>
          {edit && <ProfileEditModal modalClass="modal-verify">
            <ProfileEditModalContent handler={modalHandler} user={user}></ProfileEditModalContent>
          </ProfileEditModal>}
        </>
      }
      <ToastContainer/>
    </>
  )
}

export default Header