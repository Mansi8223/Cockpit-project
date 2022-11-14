import React from 'react'
import { Fragment } from 'react'
import AddNewClientForm from '../Components/AddNewClientForm'
import Base from '../Layout/Base'
function AddNewClient() {
  return (
    <Fragment>
      <Base>
        <AddNewClientForm/>
      </Base>
    </Fragment>
  )
}

export default AddNewClient