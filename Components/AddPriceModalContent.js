import React from 'react'
import { useState } from 'react'
function AddPriceModalContent(props) {
    const[title, setTitle]=useState("")
    const[amount, setAmount]=useState("")
    const[check, setCheck]=useState(false)
    const titleHandler=(e)=>{
        setTitle(e.target.value)
    }
    const amountHandler=(e)=>{
        setAmount(e.target.value)
    }
    const checkHandler=()=>{
        setCheck(prev => !prev)
     }
     const submitHandler=()=>{
        props.handler()
        props.dataHandler({title, amount, check})
    }
  return (
    <form onSubmit={submitHandler} className={`d-flex d-flex-column d-align-start p-4`}>
        <h2 className={`font-normal f-700 l-28 color-black mb-8`}>Set a price</h2>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1 mb-4`}>
            <h5 className={`font-normal f-700 l-22 color-black`}>Title</h5>
            <textarea className={`col-11 pl-4 pr-4 pt-2 pb-2 border-light-gray border-rounded-4`} type='text' placeholder='Enter text' value={title} onChange={titleHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1 mb-4`}>
            <h5 className={`font-normal f-700 l-22 color-black`}>Amount</h5>
            <textarea className={`col-11 pl-4 pr-4 pt-2 pb-2 border-light-gray border-rounded-4`} type='number' placeholder='$ 1000' value={amount} onChange={amountHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between mb-5`}>
            <h5 className={`font-normal f-700 l-22 color-black`}>Should this task be charged hourly?</h5>
            <div>
                <label className={`switch`}>
                    <input type='checkbox' onChange={checkHandler}/>
                    <span className={`slider`}/>
              </label>
            </div>
        </div>
        <button type='submit' className={`col-5 self-center btn`}>Send</button>
    </form>
  )
}

export default AddPriceModalContent