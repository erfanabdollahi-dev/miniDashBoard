import React, { useEffect, useState } from 'react'
import './posts.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {  getPostService, getPostsPageService } from './services/PostService'
import { Confirm, Success } from '../../utils/AlertUtil'
const PostCompo = ()=>{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [searchPost, setSearchPost] = useState('')
    const [allPages, setAllpages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10;
    
    const getPages = async ()=>{
        const res = await getPostService();
        setAllpages(Math.ceil(res.data.length / limit))
    }
    
    const handleNextPage = ()=>{

        setCurrentPage(prev=>{
            return prev + 1
        })
    }
    const handlePrevPage = ()=>{
        setCurrentPage(prev=>{
            return prev - 1
        })
        
    }
    
    const handlePostDelete = (id)=>{
        Confirm(`کار شماره ${id} حذف شود؟`).then((res)=>{
            if(res.isConfirmed){
                
                const newPosts = posts.filter(p=> p.id != id)
                setPosts(newPosts)
                Success(`پست شماره ${id} حذف شد`)
            }
        })
        
    }
    useEffect(()=>{
        if(allPages == 0){
            
            getPages();
        }
        getPostsPageService(currentPage, limit).then((res)=>{
            setPosts(res.data)
        })
        
    },[currentPage])
    

    return(
        <>
        <div className="user-grid comment-grid">
        <div className="top">
        <h1>مدیریت پست ها</h1>
        <div className="input-submit">

        <input type="text" onChange={e=> setSearchPost(e.target.value)} placeholder='جستجو پست' />
        
        </div>
        </div>
        <div className="bottom">
        
        
        <table className='user-table'>
        <thead>
        <tr>
        <th>عملیات</th>
        <th>متن</th>
        <th>عنوان</th>
        <th >ایدی کاربر</th>
        <th>#</th>
        </tr>
        </thead>
        <tbody>
        {posts.length ? (
            
            posts.filter(u=>{
                if(!searchPost) return true;
                return(
                    u.title.toLowerCase().includes(searchPost.toLowerCase())
                    ||u.body.toLowerCase().includes(searchPost.toLowerCase())
                )
            }).map(u =>(
                <tr key={u.id}>
                <td>
                <i className='bin bx bxs-trash-alt' onClick={()=>handlePostDelete(u.id)} ></i>
                
                <i class='edit bx bxs-comment-detail 'onClick={()=> navigate(`/posts/comments/${u.id}`)}></i>
                
                </td>
                <td>{u.body}</td>
                <td>{u.title}</td>
                <td>{u.userId}</td>
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
        <div className=' g-btns p-btns'>
        <button disabled={currentPage == 1} className='g-btn g-prev' onClick={handlePrevPage}>
        <i className='bx bxs-chevrons-left'  ></i>
        </button>
        <h4>{currentPage}</h4>
        <button disabled={currentPage == allPages} className='g-btn g-next' onClick={handleNextPage} >
        <i className='bx bxs-chevrons-right'  ></i>
        </button>
        </div>
        </div>
        
        </>
        
    )
}


export default PostCompo;