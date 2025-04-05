import React, { useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

const PdfAsImage = ({ file }) => {
  const [imageUrl, setImageUrl] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const pdf = await pdfjs.getDocument(new Uint8Array(fileReader.result))
          .promise;
        const page = await pdf.getPage(1); // Render first page
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        setImageUrl(canvas.toDataURL());
      };
      fileReader.readAsArrayBuffer(file);
    };

    if (file) renderPDF();
  }, [file]);

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='PDF Page as Image'
          width='100%'
        />
      ) : (
        <p>Loading PDF...</p>
      )}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default PdfAsImage;
