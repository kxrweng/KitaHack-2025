
const Footer = () => {

  
  return (
    <footer className="drop-shadow-md w-full h-full  bg-white text-black flex items-center justify-center px-8 md:px-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center w-full">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>

        <ul className="flex gap-6 text-sm font-semibold">
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Privacy Policy</li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Terms of Service</li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Contact</li>
        </ul>
      </div>
    </footer>
      
  );
}

export default Footer;
