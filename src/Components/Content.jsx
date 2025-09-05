import React, { useState } from 'react'
import UsersCompo from './users/Users';
import PostCompo from './Posts/Posts';
import GalleryCompo from './Gallery/Gallery';
import TodoCompo from './Todo/Todo';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddUserCompo from './users/AddUser';

const ContentCompo = ()=>{
    const [isUser, setIsUser] = useState(true)
    return(
            <>

                <div className='container'>
                    <Routes>
                        <Route path='/users' element={isUser ? <UsersCompo/> : <Navigate to={'/todo'} />} />
                        <Route path='/users/add' element={<AddUserCompo/>} />
                        <Route path='/posts' element={<PostCompo/>} />
                        <Route path='/gallery' element={<GalleryCompo/>} />
                        <Route path='/todo' element={<TodoCompo/>} />
                        <Route path='*' element={<UsersCompo/>} />
                    </Routes>
                </div>
            
            </>
    
    )
}


export default ContentCompo;