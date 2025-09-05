import React, { useState } from 'react'
import SidebarCompo from './Sidebar'
import ContentCompo from './Content'
import { SidebarContext } from './Contexts/SidebarContext'
import { BrowserRouter } from 'react-router-dom'



function App() {
  
  const [showSidebar, setShowSidebar] = useState(true)
  
  
  return (
    <>
    <BrowserRouter>
      <SidebarContext.Provider value={{showSidebar, setShowSidebar}}>
        <div className={`all ${showSidebar ? '': 'sidebar-closed'}`}>
        
        <main >
          <ContentCompo/>
        </main>
        
        <nav id='sidebar' className={`all ${showSidebar ? '': 'closed'}`}>
          <SidebarCompo/>
        </nav>
        
        </div>
      </SidebarContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
