import React from 'react'

function Modal(props) {
  return (
    <div className={`modal-container`}>
      <div className={`col-12 d-flex d-justify-center props.modalClass`}>
        <div className={`col-4 col-md-6 col-lg-5 col-xl-5 col-xxl-4 bg-white p-8 border-rounded-16`}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Modal