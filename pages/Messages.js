import React, { Fragment } from 'react'
import Chats from '../Components/Chats'
import Base from '../Layout/Base'

function Messages() {
  return (
    <Fragment>
      <Base>
        <Chats/>
      </Base>
    </Fragment>
  )
}

export default Messages