import React, { useRef, useEffect, useState } from 'react';

const DrawingBoard = ({ width = 500, height = 300, strokeStyle = '#000000', lineWidth = 2, style = {} }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Adjust for device pixel ratio for sharper drawing
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Check if canvas dimensions have changed before resetting
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.scale(dpr, dpr);
    }

    // Set initial drawing styles
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';
  }, [width, height, strokeStyle, lineWidth]);

  const getMousePosition = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event) => {
    const { x, y } = getMousePosition(event);
    setLastPosition({ x, y });
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { x, y } = getMousePosition(event);

    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(x, y);
    context.stroke();

    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1) , canvas.height / (window.devicePixelRatio || 1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing} // Stop drawing if mouse leaves canvas
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'crosshair',
          backgroundColor: '#ffffff' // Default white background
        }}
      />
      <button 
        onClick={clearCanvas} 
        style={{
          marginTop: '10px',
          padding: '8px 15px',
          fontSize: '14px',
          color: 'white',
          backgroundColor: '#FF4F81',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default DrawingBoard;
