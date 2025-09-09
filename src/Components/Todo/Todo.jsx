import React, { useEffect, useState } from 'react'
import './todo.css'
import { jpAxios } from '../../JpAxios'
import { Confirm, Success } from '../../utils/AlertUtil'



const TodoCompo = ()=>{
    
    const [todos, setTodos] = useState([])
    const [searchTodos, setSearchTodos] = useState('')
    const [allPages, setAllpages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10;
    
    
    useEffect(()=>{
        if(allPages == 0 ){
            jpAxios.get('/todos').then(res=>{
                setAllpages(Math.ceil(res.data.length / limit))
                console.log(Math.ceil(res.data.length / limit));
                
            })
        }
        jpAxios.get(`todos?_page=${currentPage}&_limit=${limit}`).then(res=>{
            setTodos(res.data);
            console.log(res.data);
            console.log(1);
            
            
        })
        
        
    },[currentPage])
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
    const handleCheck = (pt)=>{
        const updatedTodos = todos.map(t=>{
            return t.id == pt.id ? {...t, completed: !pt.completed} : t
        })
        setTodos(updatedTodos)
        
    }
    const handleDelete = (id)=>{
        Confirm(`کار شماره ${id} حذف شود؟`).then((res)=>{
            if(res.isConfirmed){

                const updatedTodos = todos.filter(t=> t.id != id )
                setTodos(updatedTodos)
                Success(`کار شماره ${id} حذف شد`)
            }
        })
        
    }
    return(
        <>
        <div className='todo-con'>
        <div className="todo-top">
        <h1>کارها</h1>
        <div className="input-submit">
        <input type="text" onChange={e=> setSearchTodos(e.target.value)} placeholder='جستجو  کار' />
        </div>
        </div>
        <div className="todo-mid">
        <ul className="todo-list">
        {todos.filter(t=>{
            return t.title.toLowerCase().includes(searchTodos.toLowerCase())
        }).map(t=>(
            <li>
            <div className={`todo-detail ${t.completed ? `check`: ``}`}>
            <div className="todo-btns">
            {t.completed ? (
                <button className='todo-btn todo-check ' onClick={()=>handleCheck(t)}><i className='bx bx-checkbox-checked'></i></button>
            ) : (
                <button className='todo-btn todo-uncheck ' onClick={()=>handleCheck(t)}><i className='bx bx-checkbox' ></i></button> 
            )}
            
            <button className='todo-btn todo-bin' onClick={()=>handleDelete(t.id)}><i className='bx bxs-trash-alt'></i></button>
            </div>
            <div className='todo-desc'>
            
            <p>{t.title}</p>
            
            </div>
            <div className="todo-id">
                <p>{t.id}</p>
            </div>
            </div>
            </li>
        ))}
        
        
        
        </ul>
        </div>
        <div className="todo-bottom">
        <div className='g-btns'>
        <button disabled={currentPage == 1} className='g-btn g-prev' onClick={handlePrevPage}>
        <i className='bx bxs-chevrons-left'  ></i>
        </button>
        <h4>{currentPage}</h4>
        <button disabled={currentPage == allPages} className='g-btn g-next' onClick={handleNextPage} >
        <i className='bx bxs-chevrons-right'  ></i>
        </button>
        </div>
        </div>
        </div>
        
        </>
        
    )
}


export default TodoCompo;