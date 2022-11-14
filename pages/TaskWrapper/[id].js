import React from 'react'
import { Fragment } from 'react'
import TaskDetails from '../../Components/TaskDetails'
import Base from '../../Layout/Base'
function ViewTask() {
  return (
    <Fragment>
      <Base>
        <TaskDetails/>
      </Base>
    </Fragment>
  )
}

export default ViewTask