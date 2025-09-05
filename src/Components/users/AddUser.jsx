import React, { useContext, useState } from 'react'
import './AddUser.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { UserContext, UserLenContext } from './userContext';


const AddUserCompo = ()=>{

    const {userId} = useParams();
    const param = useLocation()
    const navigate= useNavigate()
    const {users, setUsers} = useContext(UserContext)
    const {atl, setAtl} = useContext(UserLenContext)

    const [data, setData] = useState({
        name:'',
        username:'',
        email:'',
        address: {
            street:'',
            city:'',
            suite: '',
            zipcode: '',
        }
    })

    const handelAddUser = (props)=>{
        console.log(data)
        axios.post('https://jsonplaceholder.typicode.com/users', data)
        .then(res=>{
            
            const nexId = atl + 1
            setAtl(atl+1)
            setUsers([...users, {...data, id: nexId}])
            console.log(res)

        })
        navigate('/users')
    }

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
                    <input type="text" name="name" id="name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
                    
                </div>
                <div className="username item item-2">
                    <label htmlFor="username">: نام کاربری</label>
                    <input type="text" name="username" id="username" value={data.username} onChange={(e)=>setData({...data,username:e.target.value})}/>
                </div>
                <div className="email item item-3">
                    <label htmlFor="email">: ایمیل</label>
                    <input type="text" name="email" id="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                </div>
                <div className='address-label item item-4'>

                <label htmlFor="">: آدرس</label>
                </div>
                     
                <div className="address item item-5">
                    <input type="text" placeholder='شهر' value={data.address.city} onChange={(e)=>setData({...data,address:{...data.address, city:e.target.value}})}/>
                    <input type="text" placeholder='پلاک' value={data.address.street} onChange={(e)=>setData({...data,address:{...data.address, street:e.target.value}})}/>
                </div>
                <div className="address item item-6">
                    <input type="text" placeholder='استان' />
                    <input type="text" placeholder='کدپستی' value={data.address.zipcode} onChange={(e)=>setData({...data,address:{...data.address, zipcode:e.target.value}})}/>
                </div>
                    <div className="address item item-7">
                    <input type="text" placeholder='ادرس' value={data.address.suite} onChange={(e)=>setData({...data,address:{...data.address, suite:e.target.value}})}/> 
                </div>
                <div className="btns item-8">
                    <button onClick={userId ? '': handelAddUser} className='btn btn-add'>{userId ? 'ویرایش' : "افزودن"}</button>
                    <button className='btn btn-back' onClick={()=> navigate(-1)}>بازگشت</button>
                </div> 
            </div>

       
            </div>
     </div>
    )
}


export default AddUserCompo;