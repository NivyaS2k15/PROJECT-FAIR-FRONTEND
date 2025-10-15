import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../services/allAPI'


const Projects = () => {
  const[searchKey,setsearchKey]=useState("")
useEffect(()=>{
  getAllProjects()
},[searchKey])
  const [allzProjects,setallzProjects]=useState([])

  
  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        "Authorization" :`Bearer ${token}`  
      }
      try {
        const result = await allProjectAPI(searchKey,reqHeader)
        if(result.status == 200 ){
          setallzProjects(result.data)
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  
  return (
   <>
  <Header/>
  <div className='container-fluid' style={{paddingTop:'150px'}}>

    <div className='d-flex justify-content-between'>
      <h1>All projects</h1>
      <input onChange={e=>setsearchKey(e.target.value)} type="text" placeholder='Search Projects by their Languages' className='form-control w-25' />

    </div>
    <Row className='mt-3'>
     {
      allzProjects?.length>0?
      allzProjects?.map((project, index) => (
  <Col className='mb-3' sm={12} md={6} lg={4} key={project._id || index}>
    <ProjectCard displayData={project} />
  </Col>
))
      :
      <div className='text-danger fw-bolder'>Project not yed uploaded</div>
     }
     
    </Row>
  </div>
   </>
  )
}

export default Projects