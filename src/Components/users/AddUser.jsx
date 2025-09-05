import React from 'react'
import './AddUser.css'
import { useParams } from 'react-router-dom'


const AddUserCompo = ()=>{

    const {userId} = useParams();



    return (
        
     <div className="add-user-container">
            <div className="add-user-top">
                <h1>
                {userId? 'ویرایش کاربر' : 'افزودن کاربر' }

                </h1>
                
            </div>

            <div className="add-user-bottom">

            <div className='add-user-grid'>
                <div className="name item item-1"> 
                    <label htmlFor="name">: نام و نام خانوادگی</label>
                    <input type="text" name="name" id="name" />
                    
                </div>
                <div className="username item item-2">
                    <label htmlFor="username">: نام کاربری</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="email item item-3">
                    <label htmlFor="email">: ایمیل</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div className='address-label item item-4'>

                <label htmlFor="">: آدرس</label>
                </div>
                     
                <div className="address item item-5">
                    <input type="text" placeholder='شهر'/>
                    <input type="text" placeholder='پلاک'/>
                </div>
                <div className="address item item-6">
                    <input type="text" placeholder='استان' />
                    <input type="text" placeholder='کدپستی'/>
                </div>
                    <div className="address item item-7">
                    <input type="text" placeholder='ادرس' /> 
                </div>
                <div className="btns item-8">
                    <button className='btn btn-add'>{userId ? 'ویرایش' : "افزودن"}</button>
                    <button className='btn btn-back'>بازگشت</button>
                </div> 
            </div>

       
            </div>
     </div>
    )
}


export default AddUserCompo;