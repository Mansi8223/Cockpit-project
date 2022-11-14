import React from 'react'
import { Fragment } from 'react'
import ClientDetails from '../../Components/ClientDetails'
import Base from '../../Layout/Base'
function ViewClient() {
  return (
    <Fragment>
      <Base>
        <ClientDetails/>
      </Base>
    </Fragment>
  )
}

export default ViewClient