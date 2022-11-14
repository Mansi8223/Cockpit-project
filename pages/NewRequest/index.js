import React, { Fragment } from 'react'
import NewRequests from '../../Components/NewRequests'
import Base from '../../Layout/Base'
function NewRequest() {
  return (
    <Fragment>
      <Base>
        <NewRequests/>
      </Base>
    </Fragment>
  )
}

export default NewRequest