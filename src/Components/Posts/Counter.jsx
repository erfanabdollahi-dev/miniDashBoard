import React, { useState } from 'react'
import { Success } from '../../utils/AlertUtil'
import { useNavigate } from 'react-router-dom'
// import { Confirm } from '../../utils/AlertUtil'

export default function Counter() {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  
  const handleAddCount = (num)=>{
    for(let i = 0 ; i < num; i++){
      
      setCount((prev)=>{
        return prev + 1
      })
    }

    Success('fsaf'," jjj").then(()=>navigate('/users'))
  }
  
  return (
    <div className='counter-con'>
    <button className='counter-btn' onClick={()=>handleAddCount(21)}>
    count : {count}
    </button>
    
    </div>
  )
}
