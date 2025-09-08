import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCommentsService } from './services/CommentsService';
import { Confirm, Success } from '../../utils/AlertUtil';


const PostCommentsCompo = ()=>{
    const navigate = useNavigate()
    const {postId} = useParams()
    const [comments , setComments] = useState([]);
    const [searchComments, setSearchComments ] = useState('')
    
    const getComments =async ()=>{
        const res = await getCommentsService(postId);
        setComments(res.data)
        console.log(res.data);
        
    }
    const handleCommentDelete = (id)=>{
        Confirm(`کامنت شماره ${id} حذف شود؟`).then((res)=>{
            if(res.isConfirmed){
                
                const newComments = comments.filter(c => c.id !=id)
                setComments(newComments)
                Success(`کامنت شماره ${id} حذف شد`)
            }
        })
        
        
    }
    
    useEffect(()=>{
        getComments();
    },[])
    
    return(
        <>
        <div className="user-grid comment-grid">
        <div className="top">
        <h1>مدریت کامت ها</h1>
        <div className="input-submit">
        
        <input type="text" onChange={e=> setSearchComments(e.target.value)} placeholder='جستجو کامنت' />
        
        </div>
        </div>
        <div className="comment-bottom bottom">
        
        
        <table className='user-table '>
        <thead>
        <tr>
        <th>عملیات</th>
        <th>متن</th>
        <th>ایمیل</th>
        <th>نام</th>
        <th >ایدی پست</th>
        <th>#</th>
        </tr>
        </thead>
        <tbody>
        {comments.length ? (
            
            comments.filter(u=>{
                if(!searchComments) return true;
                return(
                    u.body.toLowerCase().includes(searchComments.toLowerCase())
                    ||u.name.toLowerCase().includes(searchComments.toLowerCase())
                    ||u.email.toLowerCase().includes(searchComments.toLowerCase())
                )
            }).map(u =>(
                <tr key={u.id}>
                <td>
                <i className='bin bx bxs-trash-alt' onClick={()=>handleCommentDelete(u.id)} ></i>
                
                
                
                </td>
                <td>{u.body}</td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.postId}</td>
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
        
        
        
        <div className="comment-btn">
        <button className="btn btn-back" onClick={() => navigate(-1)}>
        بازگشت
        </button>
        </div>
        </div>
        
        </div>
        
        </>
        
    )
}


export default PostCommentsCompo;