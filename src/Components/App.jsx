import React, { useState } from 'react'
import SidebarCompo from './Sidebar'
import ContentCompo from './Content'
import { SidebarContext } from './Contexts/SidebarContext'



function App() {
  
  const [showSidebar, setShowSidebar] = useState(true)

  
  return (
    <>
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
    </>
  )
}

export default App
