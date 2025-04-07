import React, { useRef } from 'react';
import GeneratedResume from './GeneratedResume';
import useGlobalContext from '../../../hooks/useGlobalContext';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router';

const ResumePreview = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const resumeRef = useRef(null);
  // const handleDownload = () => {
  //   console.log('Handle Download');
  //   if (resumeRef.current) {
  //     const filename = `resume-${
  //       user?.name?.toLowerCase().replace(/\s+/g, '-') || 'untitled'
  //     }.pdf`;

  //     console.log(resumeRef.current);
  //     const opt = {
  //       margin: 0,
  //       filename,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 1 }, // Keep this as 1 to avoid layout shifts
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //     };

  //     html2pdf().from(resumeRef.current).set(opt).save();
  //     // Delay ensures the content is ready
  //   }
  // };

  // const handleDownload = async (e) => {
  //   e.preventDefault();
  //   console.log('Downloading PDF...');

  //   const input = resumeRef.current;

  //   if (!input) return;

  //   try {
  //     const canvas = await html2canvas(input, { scale: 2 }); // Higher scale for better quality
  //     const imgData = canvas.toDataURL('image/jpeg', 1.0);

  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = pageWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let position = 0;

  //     if (imgHeight < pageHeight) {
  //       // Single-page PDF
  //       pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  //     } else {
  //       // Multi-page PDF
  //       let remainingHeight = imgHeight;

  //       while (remainingHeight > 0) {
  //         pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  //         remainingHeight -= pageHeight;
  //         position -= pageHeight;

  //         if (remainingHeight > 0) pdf.addPage();
  //       }
  //     }

  //     const filename = `resume-${
  //       user?.name?.toLowerCase().replace(/\s+/g, '-') || 'untitled'
  //     }.pdf`;
  //     pdf.save(filename);
  //   } catch (err) {
  //     console.error('Failed to download PDF:', err);
  //   }
  // };
  const handleDownload = async () => {
    if (!resumeRef.current) return;

    const filename = `resume-${
      user?.name?.toLowerCase().replace(/\s+/g, '-') || 'untitled'
    }.pdf`;

    try {
      const node = resumeRef.current;

      // Convert the DOM node to a PNG data URL
      const dataUrl = await domtoimage.toPng(node, {
        quality: 1,
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${node.scrollWidth}px`,
          height: `${node.scrollHeight}px`,
        },
      });

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [img.width, img.height],
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
        pdf.save(filename);
      };
    } catch (error) {
      console.error('PDF download failed:', error);
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
          onClick={handleDownload}
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
