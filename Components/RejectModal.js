import React from 'react'

function RejectModal(props) {
  return (
    <div className={`modal-container`}>
      <div className={`col-12 d-flex d-justify-center props.modalClass`}>
        <div className={`col-3 col-md-4 col-lg-3 bg-white p-5 border-rounded-16`}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default RejectModal