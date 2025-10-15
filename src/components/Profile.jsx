import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profile2 from '../assets/profile2.png'
import SERVER_URL from '../services/serverURL';
import { updateUserAPI } from '../services/allAPI';
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [preview, setpreview] = useState("")
  const [existingProfilePic, setexistingProfilePic] = useState("")
  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profilePic: ""
  })


  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setuserDetails({
        ...userDetails, username: user.username, email: user.email, password: user.password,
        github: user.github, linkedin: user.linkedin
      })
      setexistingProfilePic(user.profilePic)
    }
  }, [open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setpreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setpreview("")
    }
  },[userDetails.profilePic])


  const  handleUserupdate = async()=>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if(github&&linkedin){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profilePic",profilePic):reqBody.append("existingProfilePic",existingProfilePic)
       const token = sessionStorage.getItem('token')
       if(token){
        const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
          try {
            const result = await updateUserAPI(reqBody,reqHeader)
            if(result.status == 200 ){
              alert("user profile updated successfully")
              sessionStorage.setItem("user",JSON.stringify(result.data))
              setOpen(!open)
            }
          } catch (error) {
            console.log(error);
            
          }
       }
    }else{
      alert("please fill the inform completely")
    }
  }
  return (
    <>
      <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-angle-down'></i></button>
      </div>
      {/* COLLAPSE */}
      <Collapse in={open}>
        <div id='example-collapse-text' className="row container-fluid align-items-center justify-content-center shadow p-2 rounded">
          <label className='text-center mt-2'>
            <input onChange={e=>setuserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{ display: 'none' }} />
            {
              existingProfilePic == " " ?
                <img height={'150px'} width={'150px'} className='image-fluid' src={preview?preview:profile2} alt="" />
                :
                <img height={'150px'} width={'150px'} className='image-fluid' src={preview?preview:`${SERVER_URL}/uploads/${existingProfilePic}`} alt="" />

            }                        </label>

          <div className='mt-3 w-100'>
            <input value={userDetails.github} onChange={e=>setuserDetails({...userDetails,github:e.target.value})} type="text" placeholder='USER GITHUB PROFILE LINK' className='form-control' />

          </div>
          <div className='mt-3 w-100'>
            <input value={userDetails.linkedin} onChange={e=>setuserDetails({...userDetails,linkedin:e.target.value})}  type="text" placeholder='USER  LINKED PROFILE LINK' className='form-control' />

          </div>
          <div className='d-grid mt-2 w-100'>
            <button onClick={handleUserupdate} className='btn btn-warning'> Updated Profile</button>

          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile