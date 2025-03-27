import React, { useState } from "react";
import db_code_4 from "/src/assets/applied_db_code_4.png";
import db_code_5 from "/src/assets/applied_db_code_5.png";

const AppliedScenario = () => {
  const [screen, setScreen] = useState(1);
  const goalSpeed = 5;

  const testSpeed = (event) => {
    event.stopPropagation(); // Prevent parent div click from triggering
    setScreen(4);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      {/* Description and Problem Statement */}
      <div className="w-[900px] bg-white p-6 mb-4 shadow-lg rounded-lg text-gray-700">
        <h2 className="text-xl font-bold mb-2">Description:</h2>
        <p className="mb-4">
          You're managing a web application that handles book loan records for a library. One of the
          critical features is generating daily reports of the number of books loaned, the total amount of fines imposed, and the most popular books.
        </p>
        <h2 className="text-xl font-bold mb-2">Problem:</h2>
        <p>
          The query used to generate the report is taking too long to execute, often resulting in delays
          and frustration. The report used to generate in just a few seconds, but recently it has started to take
          several minutes or even longer to complete. This slow query is impacting the team's ability to make timely decisions.
        </p>
      </div>

      {/* Main Content Frame */}
      <div className="flex border shadow-lg bg-white rounded-lg w-[900px] h-[500px]">
        {/* Main Frame */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 border-r">
          {screen === 1 && (
            <div className="text-center">
              <p className="mb-4">Average Retrieval Time: <strong>20s</strong></p>
              <p className="mb-4">Goal: <strong>5s</strong></p>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 cursor-pointer"
                onClick={() => setScreen(2)}
              >
                Start
              </button>
            </div>
          )}

          {screen === 2 && (
            <div className="flex flex-col items-center w-full h-full" onClick={() => setScreen(3)}>
              <img src={db_code_4} alt="Optimization Step" className="w-[100%] h-[400px] object-contain mb-4" />
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 cursor-pointer"
                onClick={testSpeed}
              >
                Test Speed
              </button>
            </div>
          )}

          {screen === 3 && (
            <div className="flex flex-col items-center w-full h-full" onClick={() => setScreen(2)}>
              <img src={db_code_5} alt="Optimization Step" className="w-[100%] h-[400px] object-contain mb-4" />
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 cursor-pointer"
                onClick={testSpeed}
              >
                Test Speed
              </button>
            </div>
          )}

          {screen === 4 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Speed Test Result</h2>
              <p>Goal Speed: <strong>{goalSpeed}s</strong></p>
              <p>Current Speed: <strong>{goalSpeed}s</strong></p>
              <p className="text-green-600 font-bold mt-4">Congratulations! Query is optimized.</p>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 cursor-pointer mt-4"
                onClick={() => setScreen(1)}
              >
                Restart
              </button>
            </div>
          )}
        </div>

        {/* Hint Section */}
        <div className="w-[250px] bg-gray-200 p-4 text-sm">
          <h3 className="text-lg font-bold mb-2">Performance Factors</h3><br />
          <ul className="list-disc pl-4">
            <li><strong>Database Design</strong></li><br />
            <li><strong>Queries</strong> <br /> (Hint: Check query speed and optimize)</li><br />
            <li><strong>Data Growth</strong> <br /> (Hint: Consider table partitioning)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppliedScenario;
