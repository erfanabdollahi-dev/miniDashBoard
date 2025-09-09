import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../users/userContext';

import { jpAxios } from '../../JpAxios';
import { setPostService, updatePostService } from './services/PostService';


const AddPostCompo = ()=>{
    const navigate = useNavigate()
    const {postId} = useParams();
    const {users, setUsers} = useContext(UserContext)
    const [data, setData] = useState({
        userId:'',
        id:'',
        title:'',
        body: ''
    })
    
    
    const handleAddPost = ()=>{
        if(!postId){
            setPostService(data)
        }
        else{
            
            updatePostService(data,postId)
        }
        navigate(-1)
    }
    
    useEffect(()=>{
        jpAxios.get('/users').then(res=>{
            setUsers(res.data)
        })
        if(postId){
            
            jpAxios.get(`/posts/${postId}`)
            .then(res=>{
                
                setData(res.data)
                console.log(res);
            })
        }
        console.log(users);
        
        
    },[])
    
    return (
        <div className="add-user-container">
        <div className="add-user-top">
        <h1>{postId ? "ویرایش پست" : "افزودن پست"}</h1>
        </div>
        
        <div className="add-user-bottom">
        <div className="add-post-grid">
        
        
        
        <div className="name item p-item">
        <label htmlFor="name">: نام کاربر</label>
        <select
        type="text"
        name="name"
        id="name"
        className='p-select'
        value={data.userId }
        onChange={(e) => setData({ ...data, userId: e.target.value })}
        >
        <option className='p-option' value="">کاربر مورد نظر را انتخاب کنید</option>
        {users.map((u) => (
            <option key={u.id} value={u.id}>
            {u.name}
            </option>
        ))}
        </select>
        </div>
        
        <div className="name item p-item">
        <label htmlFor="name">: ایدی کاربر</label>
        <input
        type="text"
        name="name"
        id="name"
        value={data.userId  }
        onChange={(e) => setData({ ...data, userId: e.target.value })}
        />
        </div>
        
        
        
        <div className="username item p-item">
        <label htmlFor="username">: عنوان</label>
        <input
        type="text"
        name="username"
        id="username"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        </div>
        
        <div className="email item p-item">
        <label htmlFor="email">: متن</label>
        <input
        type="text"
        name="email"
        id="email"
        value={data.body}
        onChange={(e) => setData({ ...data, body: e.target.value })}
        />
        </div>
        
        
        
        <div className="btns item-8">
        <button
        onClick={handleAddPost}
        className="btn btn-add"
        >
        {postId ? "ویرایش" : "افزودن"}
        </button>
        <button className="btn btn-back" onClick={() => navigate(-1)}>
        بازگشت
        </button>
        </div>
        </div>
        </div>
        </div>
    );
}

export default AddPostCompo