import React, { useContext, useState } from 'react'
import loginimg from '../assets/lginimg1.png'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthcontextApi'


const Auth = ({ insideRegister }) => {
    const {isAuthorized,setisAuthorized}= useContext(tokenAuthContext)
  const [isLogin,setisLogin] = useState(false)
  const [inputData, setinputData] = useState({ username: "", email: "", password: "" })
  const navigate = useNavigate()
  console.log(inputData);


  const handleRegister = async (e) => {
    e.preventDefault()
    console.log('this is register');

    if (inputData.username && inputData.email && inputData.password) {
   //   api call

   try {
    const result = await registerAPI(inputData)
   // console.log(result);
    if(result.status==200){
      alert(`Welcome  ${result.data.username},Please login to explore our website`)
      setinputData({ username: "", email: "", password: "" })
      navigate('/login')

    }else{
      if(result.response.status==406)
      {
        alert(result.response.data)
        setinputData({ username: "", email: "", password: "" })
      }
    }
    
    
   } catch (error) {
    console.log(error);
    
   }

    } else {
      alert("please fill the form!!")
    }
  }


  //login
  const handleLogin = async(e)=>{
    e.preventDefault()
    if(inputData.email || inputData.password){

      try {
        const result = await loginAPI(inputData)
        if(result.status==200){
               sessionStorage.setItem("user",JSON.stringify(result.data.user))
                sessionStorage.setItem("token",result.data.token)
                setisLogin(true)
                setisAuthorized(true)
                setTimeout(() => {
                  
                setinputData({ username: "", email: "", password: "" })
                navigate('/')  //home
                setisLogin(false)
                }, 2000);

        }else if (result.response==404){
        alert(result.response.data)
        }
      } catch (error) {
        console.log(error);
        
      }
    }else{
      alert('please fil the empty form ')
    }
  }
  return (
    <>
      <div style={{ minHeight: '100vh', minWidth: '100%' }} className='d-flex justify-content-center align-items-center'>
        <div className='container w-75'>
          <div className='p-2 card shadow'>
            <div className='align-items-center row'>
              <div className="col-lg-6">
                <img height={'300px'} src={loginimg} className='image-fluid' alt="" />
              </div>
              <div className="col-lg-6">
                <h1 className='mt-2'><i className='fa-brands fa-docker'></i> Project Fair</h1>
                <h5 className='mt-2'>Sign {insideRegister ? 'up' : 'in'}  to your Account</h5>
                <Form>

                  {
                    insideRegister && <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3">

                      <Form.Control value={inputData.username} onChange={e => setinputData({ ...inputData, username: e.target.value })} type="text" placeholder="Username" />
                    </FloatingLabel>
                  }
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">

                    <Form.Control value={inputData.email} onChange={e => setinputData({ ...inputData, email: e.target.value })} type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={inputData.password} onChange={e => setinputData({ ...inputData, password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>
                  {
                    insideRegister ?

                      <div className='mt-3'>
                        <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                        <p>Already a User ?please click here to <Link to={'/login'} >Login</Link></p>
                      </div>
                      :
                      <div className='mt-3'>
                        <button onClick={handleLogin} className='btn btn-primary mb-2 d-flex'>Login
                          {isLogin &&  <Spinner className='ms-1' animation="border" variant="light" />}
                        </button>
                        <p>New User ?please click here to <Link to={'/register'} >Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Auth