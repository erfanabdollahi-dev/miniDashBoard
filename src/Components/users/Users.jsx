import React from 'react'
import './Users.css'
import { Link } from 'react-router-dom';


const UsersCompo = ()=>{
    return(
        <>
        {/* <div className='container'> */}
            <div className="user-grid">
            <div className="top">
                <h1>مدیریت کاربران</h1>
                <div className="input-submit">
                    <button className='btn-add-user'>
                        <Link to='/users/add'>
                             <i class='bx bx-plus'></i>
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
                                <Link to='/users/add/2' >
                                <i class='edit bx bx-edit' ></i>
                                </Link>
                                <i class='bin bx bxs-trash-alt' ></i>
                       
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