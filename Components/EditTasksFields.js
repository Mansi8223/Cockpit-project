import React from 'react'
import { useState } from 'react'
function EditTasksFields({item}) {
    // const[state, setState]=useState(item.value)
    const titleHandler=(e)=>{
      // setState(e.target.value)
    }
  return (
    <div className={`col-12 d-flex d-flex-row mb-6`}>
        <h3 className={`col-5 f-700 l-28 color-black`}>{item.key}</h3>
        <textarea className={`col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} value={item.value} onChange={titleHandler}/>
    </div>
  )
}

export default EditTasksFields