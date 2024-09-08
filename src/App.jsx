import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FaTrash, FaEye, FaDownload } from 'react-icons/fa'; // Importing icons

function App() {
  const [sign, setSign] = useState(null);
  const [url, setUrl] = useState(null);

  const scrolltoSignature = () => {
    const element = document.getElementById('Previewsignature');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  };

  const handleClear = () => {
    sign.clear();
    setUrl('');
  };

  const handlePreview = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
    scrolltoSignature();
  };

  const handleDownload = (quality) => {
    const canvas = sign.getTrimmedCanvas();
    const scale = quality === 'high' ? 4 : 1; // 4 times larger for 4K

    // Set canvas dimensions for 4K or regular quality
    const highQualityCanvas = document.createElement('canvas');
    highQualityCanvas.width = canvas.width * scale;
    highQualityCanvas.height = canvas.height * scale;
    const context = highQualityCanvas.getContext('2d');

    // Scale and redraw the signature
    context.scale(scale, scale);
    context.drawImage(canvas, 0, 0);

    // Download the image in the desired quality
    const downloadUrl = highQualityCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = quality === 'high' ? 'signature_4k.png' : 'signature.png';
    link.click();
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6 lg:py-14 bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full h-full gap-5 text-center">
        <div
          className="bg-white border rounded-lg shadow-lg"
          style={{ width: '100%', maxWidth: '300px', height: '400px' }}
        >
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 300, height: 400, className: 'sigCanvas' }}
            ref={(data) => setSign(data)}
          />
        </div>
        <div className="flex items-center gap-5 mt-3">
          <button
            className="flex items-center gap-2 px-4 py-2 text-white capitalize transition-all duration-300 bg-green-700 rounded-full hover:bg-green-600"
            onClick={handleClear}
          >
            <FaTrash /> Clear
          </button>
          {sign && (
            <button
              className="flex items-center gap-2 px-4 py-2 text-white capitalize transition-all duration-300 bg-green-700 rounded-full hover:bg-green-600"
              onClick={handlePreview}
            >
              <FaEye /> Preview
            </button>
          )}
        </div>
        {url && (
          <>
            <hr className="w-full my-4 border-t border-gray-300" />
            <div className="overflow-hidden rounded-lg">
              <img
                id="Previewsignature"
                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                src={url}
                alt="Signature"
                className="rounded-lg lg:p-5"
              />
            </div>
            <div className="flex gap-5">
              <button
                className="flex flex-col items-center gap-2 p-4 px-5 mt-3 text-white transition-all duration-300 bg-green-700 rounded-full md:p-2 md:gap-2 md:flex-row hover:bg-green-600"
                onClick={() => handleDownload('low')}
              >
                <FaDownload className='text-xl md:text-base' />
                <span> Low Quality</span>
              </button>
              <button
                className="flex flex-col items-center gap-2 p-4 px-5 mt-3 text-white transition-all duration-300 bg-green-700 rounded-full md:p-2 md:gap-2 md:flex-row hover:bg-green-600"
                onClick={() => handleDownload('high')}
              >
                <FaDownload className='text-xl md:text-base' />
                <span> 4K Quality</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
