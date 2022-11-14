import React from 'react'
import { useState } from 'react'
function AddChecklistModalContent(props) {
    const[element, setElement]=useState("")
    const yesClicked = () =>{
      props.handler()
      props.dataHandler({element})
    }
    const elementHandler=(e)=>setElement(e.target.value)
   
    return (
      <div className={`col-12 d-flex d-flex-column`}>
        <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between mb-8`}>
          <span className={`font-31 f-700 l-40 color-black`}>Add item</span>
          <button type='submit' className={`d-flex d-flex-row d-align-center d-justify-center gap-2 pl-4 pt-3 pb-3 pr-5 border-none bg-primary color-white font-normal font-16 f-700 border-circle cursor`} onClick={yesClicked}>
            <img src='/images/eva_checkmark-fill.svg' alt='checkmark-icon'/>
            Add
          </button>
        </div>
        <div className={`d-flex d-flex-row d-align-start gap-5`}>
          <img src='/images/feather_square.svg' alt='checkbox-icon'/>
          <textarea className={`col-10 textarea h-80 border-none font-normal pl-4 pt-2 pb-2 pr-4 f-700 font-16 l-22 color-gray bg-lighter-gray border-rounded-12 outline-none`} placeholder='Enter checklist element' value={element} onChange={elementHandler}/>
        </div>
      </div>
    )
}

export default AddChecklistModalContent