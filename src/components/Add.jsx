import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploagimg from '../assets/uploagimg2.png'
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextApi';

const Add = () => {
  
  const {addProjectResponse,setaddProjectResponse} = useContext(addProjectResponseContext)
  const [projectdetails, setprojectdetails] = useState({
    title: "",
    languages: "",
    overview: "",
    github: "",
    website: "",
    projectImg: ""

  })
  const [imageFileStatus, setimageFileStatus] = useState(false)
  const [preview, setpreview] = useState("")
  console.log(projectdetails);


  useEffect(() => {
    if (projectdetails.projectImg.type == "image/png" || projectdetails.projectImg.type == "image/jpg" || projectdetails.projectImg.type == "image/jpeg")
    //valid image
    {
      setimageFileStatus(true)
      setpreview(URL.createObjectURL(projectdetails.projectImg))
    } else {
      //invalid image
      setimageFileStatus(false)
      setpreview("")
      setprojectdetails({ ...projectdetails, projectImg: "" })
    }
  }, [projectdetails.projectImg])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setpreview("")
    setimageFileStatus(false)
    setprojectdetails({
      title: "",
      languages: "",
      overview: "",
      github: "",
      website: "",
      projectImg: ""
    })
  }
  const handleShow = () => setShow(true);
  //add project
  const addProject = async ()=>{
    const{title,languages,overview,github,website,projectImg} = projectdetails
    if(title && languages && overview && github && website && projectImg){
     // alert("proceed api call")

      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader ={
          "Content-Type" : "multipart/form-data",
          "Authorization" :`Bearer ${token}` 
        }

        // make api call
        try {
          const result = await addProjectAPI(reqBody,reqHeader)
          if(result.status == 200){
             alert("Project  added successfully")
             setaddProjectResponse(result)
             handleClose()
          }else{
                
            alert(result.response.data)
          }
        } catch (error) {
          console.log(error);
          
        }
      }
    }else{
      alert("Please fill the form")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'>+ New Project</button>
      {/* modaal */}

      <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Add project details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className="col-lg-4">
              <label>
                <input accept="image/png, image/jpeg, image/jpg"
                  onChange={e => setprojectdetails({ ...projectdetails, projectImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img className="img-fluid rounded" style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}src={preview ? preview : uploagimg}alt="Project Preview"/>
              </label>
              {/* warning msg */}
              {
                !(imageFileStatus) && <div className='text-warning fw-bolder '>*Upload only the following file types(jpeg,jpg,png),here!!!</div>
              }
            </div>
            <div className="col-lg-8 ">
              <div className='mb-2 mt-2'>
                <input value={projectdetails.title} onChange={e => setprojectdetails({ ...projectdetails, title: e.target.value })} type="text" placeholder='Project Title' className='form-control' />

              </div>
              <div className='mb-2'>
                <input value={projectdetails.languages} onChange={e => setprojectdetails({ ...projectdetails, languages: e.target.value })} type="text" placeholder='Languaged used in project' className='form-control' />

              </div>
              <div className='mb-2'>
                <input value={projectdetails.overview} onChange={e => setprojectdetails({ ...projectdetails, overview: e.target.value })} type="text" placeholder='Project Overview' className='form-control' />

              </div>
              <div className='mb-2'>
                <input value={projectdetails.github} onChange={e => setprojectdetails({ ...projectdetails, github: e.target.value })} type="text" placeholder='Project Github Link' className='form-control' />

              </div>
              <div className='mb-2'>
                <input onChange={e => setprojectdetails({ ...projectdetails, website: e.target.value })} value={projectdetails.website} type="text" placeholder='Project website Link' className='form-control' />

              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add