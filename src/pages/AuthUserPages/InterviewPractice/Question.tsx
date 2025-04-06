import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { GoogleGenAI } from '@google/genai';
import useGlobalContext from '../../../hooks/useGlobalContext';
const Question = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isNextQuestion, setIsNextQuestion] = useState(false);
  const [response, setResponse] = useState('');

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-1.5-flash-8b',
    config: {
      candidateCount: 1,
      temperature: 0.5,
      systemInstruction: `You are a bot who helps people prepare for behavioural interview. Make your response brief, not too long. Come up with a response that includes the feedback of my answer, and give an alternative using the famous STAR method.`,
    },
  });
  const stringifiedInterviewPracticeChatHistory = localStorage.getItem(
    'interviewPracticeChatHistory'
  );
  // const [resultFromApi, setResultsFromApi] = useState(
  //   stringifiedInterviewPracticeChhatHistory
  //     ? JSON.parse(stringifiedInterviewPracticeChhatHistory)
  //     : []
  // );
  const [feedback, setFeedback] = useState(
    stringifiedInterviewPracticeChatHistory
      ? JSON.parse(stringifiedInterviewPracticeChatHistory)
      : ''
  );

  const getResponse = async (myAnswer) => {
    console.log('getResponse is called');
    const message = `Question : Could you tell me about a time you faced a challenge at work and how you handled it?
   This is my answer : ${myAnswer}.`;
    console.log(message);
    const response = await chat.sendMessage({ message });
    console.log(response);
    return response;
  };

  const handleCheckSolution = async (formData: FormData) => {
    const userAnswer = formData.get('answer') as string;
    if (userAnswer.trim() !== '') {
      console.log(userAnswer);
      setIsNextQuestion(true);

      // Process the answer here (e.g., send to API, validate, etc.)
      const LLMResponse = await getResponse(userAnswer);
      console.log(LLMResponse);
      setFeedback(LLMResponse.text);
      localStorage.setItem(
        'stringifiedInterviewPracticeChatHistory',
        JSON.stringify(LLMResponse.text)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    handleCheckSolution(formData);
  };

  const navigateToSummary = () =>
    navigate('/auth_user/interview_practice/summary', {
      state: { feedback },
    });

  return (
    <div className='w-full py-[64px]'>
      <div className='flex flex-col gap-[32px] justify-center items-center'>
        <div className='flex flex-row'>
          <img
            src='/MilestonesMascot.svg'
            className='w-[301px] h-[238px]'
          />
          <div className='flex flex-col w-full gap-5'>
            <div className='flex flex-col'>
              <div className='bg-[#1D4ED8] w-fit px-[32px] py-[8px] text-white relative top-3 left-5 font-mono rounded-full'>
                Miles
              </div>
              <div className='bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 '>
                Hello there {user.name}. My name is Miles and I’ll be your
                interviewer for today. Without further ado, let’s proceed with
                your behavioural interview.
              </div>
            </div>
            <div className='bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 '>
              Could you tell me about a time you faced a challenge at work and
              how you handled it?
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='bg-[#1D4ED8] px-[32px] py-[8px] w-fit text-white relative top-3 left-5 font-mono rounded-full'>
            {user.name}
          </div>
          <form
            className='flex flex-col gap-[24px] py-[32px] bg-slate-100 px-[24px] w-[800px] outline-slate-500 rounded-xl outline-1'
            ref={formRef}
            onSubmit={handleSubmit}>
            <div className='flex flex-col gap-[8px] '>
              <div className='text-[#1E3A8A] font-bold text-lg'>
                Your Answer
              </div>
              <div className='flex bg-white h-[144px] p-4 outline-slate-300 rounded-xl outline-1'>
                <textarea
                  className='text-xl w-full focus:outline-none'
                  placeholder='Type your solution or tap the audio button to speak it'
                  name='answer'
                />
                <img
                  src='/Mic.svg'
                  alt='Microphone icon'
                />
              </div>
            </div>

            {feedback && (
              <div className='px-[16px] py-[12px] bg-blue-100 rounded-lg'>
                <p className='whitespace-pre-line text-blue-900'>{feedback}</p>
              </div>
            )}

            <div className='w-full flex justify-end gap-[12px]'>
              <button className='bg-transparent text-blue-900 text-lg py-[12px] px-[24px] rounded-lg outline-1 outline-blue-900 hover:cursor-pointer'>
                Skip Question
              </button>
              {isNextQuestion ? (
                <button
                  className='bg-[#1D4ED8] text-white text-lg py-[12px] px-[24px] rounded-lg hover:cursor-pointer'
                  onClick={navigateToSummary}>
                  Next Question
                </button>
              ) : (
                <button
                  className='bg-[#1D4ED8] text-white text-lg py-[12px] px-[24px] rounded-lg hover:cursor-pointer'
                  type='submit'>
                  Check Solution
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Question;
