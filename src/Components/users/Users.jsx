import React, { memo, useContext, useEffect, useState } from 'react'
import './Users.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { UserContext , UserLenContext} from './userContext';


const UsersCompo = ()=>{
    const navigate = useNavigate()
    const {users, setUsers} = useContext(UserContext);
    const {atl, setAtl} = useContext(UserLenContext);

    useEffect(()=>{


        axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
            if(users.length){
                
                setUsers([...users])
                console.log(users)


            }
            else{

                setUsers(res.data)
                setAtl(res.data.length)
  

                

            }
         
            
        }).catch(err=>{
            console.log(err);
            
        })
    }, [])
    
    const handleUserDelete = (id) => {
        Swal.fire({
            title: 'حذف کاربر',
            text: `آیا از حذف کاربر ${id} اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: '!بله حذف شود',
            cancelButtonText: 'لغو'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(res=>{
                    console.log(res);
                    console.log(atl);
  
                    
                    if(res.status == 200){
                        const newUsers = users.filter(u=> u.id != id);
                        setUsers(newUsers)
                        Swal.fire('حذف شد!', 'کاربر با موفقیت حذف شد.', 'success');
                    }
                    else{
                        Swal.fire(' خطا!', 'خذف کاربر با خطا مواجه شد!', 'error');
                    }


                })

                
            } else {
                Swal.fire('لغو شد', 'کاربر حذف نشد.', 'error');
            }
        });
    };
    
    
    return(
        <>
        {/* <div className='container'> */}
        <div className="user-grid">
        <div className="top">
        <h1>مدیریت کاربران</h1>
        <div className="input-submit">
        <button className='btn-add-user'>
        <Link to='/users/add' >
            <i className='bx bx-plus'></i>
        </Link>
        </button>
        <input type="text" placeholder='جستجو کاربر' />
        
        </div>
        </div>
        <div className="bottom">
        
        
        <table className='user-table'>
        <thead>
        <tr>
        <th>عملیات</th>
        <th>ایمیل</th>
        <th>نام کاربری</th>
        <th >نام</th>
        <th>#</th>
        </tr>
        </thead>
        <tbody>
        {users.length ? (

            users.map(u =>(
            <tr key={u.id}>
            <td>
            <i className='bin bx bxs-trash-alt' onClick={()=>handleUserDelete(u.id)} ></i>
            
            <i className='edit bx bx-edit' onClick={()=> navigate(`/users/add/${u.id}`, {state:{x:'test'}})}></i>
            
            
            </td>
            <td>{u.email}</td>
            <td>{u.username}</td>
            <td>{u.name}</td>
            <td>{u.id}</td>
            </tr>

            ))
            
        ):(
            <tr>
            <td>
                -
            </td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            </tr>
        )}
        </tbody>
        </table>
        
        
        
        
        </div>
        
        </div>
        {/* </div> */}
        </>
        
    )
}


export default memo(UsersCompo);