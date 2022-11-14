import React from 'react'
import { Fragment } from 'react'
import CreateTaskForm from '../Components/CreateTaskForm'
import Base from '../Layout/Base'
function CreateTask() {
  return (
    <Fragment>
      <Base>
        <CreateTaskForm/>
      </Base>
    </Fragment>
  )
}

export default CreateTask