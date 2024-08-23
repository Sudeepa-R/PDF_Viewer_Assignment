import React, { Component } from 'react';

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Functional component for PDF Viewer
const PdfViewer = ({ pdfFile }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
        )
    );
};

class Filepdf extends Component {
    constructor(props) {
        super(props);

        // Initial state with the path to PDF file in public folder
        this.state = {
            pdfFile: '/kea.pdf', // Ensure to place kea.pdf in the public folder
            pdfError: '',
        };
    }

    render() {
        const { pdfFile } = this.state;

        return (
            <div className="container">
                <div className="viewer">
                    {/* Render the PdfViewer functional component */}
                    <PdfViewer pdfFile={pdfFile} /> 
                </div>
            </div>
        );
    }
}

export default Filepdf;
