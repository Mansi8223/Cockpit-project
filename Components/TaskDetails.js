import React from 'react'

function TaskDetails() {
  return (
    <div className={`row col-11 d-flex d-flex-row mt-12 ml-12 mb-12`}>
      <div className={`col-6`}>
        <h2>Task details</h2>
      </div>
      <div  className={`col-6 d-flex d-flex-column`}>
        <div className={`col-12`}>
          <h2>Assignees & Timeline</h2>
        </div>
        <div className={`col-12`}>
          <h2>Activity</h2>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails