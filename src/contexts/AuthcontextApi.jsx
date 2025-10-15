import React, { createContext, useContext, useEffect, useState } from 'react'
export const tokenAuthContext = createContext()
export const AuthcontextApi = ({children}) => {
    const [isAuthorized,setisAuthorized]= useState()
   
  return (
<tokenAuthContext.Provider value={{isAuthorized,setisAuthorized}}>
    {children}
</tokenAuthContext.Provider>
  )
}
