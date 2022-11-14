import React from 'react'
import { useState } from 'react'

function Password({item}) {
    const [state, setState]=useState(false)
  return (
    <>
    {item.password && 
        <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between mb-6`}>
            <h3 className={`col-5 font-normal f-700 l-28 color-black`}>{item.title}</h3>
            <div className={`col-7 d-flex d-flex-column d-align-start`}>
                <h5 className={`font-normal f-700 l-22 color-black`}>{item.username}</h5>
                <div className={`d-flex d-flex-row d-align-center`}>
                    <input type={state? "text":"password"} value={item.password} className={`col-6 h-fit-content border-none font-normal font-20 f-600 l-28 color-gray`} readOnly />
                    <div onClick={()=>setState(!state)}><img  src='/images/eye.svg' alt='view-icon'/></div>
                </div> 
            </div>
        </div>}
    </>
  )
}

export default Password