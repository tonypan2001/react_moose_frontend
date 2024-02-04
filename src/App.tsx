import { Routes, Route } from 'react-router-dom'
import Layout from './layout'
import Login from './pages/Login'
import Home from './pages/Home'
import useAuth from './store/useAuth'

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
          <Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
