import React, { useRef } from 'react';
import GeneratedResume from './GeneratedResume';
import useGlobalContext from '../../../hooks/useGlobalContext';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router';
const ResumePreview = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const resumeRef = useRef(null);
  const handleDownload = (e) => {
    e.preventDefault();
    if (resumeRef.current) {
      const filename = `resume-${
        user?.name?.toLowerCase().replace(/\s+/g, '-') || 'untitled'
      }.pdf`;

      const opt = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 }, // Keep this as 1 to avoid layout shifts
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().from(resumeRef.current).set(opt).save();
    }
  };

  const handleEditDetails = () => {
    navigate('/auth_user/resume_builder/build/details');
  };
  return (
    <div className='flex flex-col w-full'>
      <div className='sticky top-0 right-0 left-0 flex flex-row items-end border-b-1 border-[#CBD5E1] justify-end w-full gap-[10px] bg-white py-[16px] px-[10px]'>
        <div
          onClick={handleEditDetails}
          className='px-[24px] py-[8px] hover:cursor-pointer bg-white text-lg text-blue-700 border border-blue-700 rounded-xl'>
          Edit Details
        </div>
        <div
          onClick={(e) => handleDownload(e)}
          className='px-[24px] py-[8px] hover:cursor-pointer bg-blue-700 text-lg text-white rounded-xl'>
          Download Resume
        </div>
      </div>

      <div className='flex justify-center py-[36px]'>
        <div ref={resumeRef}>
          <GeneratedResume />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
