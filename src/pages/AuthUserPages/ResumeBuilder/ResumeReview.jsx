import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import { Buffer } from 'buffer';

const ResumeReview = () => {
  // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const stringifiedDetailsChatHistory =
    localStorage.getItem('detailsChatHistory');
  const [conversation, setConversation] = useState(
    stringifiedDetailsChatHistory
      ? JSON.parse(stringifiedDetailsChatHistory)
      : []
  );
  const [resultFromApi, setResultsFromApi] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const file = location?.state?.file;

  // useEffect(() => {
  //   if (file) {
  //     const uploadFileAndGenerateContent = async () => {
  //       const prompt = 'Praise ';
  //       const image = {
  //         inlineData: {
  //           data: Buffer.from(fs.readFileSync('cookie.png')).toString('base64'),
  //           mimeType: 'image/png',
  //         },
  //       };

  //       const result = await model.generateContent([prompt, image]);
  //       console.log(result.response.text());
  //     };
  //   }
  // });
  // useEffect(() => {
  //   if (file) {
  //     const uploadFileAndGenerateContent = async () => {
  //       try {
  //         // Upload the file
  //         const myfile = await ai.files.upload({
  //           file: file, // Use the file passed from location.state
  //           config: { mimeType: file.type }, // Get MIME type from the file object
  //         });

  //         console.log('Uploaded file:', myfile);

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
  //               'Praise / Critise the resume briefly.',
  //               createPartFromUri(myfile.uri, file.mimeType),
  //             ]),
  //           ],
  //         });
  //         setResultsFromApi(result);
  //         console.log('Generated content:', result);
  //       } catch (error) {
  //         console.error('Error uploading file or generating content:', error);
  //       }
  //     };

  //     // Trigger the file upload and content generation
  //     uploadFileAndGenerateContent();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [file]); // Only run when the file is available

  if (!file) {
    // No file passed — redirect back or show error
    return (
      <div className='text-red-500 text-center mt-8'>
        No file uploaded. <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const fileUrl = URL.createObjectURL(file);

  return (
    <div className='flex flex-row w-full'>
      <div className='flex justify-center flex-1'>
        <div className='w-full'>
          {/* Ensure iframe takes up the full width and height of the parent div */}
          <iframe
            src={fileUrl}
            title='PDF Preview'
            className='w-full h-full border-none '
          />
        </div>
      </div>

      <div className='flex flex-col w-[30%]  sticky  right-0 top-0'>
        <div className='flex flex-row gap-[10px] p-[16px] items-center border-b-1 bg-white border-slate-300 justify-between sticky top-0'>
          <div className='font-semibold text-xl flex items-center justify-center text-[#1E3A8A]'>
            Feedback From Miles
          </div>
          {/* <div
                          className='text-xl font-semibold cursor-pointer'
                          onClick={toggleHideChatContainer}>
                          X
                        </div> */}
        </div>

        {/* Chat Messages (Scrollable) */}
        <div className='bg-[#DBEAFE] flex flex-col py-[24px] px-[12px] gap-[12px] flex-1 overflow-auto'>
          <div
            className={`flex flex-col gap-[4px] 
                }`}>
            Receive feedback for your input here when you press the Get Feedback
            button.
          </div>
          {conversation.length > 0 &&
            conversation.map(
              (chat, index) =>
                chat.role === 'model' && (
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
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;
