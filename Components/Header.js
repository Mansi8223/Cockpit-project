import React from 'react'
import {Avatar} from "@material-ui/core"
import MenuIcon from '@mui/icons-material/Menu';
function Header() {
  return (
      <div className={`row d-flex d-flex-row d-align-center d-justify-space-between h-80 pl-9 pr-9 bg-white box-s`} >
        <div>
            <img src='/images/cockpit-logo (1).png' alt='logo2'/>
        </div>
        <div className={`col-2 col-md-4 col-lg-3 col-xl-2 d-flex d-flex-row d-align-center d-justify-space-between`}>
            <img src='/images/vector (3).svg'></img>
            <div className={`col-7 h-48 d-flex d-flex-row d-align-center gap-1 border-light-gray border-circle pl-2 pr-2 pb-1 pt-1`}>
              <Avatar/>
              <div className={`d-flex d-flex-column`}>
                <h5 className={`f-700 l-22`}>Jake Paul</h5>
                <h6 className={`f-700 l-14 color-gray`}>ADMIN</h6>
              </div>
            </div>
        </div>
      </div>
  )
}

export default Header