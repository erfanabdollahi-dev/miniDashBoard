import React from 'react'
import './Users.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UsersCompo = ()=>{
    const navigate = useNavigate()
    
    
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
                Swal.fire('حذف شد!', 'کاربر با موفقیت حذف شد.', 'success');
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
        <Link to='/users/add'>
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
        <tr>
        <td>
        <i className='bin bx bxs-trash-alt' onClick={()=>handleUserDelete(1)} ></i>
        
        <i className='edit bx bx-edit' onClick={()=> navigate('/users/add/2', {state:{x:'test'}})}></i>
        
        
        </td>
        <td>erfan@gamil.com</td>
        <td>77erfan</td>
        <td>erfan</td>
        <td>1</td>
        </tr>
        
        </tbody>
        
        </table>
        </div>
        
        </div>
        {/* </div> */}
        </>
        
    )
}


export default UsersCompo;