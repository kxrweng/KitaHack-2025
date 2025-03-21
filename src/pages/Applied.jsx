import React, { useState } from "react";
import desktopImage from "../assets/desktop.jpg";
import ssmsLogo from "../assets/ssmslogo.webp";
import db_launch from "../assets/applied_db_launch.png";
import db_code_1 from "../assets/applied_db_code_1.png";
import db_code_2 from "../assets/applied_db_code_2.png";
import db_code_3 from "../assets/applied_db_code_3.png";

const Applied = () => {
  const [screen, setScreen] = useState(-1);
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkQuery = (expectedQuery, nextScreen) => {
    if (query.trim() === expectedQuery) {
      setFeedback("Correct.");
      setTimeout(() => {
        setFeedback("");
        setQuery(""); // Clear the query input
        setScreen(nextScreen);
      }, 1000);
    } else {
      setFeedback("Incorrect query. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {screen === -1 ? (
        <div className="border-2 border-gray-300 rounded-lg p-8 shadow-lg text-center w-[800px] h-[500px] flex items-center justify-center bg-white relative">
          <button 
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={() => setScreen(0)}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="border-2 border-gray-300 rounded-lg p-8 shadow-lg text-center w-[800px] h-[500px] flex items-center justify-center bg-white relative">
          {screen === 6 ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold">Congratulations! You have successfully finished this module.</h2>
              <button 
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer"
                onClick={() => setScreen(-1)}
              >
                Restart
              </button>
            </div>
          ) : screen === 5 ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={() => setScreen(6)}>
              <img src={db_code_3} alt="Next Screen" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black p-4 rounded-lg text-sm shadow-md">
                There are 2 books that satisfy this query.
              </div>
            </div>
          ) : screen === 4 ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img src={db_code_2} alt="Next Screen" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black p-4 rounded-lg text-sm shadow-md">
                Great Job! Now, SELECT only the books with book_genre 'Lifestyle' <br />
                Hint: use the WHERE clause.
              </div>
            </div>
          ) : screen === 3 ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img src={db_code_1} alt="Next Screen" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black p-4 rounded-lg text-sm shadow-md">
                SELECT all entries from the LOAN table. <br/> Type your SQL query below.
              </div>
            </div>
          ) : screen === 2 ? (
            <div className="relative w-full h-full" onClick={() => setScreen(3)}>
              <img src={db_code_1} alt="Next Screen" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black p-4 rounded-lg text-sm shadow-md">
                Great job! You've opened the query file. Now, let's learn some basic SQL commands.
              </div>
            </div>
          ) : screen === 1 ? (
            <div className="relative w-full h-full" onClick={() => setScreen(2)}>
              <img src={db_launch} alt="Next Screen" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black p-4 rounded-lg text-sm shadow-md">
                Right click on the Database and click New Query
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img src={desktopImage} alt="Desktop" className="w-full h-full object-cover rounded-lg" />
              <img 
                src={ssmsLogo} 
                alt="SSMS Logo" 
                className="absolute top-10 left-10 w-16 h-16 cursor-pointer hover:opacity-80"
                onClick={() => setScreen(1)}
              />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black p-4 rounded-lg text-sm shadow-md">
                Launch the MS SQL Server Application
              </div>
            </div>
          )}
        </div>
      )}
      {[3, 4].includes(screen) && (
        <div className="mt-4 flex flex-col items-center">
          <input
            type="text"
            className="border p-2 w-96"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter SQL query here..."
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => checkQuery(screen === 3 ? "SELECT * from LOAN" : "SELECT * from BOOK WHERE book_genre = 'Lifestyle'", screen + 1)}
          >
            Submit Query
          </button>
          {feedback && <div className="mt-2 text-black">{feedback}</div>}
        </div>
      )}
    </div>
  );
};

export default Applied;
