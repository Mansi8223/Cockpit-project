import React from 'react'
import { useState } from 'react';
import NewRequests from './NewRequests';
import TaskTable from './TaskTable';
import Templates from './Templates';
function Task() {
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("All")
    const types = ['All','xyz','abc']
    const[activeTime, setActiveTime]=useState(false);
    const[time,setTime]=useState("Last 30 days")
    const times = ['Last 30 days','Last week','Last 5 days']
    const[activedeadline, setActiveDeadline]=useState(false);
    const[deadline, setDeadline]=useState("none")
    const deadlines = ['none','none','none']
    const[activeRevision, setActiveRevision]=useState(false);
    const[revision, setRevision]=useState("none")
    const revisions = ['none','srg','arg']
    const[allTasks, setAllTasks]=useState(true)
    const[newRequest, setNewRequest]=useState(false)
    const[templates, setTemplates]=useState(false)
  return (
    <>
        {allTasks && <div className={`row col-11 d-flex mt-12 ml-12 mb-12 bg-white border-rounded-16 box-s`}>
            <div className={` col-12 d-flex d-flex-row d-align-center d-justify-space-between m-3`}>
                <div className={` d-flex d-flex-row d-align-start gap-10 h-48`}>
                    <div className={`d-flex d-flex-row d-align-center cursor gap-1`} onClick={()=>{
                        setAllTasks(false)
                        setTemplates(false)
                        setNewRequest(true)}}>
                        <h2 className={`f-700 l-40 color-light-gray`}>New Requests</h2>
                        <h3 className={`f-700 l-28 pl-2 pr-1 color-red bg-peach border-rounded-20`}>2</h3>
                    </div>
                    <h2 className={`f-700 l-40 color-black cursor border-bottom-primary`} onClick={()=>{
                        setNewRequest(false)
                        setTemplates(false)
                        setAllTasks(true)}}>All Tasks</h2>
                    <h2 className={`f-700 l-40 cursor color-light-gray`} onClick={()=>{
                        setAllTasks(false)
                        setNewRequest(false)
                        setTemplates(true)
                        }}>Templates</h2>
                </div>
                <div className={`col-2 col-md-3 col-lg-3 create col-xxl-2 d-flex d-flex-row d-align-center d-justify-center pt-4 pb-4 gap-2 bg-primary border-circle`}>
                    <img src='/images/eva_plus-fill.png'/>
                    <h4 className={`f-700 l-22 color-white`}>Create new task</h4>
                </div>
            </div> 
            <div className={`col-12 wrap-xxl d-flex d-flex-column gap-2 ml-5 mr-5 pr-1`}>
                <div className={`col-12 d-flex d-flex-row d-align-start gap-3 pl-1 pr-9`}>
                    <div className={`d-flex d-flex-column bg-white`}>
                        <div className={`h-40 pl-2 pr-2 d-flex d-flex-row d-align-center d-justify-center gap-2 f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setIsActive(!isActive)}>
                            <h5>Employee Type:</h5>
                            <h5>{selected}</h5> 
                            <img src='/images/feather_chevron-down.png'/> 
                        </div>
                        {isActive && (
                            <div className={`dropdown-content pl-9 pr-9 d-flex d-flex-column d-align-center `}>
                                {types.map((type,index) =>(
                                <div key={index} className={`dropdown-item cursor gap-2 f-700 l-22 p-1`} onClick={( )=>{
                                    setSelected(type)
                                    setIsActive(false)}}>
                                    <h5>{type}</h5>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`d-flex d-flex-column bg-white `}>
                        <div className={`h-40 pl-2 pr-2 d-flex d-flex-row d-align-center d-justify-center gap-2 f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setActiveTime(!activeTime)}>
                            <h5>Time:</h5>
                            <h5>{time}</h5> 
                            <img src='/images/feather_chevron-down.png'/> 
                        </div>
                        {activeTime && (
                            <div className={`dropdown-content  pl-9 pr-9 d-flex d-flex-column d-align-center `}>
                                {times.map((item,index)=>(
                                <div key={index} className={`dropdown-item cursor  gap-2 f-700 l-22 p-1`} onClick={( )=>{
                                    setTime(item)
                                    setActiveTime(false)}}>
                                    <h5>{item}</h5>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`d-flex d-flex-column bg-white `}>
                        <div className={`h-40 pl-2 pr-2 d-flex d-flex-row d-align-center d-justify-center gap-1 f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setActiveDeadline(!activedeadline)}>
                            <h5>Deadline:</h5>
                            <h5>{deadline}</h5> 
                            <img src='/images/feather_chevron-down.png'/> 
                        </div>
                        {activedeadline && (
                            <div className={`dropdown-content pl-9 pr-9 d-flex d-flex-column d-align-center `}>
                                {deadlines.map((item,index) =>(
                                <div key={index} className={`dropdown-item cursor  gap-2 f-700 l-22 p-1`} onClick={( )=>{
                                    setDeadline(item)
                                    setActiveDeadline(false)}}>
                                    <h5>{item}</h5>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`d-flex d-flex-column bg-white `}>
                        <div className={`h-40 pl-2 pr-2 d-flex d-flex-row d-align-center d-justify-center gap-2 f-700 l-22 border-light-gray border-rounded-8`}onClick={()=>setActiveRevision(!activeRevision)}>
                            <h5>Requested revision:</h5>
                            <h5>{revision}</h5> 
                            <img src='/images/feather_chevron-down.png'/> 
                        </div>
                        {activeRevision && (
                            <div className={`dropdown-content pl-9 pr-9 d-flex d-flex-column d-align-center `}>
                                {revisions.map((item,index) =>(
                                <div key={index} className={`dropdown-item cursor  gap-2 f-700 l-22 p-1`} onClick={( )=>{
                                    setRevision(item)
                                    setActiveRevision(false)}}>
                                    <h5>{item}</h5>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={`col-5 d-flex d-flex-row gap-3 ml-1`}>
                    <div className={`col-8 d-flex d-flex-row d-align-center gap-2 border-light-gray border-rounded-8 pl-3 pr-2 bg-lighter-gray`}>
                        <img src='/images/eva_search-fill.svg' alt='search-icon'/>
                        <input className={`search-input h-40 border-none bg-lighter-gray f-700 font-16 l-22`} type='text' placeholder='Search'/>
                    </div> 
                    <div className={`col-2 h-40 d-flex d-flex-row d-align-center gap-2 pl-3 pr-2 border-light-gray border-rounded-8`}>
                        <img src='/images/eva_funnel-fill.svg' alt='funnel-icon'/>
                        <h5 className={`f-700 l-22 color-black`}>Filter</h5>
                    </div>
                </div>
            </div>
            <TaskTable/>
        </div>}
        {newRequest && <NewRequests/>}
        {templates && <Templates/>}
    </>
  )
}

export default Task