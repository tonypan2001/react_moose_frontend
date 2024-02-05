import { Routes, Route } from 'react-router-dom'
import Layout from './layout'
import Login from './pages/Login'
import Home from './pages/Home'
import useAuth from './store/useAuth'
import Register from './pages/Register'
import Profile from './pages/Profile'

function App() {
  const auth = useAuth()

  if (!auth) {
    return <Login/>
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
