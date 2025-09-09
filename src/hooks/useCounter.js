import { useState } from "react"

const useCounter = (inti, value)=>{
    const [count, setCount ]= useState(inti)

    const increment = ()=>{
        setCount(prev => prev +value)
    }
    const decrement = ()=>{
        setCount(prev => prev-value)
    }

    const reset = ()=>{
        setCount(inti)
    }


    return [count, increment, decrement, reset]

}


export default useCounter;