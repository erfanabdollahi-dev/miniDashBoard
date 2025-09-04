import React, { createContext } from 'react'


export const SidebarContext = createContext({
    showSidebar: false,
    setShowSidebar: ()=>{}
});

