import './App.css'
import Home from "./pages/MainPage/Home"
import AboutUs from "./pages/MainPage/AboutUs"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PageLayout from './layouts/PageLayout'
import Introduction from './pages/CalibrationAssessment/Introduction'
import CareerInterest from './pages/CalibrationAssessment/CareerInterest'
import RecommendCareerInterest from './pages/CalibrationAssessment/RecommendCareerInterest'
import MbtiPersonalityCheck from './pages/CalibrationAssessment/MbtiPersonalityCheck'
import NewUserLayout from './layouts/NewUserLayout'

const App = () => {

  return (
  //  <BrowserRouter>
  //   <Routes>
  //     <Route path = "/" element = {<MbtiPersonalityCheck />}>
  //     <Route index element = {<Home />}></Route>
  //     <Route path ="about_us" element = {<AboutUs />}></Route>
  //     </Route>
  //   </Routes>
  //  </BrowserRouter>
  <BrowserRouter>
  <Routes>
    <Route path="/new_user" element={<NewUserLayout />}>
      <Route path="landing" element={<Introduction />} />
      <Route path="career_interest" element={<CareerInterest />} />
      <Route path="mbti_personality_check" element={<MbtiPersonalityCheck />} />
      <Route path="recommended_career_interest" element={<RecommendCareerInterest />} />
    </Route>
  </Routes>
</BrowserRouter>

  )
}

export default App
