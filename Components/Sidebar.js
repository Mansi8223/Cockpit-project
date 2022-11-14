import React from 'react'
import Menubar from './Menubar'
function Sidebar() {
  const handler=()=>{
    var ele=document.getElementById("sb")
    ele.classList.remove('sidebar-active')
    ele.classList.add('sidebar')
  }
  return (
    <div id='sb' className={`sidebar d-flex d-flex-column h-100 o-hidden left-none p-5 bg-primary box-s`}>
      <div className={`close-icon self-end`} onClick={handler}>
        <img src='/images/eva_close-fill.svg' alt='close-icon'/>
      </div>
      <Menubar/>
    </div>
  )
}

export default Sidebar