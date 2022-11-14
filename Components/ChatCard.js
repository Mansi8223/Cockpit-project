import React from 'react'
import { Avatar } from '@material-ui/core'
import {getOnBoardFromCookie} from '../auth/userCookies';

function ChatCard({item,dataHandler}) {

    var token = getOnBoardFromCookie()

    const handler=()=>{
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "recieverId": item._id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://34.209.233.51/api/chat/admin/create-chat", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            dataHandler(item._id)
        })
        .catch(error => {
            console.log('error', error)
        });
    }
  return (
        <div onClick={handler} className={`col-11 d-flex d-flex-row d-align-start d-justify-space-between pl-4 pr-4 pt-3 pb-3 mb-4 border-rounded-16 border4-lighter-gray`}>
            <div className='d-flex d-flex-row d-align-center gap-5'>
                <Avatar src={item.image} alt="user-image"/>
                <div className={`d-flex d-flex-column d-align-start`}>
                    <h3 className={`font-normal f-600 l-28 color-black`}>{item.name}</h3>
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

export default ChatCard