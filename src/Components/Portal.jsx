import React from 'react'
import ReactDOM , {createPortal} from 'react-dom'



const Portal = ()=>{
    return createPortal(
        <div className='modal-base'>
            <div className='modal-box'>
             react portal

            </div>
        </div>,

        document.getElementById("portal-root")
    )
}

export default Portal;