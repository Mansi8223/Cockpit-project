import React from 'react'
import { Fragment } from 'react'
import NewTaskDetails from '../../Components/NewTaskDetails'
import Base from '../../Layout/Base'

function ViewNewTask() {
  return (
    <Fragment>
      <Base>
        <NewTaskDetails/>
      </Base>
    </Fragment>
  )
}

export default ViewNewTask