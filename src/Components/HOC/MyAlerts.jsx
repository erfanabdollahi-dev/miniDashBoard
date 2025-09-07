import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Myal = (MainComponent, number)=>{
    
    
    
    const NewComponent = (props)=>{
        const navigate = useNavigate()
        
        const Confirm = (message)=>{
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
        
        const Success = (title,message, path)=>{
            Swal.fire({
                title: title,
                text: message,
                icon: 'success',
                iconColor: '#28a745',          
                confirmButtonColor: '#28a745',
                confirmButtonText: 'تایید',
                color: '#ffffffff',            
                background: "#2a2b3a",
            }).then(()=>{
                if (path) navigate(path)
            })
        }
        
        
        const CountDown = (path)=>{
            let timerInterval;
            Swal.fire({
                title: "در حال ویرایش",
                html: "درحال بسته شدن <b></b> .",
                timer: 300,
                timerProgressBar: true,
                color: '#ffffffff',
                background : "#2a2b3a",
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 20);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    navigate(path)
                }
            })
        }
        
        
        return(
            <MainComponent {...props} Confirm={Confirm} Success={Success} CountDown={CountDown}/>
        )
    }
    
    return NewComponent
    
    
}  
export default Myal;