import './App.css'
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PageLayout from './layouts/PageLayout'

const App = () => {

  return (
   <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<PageLayout />}>
      <Route index element = {<Home />}></Route>
      <Route path ="about_us" element = {<AboutUs />}></Route>
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
