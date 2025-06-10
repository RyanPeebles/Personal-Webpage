import React, { useRef, useEffect, useState } from 'react';

const DrawingBoard = ({ width = 500, height = 300, strokeStyle = '#000000', lineWidth = 2, style = {} }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // State to store the history of all paths
  const [paths, setPaths] = useState([]);
  // Ref to store the path currently being drawn
  const currentPathRef = useRef([]);

  // This effect handles resizing and redrawing the entire history
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    // Adjust for device pixel ratio for sharper drawing
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.scale(dpr, dpr);
    }

    // Clear canvas before redrawing
    context.clearRect(0, 0, width * dpr, height * dpr);

    // Set drawing styles
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // Redraw all saved paths from history
    //console.log("paths", paths);

    paths.forEach(path => {
      if (path.length < 2) return;
      context.beginPath();
      context.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y);
      }
      context.stroke();
    });

  }, [paths, width, height, strokeStyle, lineWidth]);

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
    setIsDrawing(true);
    // Start a new path in the ref
    currentPathRef.current = [{ x, y }];
  };

  const draw = (event) => {
    if (!isDrawing) return;

    const { x, y } = getMousePosition(event);
    const context = canvasRef.current.getContext('2d');

    // Draw the latest segment immediately for responsiveness
    const lastPoint = currentPathRef.current[currentPathRef.current.length - 1];
    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(x, y);
    context.stroke();

    // Add the new point to the current path in the ref
    currentPathRef.current.push({ x, y });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    // If the path has points, commit it to the state history
    if (currentPathRef.current.length > 1) {
      //console.log("current path",  currentPathRef.current);
      const newPath = [...currentPathRef.current];
      setPaths(prevPaths => [...prevPaths, newPath]);
    }
    // Clear the current path ref
    currentPathRef.current = [];
  };

  const clearCanvas = () => {
    // Clear the path history, which will trigger the useEffect to clear the canvas
    setPaths([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing} // Also stop if mouse leaves canvas
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
          color: 'var(--color-on-primary)',
          backgroundColor: 'var(--color-btn-primary)',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          hover: 'backgroundColor: var(--color-btn-secondary)'
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default DrawingBoard;
