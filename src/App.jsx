import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import Header from './components/Header'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contexts/AuthcontextApi'
import { AuthcontextApi } from './contexts/AuthcontextApi'
import { Pnf } from './pages/pnf'

function App() {
  const { isAuthorized, setisAuthorized } = useContext(tokenAuthContext)

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setisAuthorized(true)
    } else {
      setisAuthorized(false)
    }
  }, [isAuthorized])

  return (
   
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          {isAuthorized && (
            <>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/projects' element={<Projects />} />
            </>
          )}
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={<Auth insideRegister={true} />} />
          <Route path='/*' element={<Pnf />} />
        </Routes>
        <Footer />
      </BrowserRouter>
 
  )
}

export default App