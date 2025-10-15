import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import uploagimg from '../assets/uploagimg2.png';
import SERVER_URL from '../services/serverURL';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../contexts/ContextApi';

const Edit = ({ projects }) => {
  // Normalize image path
  const {editProjectResponse,seteditProjectResponse}= useContext(editProjectResponseContext)
  let normalizedPath = "";
  if (typeof projects.projectImg === "string") {
    normalizedPath = projects.projectImg.replace(/\\/g, "/");
  }
  const hasValidExtension = /\.(jpg|jpeg|png)$/i.test(normalizedPath);
  const finalPath = hasValidExtension ? normalizedPath : normalizedPath + ".png";

  const [projectdetails, setprojectdetails] = useState({
    id: projects._id,
    title: projects.title,
    languages: projects.languages,
    overview: projects.overview,
    github: projects.github,
    website: projects.website,
    projectImg: ""
  });

  const [imageFileStatus, setimageFileStatus] = useState(false);
  const [preview, setpreview] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      projectdetails.projectImg &&
      ["image/png", "image/jpg", "image/jpeg"].includes(projectdetails.projectImg.type)
    ) {
      setimageFileStatus(true);
      setpreview(URL.createObjectURL(projectdetails.projectImg));
    } else {
      setimageFileStatus(false);
      setpreview("");
      setprojectdetails(prev => ({ ...prev, projectImg: "" }));
    }
  }, [projectdetails.projectImg]);

  const handleClose = () => {
    setprojectdetails({
      id: projects._id,
      title: projects.title,
      languages: projects.languages,
      overview: projects.overview,
      github: projects.github,
      website: projects.website,
      projectImg: ""
    });
    setpreview("");
    setShow(false);
  };

  const handleShow = () => {
    setprojectdetails({
      id: projects._id,
      title: projects.title,
      languages: projects.languages,
      overview: projects.overview,
      github: projects.github,
      website: projects.website,
      projectImg: ""
    });
    setShow(true);
  };

  const handleUpdateProject = async () => {
    const { id, title, languages, overview, github, website, projectImg } = projectdetails;

    if (title && languages && overview && github && website) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      preview
        ? reqBody.append("projectImg", projectImg)
        : reqBody.append("projectImg", projects.projectImg);

      const token = sessionStorage.getItem('token');
      if (!token) {
        alert("Authentication token missing. Please log in again.");
        return;
      }

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await updateProjectAPI(id, reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          alert("Updated successfully!");
          handleClose();
          seteditProjectResponse(result)
        }
      } catch (error) {
        console.error("Update failed:", error);
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
      <button onClick={handleShow} className='btn'>
        <i className='fa-solid fa-edit'></i>
      </button>

      <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className="col-lg-4">
              <label>
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={e => setprojectdetails({ ...projectdetails, projectImg: e.target.files[0] })}
                  type="file"
                  style={{ display: 'none' }}
                />
                <img
                  className="img-fluid rounded"
                  style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                  src={preview ? preview : `${SERVER_URL}/${finalPath}`}
                  alt="Project Preview"
                />
              </label>
              {!imageFileStatus && (
                <div className='text-warning fw-bolder'>
                  *Upload only jpeg, jpg, or png files.
                </div>
              )}
            </div>
            <div className="col-lg-8">
              <div className='mb-2 mt-2'>
                <input
                  value={projectdetails.title}
                  onChange={e => setprojectdetails({ ...projectdetails, title: e.target.value })}
                  type="text"
                  placeholder='Project Title'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <input
                  value={projectdetails.languages}
                  onChange={e => setprojectdetails({ ...projectdetails, languages: e.target.value })}
                  type="text"
                  placeholder='Languages Used'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <input
                  value={projectdetails.overview}
                  onChange={e => setprojectdetails({ ...projectdetails, overview: e.target.value })}
                  type="text"
                  placeholder='Project Overview'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <input
                  value={projectdetails.github}
                  onChange={e => setprojectdetails({ ...projectdetails, github: e.target.value })}
                  type="text"
                  placeholder='GitHub Link'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <input
                  value={projectdetails.website}
                  onChange={e => setprojectdetails({ ...projectdetails, website: e.target.value })}
                  type="text"
                  placeholder='Website Link'
                  className='form-control'
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;