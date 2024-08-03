import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingReport from './RatingReport'; 

const DownloadReport = () => {
    const reportRef = useRef();
    const [previewSrc, setPreviewSrc] = useState(null);
    const location = useLocation();

    const { rating, simplifiedFrame, pieData, pieOptions, barData, barOptions,descriptions,selectedIndustry, selectedCompany, selectedYear } = location.state || {};

    useEffect(() => {
        if (rating) {
            generatePDFPreview();
        }
    }, [rating]);

    const generatePDFPreview = async () => {
        const canvas = await html2canvas(reportRef.current, { useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        setPreviewSrc(pdf.output('datauristring'));
    };

    const downloadPDF = async () => {
        const canvas = await html2canvas(reportRef.current, { useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("report.pdf");
    };

    return (
        <div className="container mt-3">
            <h3>Preview:</h3>
            <div className="container mt-4" ref={reportRef}>
                <RatingReport
                    data={rating}
                    simplifiedFrame={simplifiedFrame}
                    pieData={pieData}
                    pieOptions={pieOptions}
                    barData={barData}
                    barOptions={barOptions}
                    descriptions={descriptions}
                    Industry={selectedIndustry.value}
                    Company={selectedCompany.value}
                    Year={selectedYear.value}
                />
            </div>
            
            <button className="btn btn-primary" onClick={downloadPDF}>Download As PDF</button>
            
            {/* {previewSrc && (
                <div>
                    <h3>Preview:</h3>
                    <iframe src={previewSrc} width="100%" height="500px"></iframe>
                    
                </div>
            )} */}
        </div>
    );
};

export default DownloadReport;
