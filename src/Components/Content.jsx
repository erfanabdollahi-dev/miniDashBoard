import React, { useState } from 'react'
import UsersCompo from './users/Users';
import PostCompo from './Posts/Posts';
import GalleryCompo from './Gallery/Gallery';
import TodoCompo from './Todo/Todo';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddUserCompo from './users/AddUser';
import { UserContext, UserLenContext } from './users/userContext';

const ContentCompo = ()=>{
    const [isUser, setIsUser] = useState(true)

    const [users, setUsers] = useState([])
    const [ atl, setAtl] = useState(0)
 

    return(
            <>

                <div className='container'>
                    <UserContext.Provider value={{users, setUsers}}>
                    <UserLenContext.Provider value={{atl ,setAtl}}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/users" replace />} />
                        
                        <Route path='/users' element={isUser ? <UsersCompo/> : <Navigate to={'/todo'} />} />
                        <Route path='/users/add' element={<AddUserCompo/>} >
                            <Route path=':userId' element={<AddUserCompo/>}/>
                        </Route>
                        <Route path='/posts' element={<PostCompo/>} />
                        <Route path='/gallery' element={<GalleryCompo/>} />
                        <Route path='/todo' element={<TodoCompo/>} />

                         <Route path="*" element={<Navigate to="/users" replace />} />
                    </Routes>
                        </UserLenContext.Provider>
                        </UserContext.Provider>
                </div>
            
            </>
    
    )
}


export default ContentCompo;