
import { parse } from "postcss";
import { useEffect, useState, useRef} from "react";




const SlideCards = ({children, duration = '500', bg = 'bg-red-100', opacity = '1',zIndex='zIndex: 0',  top = '0px', height = 'h-1/10', width = '100px', pos = 'fixed', title='cardBox', disableMouseEvents = false, cardOpen =false, closing = false,  onClick}) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [startTop, setStartTopsState] = useState(0);
  const cardRef = useRef(null);
  useEffect(() => {
    const startTops = parseInt(window.getComputedStyle(cardRef.current).top, 10) || 0;
    setStartTopsState(startTops);
  }, []);



    const handleMouseEnter = (e) => {
      
      if(disableMouseEvents || isAnimating) return;
      
      const currentTop = parseInt(window.getComputedStyle(e.currentTarget).top, 10) || 0;
      
      const newTop = currentTop - 40;
        e.currentTarget.style.top = `${newTop}px`;
        e.currentTarget.style.transition = 'top 0.5s ease-in-out';
        setIsAnimating(true);
        // setTimeout(() => {
        //   setIsAnimating(false);
        // }, 500); // Reset after animation duration
      
        
    }





  const handleMouseLeave = (e) => {
      if(disableMouseEvents) return;
      

      const currentTop = parseInt(window.getComputedStyle(e.currentTarget).top, 10) || 0;
      
      
        
      var newTop = currentTop + 40;
      if(newTop > startTop){
        newTop = startTop;
      }
        e.currentTarget.style.top = `${newTop}px`;
        e.currentTarget.style.transition = 'top 0.5s ease-in-out';
        //setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500); // Reset after animation duration
      
      
        
    }
  return (
    <div ref={cardRef} onClick = {onClick} onMouseEnter={disableMouseEvents ? ()=> null : handleMouseEnter} onMouseLeave={ disableMouseEvents ?  ()=>{console.log("mouse disabled")} : handleMouseLeave}
     className={ `${bg} ${height} ${pos}  transition-all ease-in-out shadow-xl rounded-none p-8 m-0 border-3 border-[#1E1E1E] text-[#EDEDED] `} style ={{ transitionDuration: `${duration}ms`,top, width, zIndex, opacity}}>
        
        <h2 className= "text-2xl font-bold mb-0" >{title}</h2>
        {children}


    </div>
  );
}
export default SlideCards;