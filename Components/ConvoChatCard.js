import React from 'react'
import { Avatar } from '@material-ui/core'
function ConvoChatCard({item,dataHandler}) {

    const handler=()=>{
        dataHandler(item._id)
    }
  return (
        <div onClick={handler} className={`col-11 d-flex d-flex-row d-align-start d-justify-space-between pl-4 pr-4 pt-3 pb-3 mb-4 border-rounded-16 border4-lighter-gray`}>
            <div className='d-flex d-flex-row d-align-center gap-5'>
                <Avatar />
                <div className={`d-flex d-flex-column d-align-start`}>
                    <div className={`d-flex d-flex-row d-align-center`}>
                        {item.user1&&<h3 className={`font-normal f-600 l-28 color-black`}>{item.user1.name},</h3>}
                        {item.user2&&<h3 className={`font-normal f-600 l-28 color-black`}>{item.user2.name},</h3>}
                        <h3 className={`font-normal f-600 l-28 color-black`}>admin</h3>
                    </div>
                    <h3 className={`font-normal f-600 l-28 color-gray`}>You: Hii</h3>
                </div>
            </div>
            <div className={`d-flex d-flex-column d-align-center gap-2`}>
                <span className={`font-normal font-13 f-700 l-18 color-gray`}>6:10</span>
                {/* <h3 className={`d-flex d-align-center d-justify-center pl-2 pr-1 border-circle bg-primary font-normal f-600 l-28 color-white`}></h3> */}
            </div>
        </div>
  )
}

export default ConvoChatCard