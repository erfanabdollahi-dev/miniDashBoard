import React from 'react'
import UsersCompo from './users/Users';
import PostCompo from './Posts/Posts';
import GalleryCompo from './Gallery/Gallery';
import TodoCompo from './Todo/Todo';

const ContentCompo = ()=>{
    return(
            <>

                <div className='container'>
                    <UsersCompo/>
                    {/* <PostCompo/>
                    <GalleryCompo/>
                    <TodoCompo/> */}
                </div>
            
            </>
    
    )
}


export default ContentCompo;