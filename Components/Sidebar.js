import React from 'react'
import Menubar from './Menubar'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
function Sidebar() {
  const sideBarHandler = (e) => {
    // e.currentTarget.classList.toggle(styles["open"]);
    // document.querySelector(#sidebar).classList.toggle(styles["open"])
    // document.querySelector(main).classList.toggle(styles["blur"])
    // document.querySelector('#header-icon').classList.toggle(styles["header-op"])
}
  return (
    // <div role="button" onClick={sideBarHandler} className={`d-flex d-align-center d-justify-center`}>
    //   <MenuIcon/>
    //   <CloseIcon/>
    // </div>
    <div className={`col-2 h-100 o-hidden left-none p-5 bg-primary box-s`}>
      <Menubar/>
    </div>
  )
}

export default Sidebar