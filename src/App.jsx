import { Route, Routes } from 'react-router'
import Layout from './Layout'
import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Pages/Login'
import ProductDetail from './Pages/ProductDetail'
import Guide from './Pages/Guide'
import { Contact } from 'lucide-react'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/guide' element={<Guide/>}/>
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/productdetail' element={<ProductDetail/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App