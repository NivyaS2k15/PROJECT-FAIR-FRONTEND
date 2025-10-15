import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { removeUserProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextApi'

const View = () => {
  const {addProjectResponse,setaddProjectResponse} = useContext(addProjectResponseContext)
 const {editProjectResponse,seteditProjectResponse}= useContext(editProjectResponseContext)
  const [userProjects, setUserProjects] = useState([])
  useEffect(() => {
    getUserProject()
  }, [addProjectResponse,editProjectResponse])

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userProjectAPI(reqHeader)
        console.log("result",result.data);
        if (result.status == 200) {
          setUserProjects(result.data)
        }

      } catch (error) {
        console.log(error);

      }
    }
  }


  // delete
  const deleteproject = async (id)=>{
    const token = sessionStorage.getItem('token')
    if(token){

      //api call
       const reqHeader ={
           "Authorization" :`Bearer ${token}` 
        }
        try {
          
          const result = await removeUserProjectAPI(id,reqHeader)
          getUserProject()
          
        } catch (error) {
          console.log(error);
          
        }
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between '>
        <h1 className='text-warning'>All projects...</h1>
        <div>< Add /></div>
      </div>
      <div className='allProjects mt-2'>

      
      {
        userProjects?.length>0 ?
        userProjects?.map(projects=>(

  <div key={projects?._id} className='border rounded p-2 d-flex justify-content-between mb-3'>
          <h3>{projects?.title}</h3>
          <div className='d-flex align-items-center'>
            <div><Edit  projects={projects}/></div>
            <div className='btn'> <a href={projects?.github}><i className='fa-brands fa-github'></i></a></div>
            <button onClick={()=>deleteproject(projects?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
          </div>
        </div>



        )):
        <div className='text-warning fw-bolder'>NOt yet uploaded any projects.......</div>
      }
      </div>
    </>
  )
}

export default View