"use client";
import React, { useState, useRef } from 'react';

const WebSimulator: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [inputUrl, setInputUrl] = useState(url);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleGo = () => {
    setUrl(inputUrl);
  };

  const handleBack = () => {
    if (iframeRef.current?.contentWindow?.history) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const handleForward = () => {
    if (iframeRef.current?.contentWindow?.history) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  return (
      <div style={{ fontFamily: 'Arial, sans-serif', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f1f1f1' }}>
          <button onClick={handleBack} style={{ marginRight: '10px' }}>←</button>
          <button onClick={handleForward} style={{ marginRight: '10px' }}>→</button>
          <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{ flex: 1, padding: '5px', marginRight: '10px' }}
              placeholder="Enter a URL"
          />
          <button onClick={handleGo}>Go</button>
        </div>
        <iframe
            ref={iframeRef}
            src={url}
            style={{ flex: 1, border: 'none' }}
            title="Web Simulator"
        />
      </div>
  );
};

export default WebSimulator;
