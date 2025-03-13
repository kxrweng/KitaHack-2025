import './App.css'
import Home from "./pages/MainPage/Home"
import AboutUs from "./pages/MainPage/AboutUs"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PageLayout from './layouts/PageLayout'
import Introduction from './pages/CalibrationAssessment/Introduction'

const App = () => {

  return (
   <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Introduction />}>
      <Route index element = {<Home />}></Route>
      <Route path ="about_us" element = {<AboutUs />}></Route>
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
