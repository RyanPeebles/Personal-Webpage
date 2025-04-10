
import { parse } from "postcss";
import { useEffect, useState, useRef} from "react";




const SlideCards = ({children, bg = 'bg-red-100', zIndex='z-10',  top = '0px', height = 'h-1/10', pos = 'fixed', title='cardBox', disableMouseEvents = false, onClick}) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [startTop, setStartTopsState] = useState(0);
  const cardRef = useRef(null);
  useEffect(() => {
    const startTops = parseInt(window.getComputedStyle(cardRef.current).top, 10) || 0;
    setStartTopsState(startTops);
  }, []);



    const handleMouseEnter = (e) => {
      
      if(disableMouseEvents || isAnimating) return;
      console.log("mouse over");
      const currentTop = parseInt(window.getComputedStyle(e.currentTarget).top, 10) || 0;
      
      const newTop = currentTop - 40;
        e.currentTarget.style.top = `${newTop}px`;
        e.currentTarget.style.transition = 'top 0.5s ease-in-out';
        setIsAnimating(true);
        // setTimeout(() => {
        //   setIsAnimating(false);
        // }, 500); // Reset after animation duration
      
        
    }




    useEffect(() => {
      console.log("disableMouseEvents:", disableMouseEvents);
  }, [disableMouseEvents]);


  const handleMouseLeave = (e) => {
      if(disableMouseEvents) return;
      console.log("mouse out");

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
    <div ref={cardRef} onClick = {onClick} onMouseEnter={disableMouseEvents ? ()=>{console.log("mouse disabled")} : handleMouseEnter} onMouseLeave={ disableMouseEvents ?  ()=>{console.log("mouse disabled")} : handleMouseLeave} className={`${bg} ${zIndex}  ${height} ${pos} rounded-none w-full border-3 border-black`} style ={{top, transition: 'top 0.5s ease-in-out'}}>
        
        <h2 className= "text-2xl font-bold mb-4" >{title}</h2>
        {children}


    </div>
  );
}
export default SlideCards;