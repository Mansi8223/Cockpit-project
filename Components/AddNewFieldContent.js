import React from 'react'
import { useState } from 'react'
function AddNewFieldContent(props) {
    const[title, setTitle]=useState("")
    const[value, setValue]=useState("")
    const titleHandler=(e)=>setTitle(e.target.value)
    const valueHandler=(e)=>setValue(e.target.value)
    const submitHandler=(e)=>{
        e.preventDefault()
        props.dataHandler({title,value})
        props.handler()
     }
  return (
        <div className={`col-12`}>
            <form onSubmit={submitHandler} className={`col-12 d-flex d-flex-column gap-4`}>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-3`}>
                    <h3 className={`col-3 font-normal f-700 l-28`}>Title</h3>
                    <textarea className={`col-10 textarea h-40 border-none pl-4 pt-2 pb-2 pr-4 bg-lighter-gray border-rounded-8 outline-none`} placeholder='Enter text' value={title} onChange={titleHandler}/>
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-3`}>
                    <h3 className={`col-3 font-normal f-700 l-28`}>Value</h3>
                    <textarea className={`col-10 textarea h-40 border-none pl-4 pt-2 pb-2 pr-4 bg-lighter-gray border-rounded-8 outline-none`} placeholder='Enter text' value={value} onChange={valueHandler}/>
                </div>
                <button type='submit' className={`col-5 self-center btn`}>Send</button>
            </form>
        </div>
  )
}

export default AddNewFieldContent