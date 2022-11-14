import React from 'react'
import { Avatar } from '@material-ui/core'
import ChatScreen from './ChatScreen'
import Link from 'next/link'
function DisputeChats() {
  return (
    <div className={`col-11 d-flex d-flex-row p-8 bg-white box-s mt-12 ml-7 border-rounded-16 mb-full`}>
        <div className={`col-5 d-flex d-flex-column d-align-start`}>
            <div className={`col-12 d-flex d-flex-row d-align-center gap-10 mb-8 pr-2`}>
                <Link href="/Messages">
                    <div className={`d-flex d-flex-row d-align-center gap-1 cursor`}>
                        <span className={`font-normal font-31 f-700 l-40 color-gray`}>Chats</span>
                        <h3 className={`d-flex d-align-center d-justify-center pl-2 pr-1 border-circle bg-light-red font-normal f-700 l-28 color-red`}>1</h3>
                    </div>
                </Link>
                <div className={`d-flex d-flex-row d-align-center gap-1 border-bottom-primary`}>
                    <span className={`font-normal font-31 f-700 l-40 color-black`}>Disputes</span>
                    <h3 className={`d-flex d-align-center d-justify-center pl-2 pr-1 border-circle bg-light-red font-normal f-700 l-28 color-red`}>2</h3>
                </div>
            </div>
            <div className={`col-10 d-flex d-flex-row gap-2 pl-4 pr-7 pt-3 pb-3 bg-lighter-gray border-circle mb-6`}>
                <img src='images/eva_search-fill.svg' alt='search-icon'/>
                <input className={`col-11 h-fit-content border-none bg-lighter-gray f-700 font-16 l-22 color-gray`} type='text' placeholder='Search for people and more'/>
            </div>
            <div className={`col-11 d-flex d-flex-column d-align-center`}>
                <div className={`col-11 d-flex d-flex-row d-align-start d-justify-space-between pl-4 pr-4 pt-3 pb-3 mb-4 border-rounded-16 border4-lighter-gray`}>
                    <div className='d-flex d-flex-row d-align-center gap-5'>
                        <Avatar/>
                        <div className={`d-flex d-flex-column d-align-start`}>
                            <h3 className={`font-normal f-600 l-28 color-black`}>Guy Hawkins, Kristin James, Admin</h3>
                            <h3 className={`font-normal f-600 l-28 color-gray`}>You: Hii</h3>
                        </div>
                    </div>
                    <div className={`d-flex d-flex-column d-align-center gap-2`}>
                        <span className={`font-normal font-13 f-700 l-18 color-gray`}>6:10</span>
                        <h3 className={`d-flex d-align-center d-justify-center pl-2 pr-1 border-circle bg-primary font-normal f-600 l-28 color-white`}>1</h3>
                    </div>
                </div>
            </div>
        </div>
        <ChatScreen/>
    </div>
  )
}

export default DisputeChats