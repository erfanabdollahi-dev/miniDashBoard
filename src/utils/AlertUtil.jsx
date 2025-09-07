import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const Confirm = (message)=>{
    //this is returning a promise
    return Swal.fire({
        title: 'حذف رکورد',
        text: message,
        icon: 'warning',
        iconColor: '#e03715ff',
        showCancelButton: true,
        confirmButtonColor: '#e03715ff',
        confirmButtonText: '!بله حذف شود',
        cancelButtonText: 'لغو',
        color: '#ffffffff',
        background: "#2a2b3a",
    })
}

export const Success =  (title,message)=>{
     Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        iconColor: '#28a745',          
        confirmButtonColor: '#28a745',
        confirmButtonText: 'تایید',
        color: '#ffffffff',            
        background: "#2a2b3a",
    })
}