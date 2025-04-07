import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router';
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from '@google/genai';

const ResumeReview = () => {
  // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const stringifiedResumeReviewChatHistory = localStorage.getItem(
    'resumeReviewChatHistory'
  );
  const [resultFromApi, setResultsFromApi] = useState(
    stringifiedResumeReviewChatHistory
      ? JSON.parse(stringifiedResumeReviewChatHistory)
      : []
  );
  const location = useLocation();
  const navigate = useNavigate();
  const file = location?.state?.file;
  resultFromApi;

  const uploadFileAndGenerateContent = async () => {
    try {
      // Upload the file
      const myfile = await ai.files.upload({
        file: file, // Use the file passed from location.state
        config: { mimeType: file.type }, // Get MIME type from the file object
      });

      'Uploaded file:', myfile;

      const result = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        config: {
          maxOutputTokens: 100,
          candidateCount: 1,
          temperature: 0.5,
          systemInstruction: `Don't give too long of a response `,
        },

        contents: [
          createUserContent([
            'Praise / Critise the resume.',
            createPartFromUri(myfile.uri, file.mimeType),
          ]),
        ],
      });
      const content = result.candidates[0].content;
      setResultsFromApi([content]); // wrap in array for consistency
      localStorage.setItem(
        'resumeReviewChatHistory',
        JSON.stringify([content])
      );

      // setConversation([...result]);
      'Generated content:', result;
    } catch (error) {
      console.error('Error uploading file or generating content:', error);
    }
  };

  const handleGetFeedback = async () => {
    if (file) {
      uploadFileAndGenerateContent();
    }
  };
  // useEffect(() => {
  //   if (file) {
  //     const uploadFileAndGenerateContent = async () => {
  //       try {
  //         // Upload the file
  //         const myfile = await ai.files.upload({
  //           file: file, // Use the file passed from location.state
  //           config: { mimeType: file.type }, // Get MIME type from the file object
  //         });

  //         ('Uploaded file:', myfile);

  //         const result = await ai.models.generateContent({
  //           model: 'gemini-2.0-flash',
  //           config: {
  //             maxOutputTokens: 100,
  //             candidateCount: 1,
  //             temperature: 0.5,
  //             systemInstruction: `Don't give too long of a response `,
  //           },

  //           contents: [
  //             createUserContent([
  //               'Praise / Critise the resume.',
  //               createPartFromUri(myfile.uri, file.mimeType),
  //             ]),
  //           ],
  //         });
  //         const content = result.candidates[0].content;
  //         setResultsFromApi([content]); // wrap in array for consistency
  //         localStorage.setItem(
  //           'resumeReviewChatHistory',
  //           JSON.stringify([content])
  //         );

  //         // setConversation([...result]);
  //         ('Generated content:', result);
  //       } catch (error) {
  //         console.error('Error uploading file or generating content:', error);
  //       }
  //     };

  //     uploadFileAndGenerateContent();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [file]); // Only run when the file is available

  if (!file) {
    return (
      <div className='text-red-500 text-center mt-8'>
        No file uploaded. <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const fileUrl = URL.createObjectURL(file);

  return (
    <div className='flex flex-row w-full h-screen'>
      <div className='flex justify-center flex-col flex-1 gap-[20px]'>
        <div className='w-full h-full'>
          <iframe
            src={fileUrl}
            title='PDF Preview'
            className='w-full h-full border-none '
          />
        </div>
        <div className='flex items-end justify-end p-[20px]'>
          <div
            onClick={handleGetFeedback}
            className='border-[#1E3A8A] border rounded-lg px-[24px] py-[12px] text-[#1E3A8A] text-xl hover:cursor-pointer'>
            Get Feedback
          </div>
        </div>
      </div>

      <div className='flex flex-col w-[30%]  sticky  right-0 top-0'>
        <div className='flex flex-row gap-[10px] p-[16px] items-center border-b-1 bg-white border-slate-300 justify-between sticky top-0'>
          <div className='font-semibold text-xl flex items-center justify-center text-[#1E3A8A]'>
            Feedback From Miles
          </div>
        </div>

        {/* Chat Messages (Scrollable) */}
        <div className='bg-[#DBEAFE] flex flex-col py-[24px] px-[12px] gap-[12px] flex-1 overflow-auto'>
          {resultFromApi &&
            resultFromApi.map((chat, index) =>
              chat.role === 'model' ? (
                <div
                  key={index}
                  className='flex flex-col gap-[4px]'>
                  <div className='text-[#64748B] mr-auto font-semibold'>
                    Miles 🤖
                  </div>
                  <div className='bg-white rounded-xl px-[12px] py-[16px]'>
                    <Markdown>{chat.parts[0].text}</Markdown>
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;
