import React, { useState } from "react";
import desktopImage from "../assets/desktop.jpg";
import ssmsLogo from "../assets/ssmslogo.webp";
import mysqlLogo from "../assets/mysqllogo.svg";
import mongodbLogo from "../assets/mongodblogo.png";
import db_connect from "../assets/applied_db_connect.png";
import db_launch from "../assets/applied_db_launch.png";
import db_code_1 from "../assets/applied_db_code_1.png";
import db_code_2 from "../assets/applied_db_code_2.png";
import db_code_3 from "../assets/applied_db_code_3.png";

const AppliedTask = () => {
  const [screen, setScreen] = useState(-1); // Start screen by default
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hovering, setHovering] = useState(false);

  const checkQuery = (expectedQuery, nextScreen) => {
    if (query.trim().toUpperCase() === expectedQuery.toUpperCase()) {
      setFeedback("Correct.");
      setTimeout(() => {
        setFeedback("");
        setQuery("");
        setScreen(nextScreen);
      }, 1000);
    } else {
      setFeedback("Incorrect query. Please try again.");
    }
  };

  // To manage feedback on hover and reset it when leaving hover areas
  const handleHover = (message) => {
    setFeedback(message);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setFeedback("");
    setHovering(false);
  };

  const handleClick = () => {
    if (screen === 5) {
      // Move to screen 6 after clicking anywhere on screen 5
      setScreen(6);
    }
  };

  const restartGame = () => {
    setScreen(-1); // Go back to the start screen
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative"
      onClick={handleClick} // Click anywhere to proceed from screen 5 to 6
    >
      {screen === -1 ? (
        // Start screen
        <div className="border-2 border-gray-300 rounded-lg p-8 shadow-lg text-center w-[800px] h-[500px] flex flex-col items-center justify-center bg-white relative">
          <button
            onClick={() => setScreen(0)} // After start, go to screen 0 (Select Database)
            className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer mt-4"
          >
            Start
          </button>
        </div>
      ) : screen === 0 ? (
        // Database selection screen
        <div className="border-2 border-gray-300 rounded-lg p-8 shadow-lg text-center w-[800px] h-[500px] flex flex-col items-center justify-center bg-white relative">
          <h2 className="text-2xl font-bold mb-4">Select Your Database Application</h2>
          <br /><br />
          <div className="flex space-x-20">
            <div className="cursor-pointer" onClick={() => setScreen(1)}>
              <img src={ssmsLogo} alt="SSMS" className="w-32 h-32" />
              <p><br />SQL Server</p>
            </div>
            <div className="cursor" onClick={() => {}}>
              <img src={mongodbLogo} alt="MongoDB" className="w-52 h-32" />
              <p><br />MongoDB</p>
            </div>
            <div className="cursor" onClick={() => {}}>
              <img src={mysqlLogo} alt="MySQL" className="w-32 h-32" />
              <p><br />MySQL</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-gray-300 rounded-lg p-8 shadow-lg text-center w-[800px] h-[500px] flex flex-col items-center justify-center bg-white relative">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {screen === 3 ? (
              <>
                <img src={db_code_1} alt="SQL Query" className="w-full h-full object-cover rounded-lg mb-4" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter SQL query here"
                  className="border p-2 rounded w-[70%]"
                />
                <button
                  onClick={() => checkQuery("SELECT * FROM LOAN", 4)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Submit
                </button>
              </>
            ) : screen === 4 ? (
              <>
                <img src={db_code_2} alt="SQL Query" className="w-full h-full object-cover rounded-lg mb-4" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter SQL query here"
                  className="border p-2 rounded w-[70%]"
                />
                <button
                  onClick={() => checkQuery("SELECT * FROM BOOK WHERE book_genre = 'Lifestyle'", 5)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Submit
                </button>
              </>
            ) : screen === 6 ? (
              <>
                <h2 className="text-2xl font-bold">Congratulations! You have successfully finished this task.</h2>
                <button
                  onClick={restartGame}
                  className="mt-4 bg-blue-500 text-white px-6 py-3 rounded cursor-pointer"
                >
                  Restart
                </button>
              </>
            ) : screen === 5 ? (
              <div className="relative">
                <img
                  src={db_code_3} // Display image on screen 5
                  alt="SQL Query Result"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : screen === 2 ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={db_launch} alt="Next Screen" className="w-full h-full object-cover rounded-lg" />
                {/* Hover areas */}
                <div
                  className="absolute top-0 left-0 w-1/2 h-full"
                  onMouseEnter={() => handleHover("This is the Object Explorer, where you can view and manage all object components.")}
                  onMouseLeave={handleMouseLeave}
                />
                <div
                  className="absolute top-0 right-0 w-1/2 h-full"
                  onMouseEnter={() => handleHover("This is the Query Editor, where you can write the SQL commands.")}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setScreen(3)}
                />
              </div>
            ) : screen === 1 ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={db_connect} alt="Next Screen" className="w-full h-full object-cover rounded-lg" />
                <div 
                  className="absolute bottom-[45px] left-[42%] w-[20px] h-[20px] cursor-pointer"
                  onClick={() => setScreen(2)}
                  title="Click to Connect"
                />
              </div>
            ) : (
              <>
                <img src={desktopImage} alt="Desktop" className="w-full h-full object-cover rounded-lg" />
                <img 
                  src={ssmsLogo} 
                  alt="SSMS Logo" 
                  className="absolute top-10 left-10 w-16 h-16 cursor-pointer hover:opacity-80"
                  onClick={() => setScreen(1)}
                />
              </>
            )}
          </div>
        </div>
      )}
      <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black p-4 rounded-lg text-sm shadow-md text-center w-auto">
        {/* Handle Screen 4 Hint */}
        {screen === 4 ? (
          <div>Great! Now SELECT all books with the genre 'Lifestyle' from the BOOK table.</div>
        ) : screen === 5 ? (
          <div>There are 2 books with this book genre. Click anywhere to continue.</div>
        ) : feedback ? (
          <div>{feedback}</div>
        ) : (
          // Display specific hint for screen 1, screen 2, and when the user isn't hovering
          screen === 1 ? (
            <div>Connect to the SQL Server.</div>
          ) : screen === 2 && !hovering ? (
            <div className="mt-2 text-black text-center">
              This is the interface. Hover on different sections for more details. Click on anywhere to proceed.
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default AppliedTask;
