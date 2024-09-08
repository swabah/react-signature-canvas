import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FaTrash, FaEye, FaDownload, FaSpinner } from 'react-icons/fa';

function App() {
  const [sign, setSign] = useState();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const scrollToSignature = () => {
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
    setShowPreview(false);
  };

  const handlePreview = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
      setShowPreview(true);
      scrollToSignature();
      setIsLoading(false);
    }, 1000); // Simulating a 1-second delay for loading
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Loading...
                </>
              ) : (
                <>
                  <FaEye /> Preview
                </>
              )}
            </button>
          )}
        </div>
        {showPreview && url && (
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
            <a href={url} target="_blank" rel="noopener noreferrer" download>
              <button className="flex items-center gap-2 p-2 px-5 mt-3 text-white transition-all duration-300 bg-green-700 rounded-full hover:bg-green-600">
                <FaDownload /> Download Signature
              </button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
