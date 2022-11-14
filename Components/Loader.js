import React from 'react'
import DotLoader from 'react-spinners/DotLoader'
function Loader({loading}) {
    return (
        <div className={`loader`}>
            <DotLoader color={'#179FB0'} loading={loading} size={80} />
        </div>
    )
}

export default Loader