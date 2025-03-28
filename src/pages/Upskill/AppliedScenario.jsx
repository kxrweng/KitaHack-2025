import React, { useState } from "react";

const AppliedScenario = () => {
  const [screen, setScreen] = useState(1);
  const [code, setCode] = useState(`-- Generate a report about the loan status and book information
SELECT 
    Loan.loan_id AS LoanID,
    Loan.member_id AS MemberID,
    Member.member_name AS MemberName,
    Member.member_email AS MemberEmail,
    Loan.book_id AS BookID,
    Copy.book_status AS BookStatus,
    Book.book_title AS BookTitle,
    Book.book_genre AS BookGenre,
    Category.category_name AS Category,
    Loan.loan_date AS LoanDate,
    Loan.due_date AS DueDate,
    Loan.return_date AS ReturnDate,
    DATEDIFF(DAY, Loan.due_date, GETDATE()) AS DaysOverdue,
    Fine.fine_amount AS FineAmount
FROM 
    Loan
INNER JOIN 
    Member ON Loan.member_id = Member.member_id
INNER JOIN 
    Copy ON Loan.book_id = Copy.book_id
INNER JOIN 
    Book ON Copy.book_isbn = Book.book_isbn
INNER JOIN 
    Category ON Book.category_id = Category.category_id
LEFT JOIN 
    Fine ON Fine.loan_id = Loan.loan_id
WHERE
    Loan.return_date IS NULL OR Loan.return_date > Loan.due_date
ORDER BY 
    Loan.loan_date DESC;`);
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
      <div className="border shadow-lg bg-white rounded-lg w-[900px] h-[500px] flex flex-col justify-center p-6">
        {screen === 1 && (
          <div className="text-center flex flex-col justify-center items-center h-full">
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

        {(screen === 2 || screen === 3) && (
          <div className="flex flex-col items-center w-full h-full p-4" onClick={() => setScreen(screen === 2 ? 3 : 2)}>
            <h2 className="text-lg font-bold mb-2">Optimize the following query:</h2>
            <textarea 
              className="w-full h-full p-2 border rounded bg-gray-100" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 cursor-pointer mt-4"
              onClick={testSpeed}
            >
              Test Speed
            </button>
          </div>
        )}

        {screen === 4 && (
          <div className="text-center flex flex-col justify-center items-center h-full">
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
    </div>
  );
};

export default AppliedScenario;
