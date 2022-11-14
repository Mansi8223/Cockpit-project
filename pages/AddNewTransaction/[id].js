import React from 'react'
import { Fragment } from 'react'
import AddNewTransactionForm from '../../Components/AddNewTransactionForm'
import Base from '../../Layout/Base'
function AddNewTransaction() {
  return (
    <Fragment>
        <Base>
            <AddNewTransactionForm/>
        </Base>
    </Fragment>
  )
}

export default AddNewTransaction