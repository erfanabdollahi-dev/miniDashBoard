import React, { memo, useContext, useEffect, useState } from 'react'
import './Users.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { UserContext , UserLenContext} from './userContext';
import { jpAxios } from '../../JpAxios';

const UsersCompo = ()=>{
    const navigate = useNavigate()
    const {users, setUsers} = useContext(UserContext);
    const [searchUser, setSearchUser] = useState('')
    const {atl, setAtl} = useContext(UserLenContext);
    
    useEffect(()=>{
        
        
        jpAxios.get('/users').then(res=>{
            if(users.length){
                setUsers([...users])
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
            iconColor: '#e03715ff',
            showCancelButton: true,
            confirmButtonColor: '#e03715ff',
            confirmButtonText: '!بله حذف شود',
            cancelButtonText: 'لغو',
            color: '#ffffffff',
            background: "#2a2b3a",
        }).then((result) => {
            if (result.isConfirmed) {
                jpAxios.delete(`/users/${id}`).then(res => {
                    const newUsers = users.filter(u => u.id != id);
                    setUsers(newUsers);
                    
                    // ✅ Custom styled success popup
                    Swal.fire({
                        title: 'حذف شد!',
                        text: 'کاربر با موفقیت حذف شد.',
                        icon: 'success',
                        iconColor: '#28a745',          // green icon
                        confirmButtonColor: '#28a745',
                        confirmButtonText: 'تایید',
                        color: '#ffffffff',            // text color
                        background: "#2a2b3a",
                    });
                    
                }).catch(err => {
                    // ✅ Custom styled error popup
                    Swal.fire({
                        title: 'خطا!',
                        text: 'حذف کاربر با خطا مواجه شد!',
                        icon: 'error',
                        iconColor: '#e03715ff',
                        confirmButtonColor: '#e03715ff',
                        confirmButtonText: 'تایید',
                        color: '#ffffffff',
                        background: "#2a2b3a",
                    });
                });
                
            } else {
                // ✅ Custom styled cancel popup
                Swal.fire({
                    title: 'لغو شد',
                    text: 'کاربر حذف نشد.',
                    icon: 'error',
                    iconColor: '#ffc107',          // yellow warning icon
                    confirmButtonColor: '#ffc107',
                    confirmButtonText: 'تایید',
                    color: '#ffffffff',
                    background: "#2a2b3a",
                });
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
        <input type="text" onChange={e=> setSearchUser(e.target.value)} placeholder='جستجو کاربر' />
        
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
            
            users.filter(u=>{
            if(!searchUser) return true;
            return(
                u.name.toLowerCase().includes(searchUser.toLowerCase())
                ||u.username.toLowerCase().includes(searchUser.toLowerCase())
                ||u.email.toLowerCase().includes(searchUser.toLowerCase())
            )
            }).map(u =>(
                <tr key={u.id}>
                <td>
                <i className='bin bx bxs-trash-alt' onClick={()=>handleUserDelete(u.id)} ></i>
                
                <i className='edit bx bx-edit' onClick={()=> navigate(`/users/add/${u.id}`)}></i>
                
                
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