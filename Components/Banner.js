import React from 'react'
import {Avatar} from "@material-ui/core"
import { useState } from 'react'
function Banner({item,dataHandler}) {
    const[click, setClick]=useState(false)
    const assignHandler=()=>{
        setClick(prev=>!prev)
        dataHandler(item)
    }
    const assignHandler1=()=>{
        setClick(prev=>!prev)
    }
  return (
    <div  className={`card col-11 d-flex d-flex-row d-align-center d-justify-space-between pl-6 pr-4 pt-4 pb-4 mb-5 bg-white border-rounded-16 box-s`}>
        <div className={`d-flex d-flex-row d-align-start gap-3`}>
            <Avatar src={item.user.image}/>
            <div className={`d-flex d-flex-column gap-1`}>
                <h5 className={`f-700 l-22`}>{item.user.name}</h5>
                <span className={`font-13 f-700 l-18`}>{item.assistantType} ass.</span>
                <div className={`w-fit-content pl-2 pt-1 pr-2 pb-1 font-13 f-700 l-18 bg-light-green color-green border-rounded-8`}>{item.status}</div>   
                {/* <div className={`w-fit-content pl-2 pt-1 pr-2 pb-1 font-13 f-700 l-18 bg-light-red color-red border-rounded-8`}>Tasks assigned</div> */}
            </div>
        </div>
        {click?<div className={`d-flex d-justify-center p-2 bg-light-green border-circle`} onClick={assignHandler1}>
            <img src='/images/eva checkmark fill.svg' alt='check-icon'/>
        </div>:<div className={`d-flex d-justify-center p-2 bg-lighter-gray border-circle`} onClick={assignHandler}>
            <img src='/images/eva_plus-fill.svg' alt='plus-icon'/>
        </div>}
    </div>
  )
}

export default Banner