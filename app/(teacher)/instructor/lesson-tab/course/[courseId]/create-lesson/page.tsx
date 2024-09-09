'use client';
import html2canvas from 'html2canvas'; // Import html2canvas
import jsPDF from 'jspdf'; // Import jsPDF
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function CreateLesson() {
  const [content, setContent] = useState('');
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        [{ align: [] }],
        [{ color: [] }],
        ['code-block'],
        ['clean'],
      ],
    },
  };

  const quillFormats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const handleExportPDF = () => {
    const editor = document.querySelector('.ql-editor') as HTMLElement;
    html2canvas(editor).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('document.pdf');
    });
  };

  return (
    <div>
      <div className="h-screen flex items-center flex-col w-full">
        <h1 className="text-3xl font-bold font-c">CREATE LESSON</h1>
        <div className="h-5/6 w-5/6">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            className=" h-[70%] mt-10 bg-white "
          />
        </div>
        <button
          onClick={handleExportPDF}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
}
