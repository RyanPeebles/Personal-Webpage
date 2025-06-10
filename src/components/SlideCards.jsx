import { parse } from "postcss";
import { useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";




const SlideCards = forwardRef(({children, pos = 'fixed', title='cardBox'}, ref) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [startTop, setStartTopsState] = useState(0);
  const [widthState, setWidthState] = useState(0);
  const [heightState, setHeightState] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [zIndexState, setZIndexState] = useState(40);
  const [opacitiyState, setOpacityState] = useState(1);
  const [colors, setColors] = useState("bg-surface1");
  const [currentTop, setCurrentTop] = useState(0);
  const [durationState, setDurationState] = useState(500);

  const contentAreaRef = useRef(null); // Ref for the content area
  const [contentDimensions, setContentDimensions] = useState({ width: 0, height: 0 });
  
  
  // useEffect(() => {
  //   const startTops = parseInt(window.getComputedStyle(cardRef.current).top, 10) || 0;
  //   setStartTopsState(startTops);
  // }, []);

   useImperativeHandle(ref, () => ({
    callColorChange: (newColor) => {
      setColors(newColor);
    },
    callTopPosition: (newTop) => {
      setCurrentTop(newTop);
    },
    callToggleOpen: (newState) => {
      setIsCardOpen(newState);
    },
    callZindex: (newZIndex) => {
      setZIndexState(newZIndex);
    },
    callWidth: (newWidth) => {
      setWidthState(newWidth);
    },
    callHeight: (newHeight) => {
      setHeightState(newHeight);
    },
    callOpacity: (newOpacity) => { 
      setOpacityState(newOpacity);
    },
    callDuration: (newDuration) => {
      setDurationState(newDuration);
    },
    // Expose content dimensions if needed, though render prop is primary way
    getContentDimensions: () => contentDimensions,
    raiseTop: (step) =>{
      setCurrentTop((prevTop) => prevTop - step);
    },
    lowerTop: (step) => {
      setCurrentTop((prevTop) => prevTop + step);
    },
    expandWidth: (step) => {
      setWidthState((prevWidth) => prevWidth + step);
    },
    shrinkWidth: (step) => {
      setWidthState((prevWidth) => prevWidth - step);
    },
    raiseZindex: (step) => {
      setZIndexState((prevZIndex) => prevZIndex + step);
    },
    lowerZindex: (step) => {
      setZIndexState((prevZIndex) => prevZIndex - step);
    },
  }));

  useEffect(() => {
    const contentElement = contentAreaRef.current;
    if (!contentElement) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setContentDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    resizeObserver.observe(contentElement);

    // Initial measurement
    setContentDimensions({
        width: contentElement.clientWidth,
        height: contentElement.clientHeight
    });

    return () => resizeObserver.unobserve(contentElement);
  }, [children]); // Re-run if children change, in case layout is affected



  
  return (
    <div ref={ref}  
     className={ ` ${pos} ${colors} transition-all ease-in-out shadow-xl rounded-none p-8 m-0  text-on-background flex flex-col`} 
     style={{
      
      top: `${currentTop}px`,
      width: `${widthState}px`,
      height: `${heightState}px`,
      zIndex: zIndexState,
      opacity: opacitiyState,
      transitionDuration: `${durationState}ms`,}}
      
      >
        
        <h2 className= "text-2xl font-bold mb-0 flex-shrink-0" >{title}</h2>
        <div ref={contentAreaRef} className="flex-grow overflow-hidden"> {/* Content area wrapper */}
          {typeof children === 'function' 
            ? children({ contentWidth: contentDimensions.width, contentHeight: contentDimensions.height })
            : children}
        </div>


    </div>
  );
});
export default SlideCards;