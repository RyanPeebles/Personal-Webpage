
import { parse } from "postcss";
import { useEffect, useState, useRef, forwardRef, use, useImperativeHandle} from "react";




const SlideCards = forwardRef(({children, pos = 'fixed', title='cardBox'}, ref) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [startTop, setStartTopsState] = useState(0);
  const [widthState, setWidthState] = useState(0);
  const [heightState, setHeightState] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [zIndexState, setZIndexState] = useState(40);
  const [opacitiyState, setOpacityState] = useState(1);
  const [colors, setColors] = useState("#2C2C2E");
  const [currentTop, setCurrentTop] = useState(0);
  const [durationState, setDurationState] = useState(500);
  
  
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




    


  
  return (
    <div ref={ref}  
     className={ ` ${pos} transition-all ease-in-out shadow-xl rounded-none p-8 m-0  text-[#EDEDED] `} 
     style={{
      backgroundColor: colors,
      top: `${currentTop}px`,
      width: `${widthState}px`,
      height: `${heightState}px`,
      zIndex: zIndexState,
      opacity: opacitiyState,
      transitionDuration: `${durationState}ms`,}}
      
      >
        
        <h2 className= "text-2xl font-bold mb-0" >{title}</h2>
        {children}


    </div>
  );
});
export default SlideCards;