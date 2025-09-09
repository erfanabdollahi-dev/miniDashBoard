import { useEffect } from "react"


const useTitle = (current)=>{
    useEffect(()=>{
        document.title = `dashboard | ${current}`
    })
}


export default useTitle