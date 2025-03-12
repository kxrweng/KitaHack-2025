import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg'
const Header = () => {

  const navigate = useNavigate();

  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(prevStatus => !prevStatus)

  return (
        <header
         className = "flex justify-between h-full items-center text-black py-3 px-8 md:px-32 bg-white drop-shadow-md"> 
          <a href = "a">
            <img src = {logo} alt = "" className = " hover:scale-105 transition-all"/>
          </a>
          <ul className = "hidden xl:flex items-center gap-12 font-semibold text-base">
            <li 
            className = "p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"
            onClick = {() => navigate("/")}
            >
              Home
            </li>
            <li 
            className = "p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"
            onClick = {() => navigate("/about_us")}
            >
              About Us
            </li>
          </ul>
          <div className = "relative hidden md:flex items-center justify-center gap-3">
            <i className = "bx bx-search absolute left-3 text-2xl text-gray-500"></i>
            <input type = "text" placeholder = "Search..." className = "py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500" />
          </div>

          <i onClick={toggleMenu} className="bx bx-menu hidden 2xl:hidden text-3xl cursor-pointer"></i>

          <div className = {`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`} style = {{transition : "transform 0.3s ease, opacity 0.3s ease"}}>
            <li className = "list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
              Personalised Learning
            </li>

            <li className = "list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
              Career Coaching
            </li>
          </div>
        </header>
  )
}

export default Header