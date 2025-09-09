import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../users/userContext';

import { jpAxios } from '../../JpAxios';
import { setPostService, updatePostService } from './services/PostService';
import { init, reducer } from './postReducer';






const AddPostCompo = ()=>{
    const navigate = useNavigate()
    const {postId} = useParams();
    const [data, dispatch] = useReducer(reducer, init)
    
    const setInputValues = (e,propName)=>{
        dispatch({
            type: 'setInputValue',
            propName: propName,
            propValue: e.target.value
        })
        
    }
    const handleAddPost = ()=>{
        if(!postId){
            setPostService(data.postData)
        }
        else{
            
            updatePostService(data.postData,postId)
        }
        navigate(-1)
    }
    
    useEffect(()=>{
        jpAxios.get('/users').then(res=>{
            
            dispatch({
                type: 'userInit',
                payload: res.data
            })
        })
        if(postId){
            
            jpAxios.get(`/posts/${postId}`)
            .then(res=>{
                
                dispatch({
                    type: 'isUpdate',
                    payload: res.data
                })
                
            })
        }
        
        
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
        value={data.postData.userId }
        onChange={(e) => setInputValues(e,"userId")}
        >
        <option className='p-option' value="">کاربر مورد نظر را انتخاب کنید</option>
        {data.users.map((u) => (
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
        value={data.postData.userId  }
        onChange={(e) => setInputValues(e,"userId")}
        />
        </div>
        
        
        
        <div className="username item p-item">
        <label htmlFor="username">: عنوان</label>
        <input
        type="text"
        name="username"
        id="username"
        value={data.postData.title}
        onChange={(e) => setInputValues(e,"title")}
        />
        </div>
        
        <div className="email item p-item">
        <label htmlFor="email">: متن</label>
        <input
        type="text"
        name="email"
        id="email"
        value={data.postData.body}
        onChange={(e) => setInputValues(e,"body")}
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