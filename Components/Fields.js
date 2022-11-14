import React from 'react'
import { useState } from 'react'

function Fields(props) {
    const[state, setState]=useState(props.value)
    const titleHandler=(e)=>{
      setState(e.target.value)
    }
  return (
    <div className={`col-7 col-md-10 col-lg-9 col-xl-8 col-xxl-7 d-flex d-flex-row d-align-center mb-6`}>
        <h3 className={`col-5 f-700 l-28 color-black`}>{props.title}</h3>
        <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={state} onChange={titleHandler}/>
    </div>
  )
}

export default Fields