import React from 'react'

function AddNewModal(props) {
  return (
    <div className={`modal-container`}>
      <div className={`col-12 d-flex d-justify-center props.modalClass`}>
        <div className={`col-2 col-md-4 col-lg-3 col-xl-3 col-xxl-2 bg-white p-8 border-rounded-16`}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AddNewModal