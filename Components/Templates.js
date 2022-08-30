import React from 'react'
import { useState } from 'react';
import NewRequests from './NewRequests';
import Task from './Task';
function Templates() {
    const[allTasks, setAllTasks]=useState(false)
    const[newRequest, setNewRequest]=useState(false)
    const[templates, setTemplates]=useState(true)
  return (
    <>
        {templates && <div className={`row col-11 mt-12 ml-12 mb-12 bg-white d-flex border-rounded-16 box-s`}>
            <div className={` col-12 d-flex d-flex-row d-align-center d-justify-space-between m-3`}>
                <div className={` d-flex d-flex-row d-align-start gap-10 h-48`}>
                    <div className={`d-flex d-flex-row d-align-center cursor gap-1`} onClick={()=>{
                        setAllTasks(false)
                        setTemplates(false)
                        setNewRequest(true)}}>
                        <h2 className={`f-700 l-40 color-light-gray`}>New Requests</h2>
                        <h3 className={`f-700 l-28 pl-2 pr-1 color-red bg-peach border-rounded-20`}>2</h3>
                    </div>
                    <h2 className={`f-700 l-40 color-light-gray cursor`} onClick={()=>{
                        setNewRequest(false)
                        setTemplates(false)
                        setAllTasks(true)}}>All Tasks</h2>
                    <h2 className={`f-700 l-40 color-black cursor border-bottom-primary`} onClick={()=>{
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
        </div>}
        {allTasks && <Task/>}
        {newRequest && <NewRequests/>}
    </>
  )
}

export default Templates