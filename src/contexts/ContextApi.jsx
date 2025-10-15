import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()  // context created
export const editProjectResponseContext = createContext()

const ContextApi = ({children}) => {

const [addProjectResponse,setaddProjectResponse]= useState("")
const [editProjectResponse,seteditProjectResponse]= useState("")
  return (
    <editProjectResponseContext.Provider value={{editProjectResponse,seteditProjectResponse}}>
    <addProjectResponseContext.Provider value={{addProjectResponse,setaddProjectResponse}}>
      {children}
    </addProjectResponseContext.Provider>
    </editProjectResponseContext.Provider>
  )
}

export default ContextApi