import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

function Base(props) {
  return (
    <div className="p-relative d-flex d-flex-column">
        <Header></Header>
        <div className="d-flex">
          <Sidebar></Sidebar>
          <main className="main-class2 col-12">
            {props.children}
          </main>
        </div>
    </div>
  )
}

export default Base