import React from 'react'

function AssistantActivity({item}) {
  return (
    <div className={`col-11 d-flex d-flex-column d-align-start gap-4 p-4 bg-white box-s border-rounded-12 mt-6`}>
        <div className={`d-flex d-flex-row d-align-center gap-2`}>
            {item.activityType && item.activityType==="assigned" && <img src='/images/feather_plus-circle.svg' alt='plus-circle-icon'/>}
            {item.activityType && item.activityType==="deadline" && <img src='/images/eva_clock-fill.svg' alt='clock-icon'/>}
            {item.activityType && item.activityType==="completed" && <img src='/images/eva_checkmark-circle-2-fill (2).svg' alt=''/>}
            {item.activityType && item.activityType==="request" && <img src='/images/eva_question-mark-circle-fill.svg' alt='question-mark-icon'/>}
            {item.activityType && item.activityType==="started" && <img src='/images/eva_checkmark-circle-2-fill (1).svg' alt=''/>}
            {/* <img src='/images/eva_checkmark-circle-2-fill (1).svg' alt=''/>
            <img src='/images/eva_checkmark-circle-2-fill (2).svg' alt=''/> */}
            <h3 className={`font-normal f-700 l-28 color-black text-ellipsis`}>{item.activity}</h3>
        </div>
        <h5 className={`font-normal f-700 l-22 color-gray`}>{item.date.split("GMT")[0].slice(0,15).replace(" ",", ")}</h5>
        <div className={`d-flex d-flex-row d-align-center gap-4`}>
            <div className={`d-flex d-flex-row d-align-center gap-1`}>
            <h5 className={`font-normal f-700 l-22 color-black`}>Status:</h5>
            {item.activityType && item.activityType==="assigned" &&<button className={`btn-secondary-black`}>{item.activityType}</button>}
            {item.activityType && item.activityType==="deadline" &&<button className={`btn-secondary-red`}>{item.activityType}</button>}
            {item.activityType && item.activityType==="completed" &&<button className={`btn-secondary-blue`}>{item.activityType}</button>}
            {item.activityType && item.activityType==="request" &&<button className={`btn-secondary-yellow`}>{item.activityType}</button>}
            {item.activityType && item.activityType==="started" &&<button className={`btn-secondary-green`}>{item.activityType}</button>}
            </div>
        </div>
    </div>
  )
}

export default AssistantActivity