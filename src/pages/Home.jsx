import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imagelanding from '../assets/imglanding-Photoroom.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import profilecard from '../assets/profilecard.png'
import { getHomeProjectAPI } from '../services/allAPI'

const Home = () => {
  
  const navigate = useNavigate()

  const handleProjects = () => {
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    } else {
      alert("Please login to get full access")
    }
  }

  const [allHomeProjects, setAllHomeProjects] = useState([])

  useEffect(() => {
    getAllHomeProject()
  }, [])

  const getAllHomeProject = async () => {
    try {
      const result = await getHomeProjectAPI()
      if (result.status === 200) {
        setAllHomeProjects(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* Landing Section */}
      <div style={{ minHeight: "100vh" }} className='d-flex justify-content-between align-items-center shadow w-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className="col-lg-6">
              <h1 style={{ fontSize: '70px' }}>
                <i className='fa-brands fa-docker me-3'></i>Project Fair
              </h1>
              <p style={{ textAlign: 'justify' }}>
                One stop destination for all software development projects. Users can add and manage their projects, as well as access all available ones on our website. What are you waiting for?!
              </p>
              {
                sessionStorage.getItem("token")
                  ? <Link to='/dashboard' className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                  : <Link to='/login' className='btn btn-warning'>START TO EXPLORE</Link>
              }
            </div>
            <div className="col-lg-6">
              <img className='img-fluid' src={imagelanding} alt="landing" />
            </div>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div className='mt-5 text-center'>
        <h1 className='mb-5'>Explore Our Projects</h1>
        <marquee>
          <div className='d-flex'>
            {
              allHomeProjects.map((project) => (
                <div className='me-5' key={project._id}>
                  <ProjectCard displayData={project} />
                </div>
              ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-5'>
          CLICK HERE TO VIEW MORE PROJECTS.....
        </button>
      </div>

      {/* Testimonials Section */}
      <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
        <h1>Our Testimonials</h1>
        <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                <img
                  width='80px'
                  height='100px'
                  className='rounded-circle img-fluid'
                  src={profilecard}
                  alt="profile"
                />
                Miller Max
              </Card.Title>

              {/* ✅ Moved stars OUTSIDE Card.Text */}
              <div className='d-flex justify-content-center mb-2'>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
              </div>

              {/* ✅ Card.Text now contains only text */}
              <Card.Text style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur rem exercitationem impedit cupiditate quos.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home
