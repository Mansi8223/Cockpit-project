import React from 'react'
import { useState } from 'react'
function EditTasksFields({item,count}) {
    const[state, setState]=useState(item.value)
   
  return (
    <div className={`col-12 d-flex d-flex-row mb-6`}>
        <h3 className={`col-5 f-700 l-28 color-black`}>{item.key}</h3>
        <input className={`dynamic_field col-7 color-gray pl-4 pt-2 pb-2 pr-4 border-rounded-4 border-light-gray`} id={`dynamic_field_${count}`} value={state} dataKey={item.key} type="text" onChange={(e)=>setState(e.target.value)}/>
    </div>
  )
}

export default EditTasksFields