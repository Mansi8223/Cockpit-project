import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router';
function Menubar() {
    const [path, setPath] =useState("");
    const router = useRouter();
    useEffect(()=>{
      setPath(router.route)
    })
  return (
    <div className={`row d-flex d-flex-column d-align-center gap-1`}> 
        {path=="/Tasks"?
            <Link  href='/Tasks'>
                <div className={`active col-10 p-4 `}>
                    <img src='/images/Subtract.png' alt='tasks-icon'/>
                    <h5 className={`color-primary f-700 l-22`}>Tasks</h5>
                </div>
            </Link>
          : <Link  href='/Tasks'>
                <div className={`inactive col-10 p-4`}>
                    <img src='/images/Subtract (1).png' alt='tasks1-icon'/>
                    <h5 className={`color-white f-700 l-22`}>Tasks</h5>
                </div>
            </Link>
        }
        {path=="/Clients"?
            <Link  href='/Clients'>
                <div className={`active col-10 p-4`}>
                    <img src='/images/eva_person-done-fill.png' alt='clients-icon'/>
                    <h5 className={`color-primary f-700 l-22`}>Clients</h5>
                </div>
            </Link>
          : <Link  href='/Clients'>
                <div className={`inactive col-10 p-4`}>
                    <img src='/images/eva_person-done-fill (1).png' alt='clients1-icon'/>
                    <h5 className={`color-white f-700 l-22`}>Clients</h5>
                </div>
            </Link>
        }
        {path=="/ShowingAssistant"?
            <Link  href='/ShowingAssistant'>
                <div className={`active col-10 p-4`}>
                    <img src='/images/fa-solid_car-side.png' alt='sa-icon'/>
                    <h5 className={`color-primary f-700 l-22`}>Showing Assistant</h5>
                </div>
            </Link>
          : <Link  href='/ShowingAssistant'>
                <div className={`inactive col-10 p-4`}>
                    <img src='/images/fa-solid_car-side (1).png' alt='sa1-icon'/>
                    <h5 className={`color-white f-700 l-22`}>Showing Assistant</h5>
                </div>
            </Link>
        }
        {path=="/Messages"?
            <Link  href='/Messages'>
                <div className={`active col-10 p-4`}>
                    <img src='/images/eva_message-circle-fill.png' alt='message-icon'/>
                    <h5 className={`color-primary f-700 l-22`}>Messages</h5>
                </div>
            </Link>
          : <Link  href='/Messages'>
                <div className={`inactive col-10 p-4`}>
                    <img src='/images/eva_message-circle-fill (1).png' alt='message1-icon'/>
                    <h5 className={`color-white f-700 l-22`}>Messages</h5>
                </div>
            </Link>
        }
        {path=="/TaskPrice"?
            <Link  href='/TaskPrice'>
                <div className={`active col-10 p-4`}>
                    <img src='/images/feather_dollar-sign.png' alt='TaskPrice-icon'/>
                    <h5 className={`color-primary f-700 l-22`}>Task Price</h5>
                </div>
            </Link>
          : <Link  href='/TaskPrice'>
                <div className={`inactive col-10 p-4`}>
                    <img src='/images/feather_dollar-sign (1).png' alt='TaskPrice1-icon'/>
                    <h5 className={`color-white f-700 l-22`}>Task Price</h5>
                </div>
            </Link>
        }
    </div>
  )
}

export default Menubar