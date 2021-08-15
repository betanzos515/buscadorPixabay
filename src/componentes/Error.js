import React from 'react'

export const Error = ({ mensaje }) => {
    return (
        <div>
            <p className='my-3 p-4 text-center alert  alert-primary'>{mensaje}</p>
        </div>
    )
}
