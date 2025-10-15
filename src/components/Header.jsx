import React, { useContext } from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { tokenAuthContext } from '../contexts/AuthcontextApi'

const Header = (insideDashboard) => {
  const navigate = useNavigate()
 const {isAuthorized,setisAuthorized}= useContext(tokenAuthContext)
  ///logout//
  const handlelogout=()=>{
    console.log("logout");
    sessionStorage.clear()
     setisAuthorized(false)
     navigate('/')
    
  }
  return (

    <>
      <Navbar style={{zIndex:1}} className="border rounded postion-fixed w-100">
        <Container>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <NavbarBrand style={{ color: 'white' }} className='text-light fw-bolder'>
              <i className="fa-brands fa-docker m-2"></i>
              Project fair

            </NavbarBrand>  </Link>
          {
               insideDashboard && <div className='ms-auto'>
                <button onClick={handlelogout} className='btn btn-link'>Logout <i className='fa-solid fa-right-from-bracket'></i></button>
               </div>
          }      
           </Container>
      </Navbar>
    </>

  )
}

export default Header