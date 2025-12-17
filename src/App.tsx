import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom' // Import Routes and Route
import Register from './pages/Register'
import DownLoad from './pages/DownLoad'
import { ToastContainer } from 'react-toastify'

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')

  // Load from localStorage on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem('lang')
    const savedDir = localStorage.getItem('dir')
    
    if (savedLang) setLang(savedLang as 'en' | 'ar')
    if (savedDir) setDir(savedDir as 'ltr' | 'rtl')
  }, [])

  const handleChange = () => {
    const newLang = lang === "en" ? 'ar' : 'en'
    const newDir = dir === "ltr" ? 'rtl' : 'ltr'
    
    setLang(newLang)
    setDir(newDir)
    localStorage.setItem("lang", newLang)
    localStorage.setItem("dir", newDir)
  }

  return (
    <div 
      dir={dir} 
      className='max-w-full max-h-[calc(100vh-50px)] overflow-x-hidden w-full bg-[#0B1035] bg-[linear-gradient(120deg,#000000_20%,#0B1035_100%)]  flex flex-col items-center gap-3 h-screen relative'
    >
      <Routes>
        <Route 
          path='/' 
          element={<Home handleChange={handleChange} lang={lang} />} 
        />
        <Route 
          path='/register' 
          element={<Register />} 
        />
        <Route 
          path='/download' 
          element={<DownLoad />} 
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={dir === 'rtl'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
       />
    </div>
  )
}

export default App