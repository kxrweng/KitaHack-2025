import './App.css'
import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {

  return (
   <BrowserRouter>
    <Routes>
      <Route index element = {<Header />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
