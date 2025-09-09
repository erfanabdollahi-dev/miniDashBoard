import React, { createContext } from 'react'

export const UserContext = createContext({

    users: 0,
    setUsers : ()=>{}
 
})
export const UserLenContext = createContext({

    atl: 0,
    setAtl : ()=>{}
 
})