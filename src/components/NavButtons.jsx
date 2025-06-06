
import { useState,useRef, forwardRef, useImperativeHandle } from "react";


const NavButtons = forwardRef(({ textValue, image = null , buttonFunction}, ref) => {
   const [isNext,setIsNext] = useState(false);
   
   const [isCurrent, setIsCurrent] = useState(false);

    const defaultAnimation = ({isNext, isCurrent}) => !isNext && !isCurrent ? 
    ' bg-white  text-transparent bg-gradient-to-r from-[#FF4F81] to-[#FF4F81] bg-no-repeat bg-[length:0%_100%] bg-clip-text animate-(--animate-fillText) ':
    ' ';

    const nextAnimation = ({isNext}) => isNext ? 
    ' bg-secondary  text-transparent bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] bg-clip-text animate-fillText delay-1000':
    ' ';
    const currentAnimation = ({isCurrent}) => isCurrent ? 
    ' bg-secondary  text-transparent bg-gradient-to-r from-white to-white bg-no-repeat bg-left bg-[length:0%_100%] bg-clip-text animate-fillText delay-500':
    ' ';


    useImperativeHandle(ref, () => ({
        
        animationSwitch: (state) => {
            handleAnimationSwitch(state);
        },
        setIsCurrent: (state) => {
            setIsCurrent(state);
        }
    }));
    

    const handleAnimationSwitch = (state) => {
        switch(state){
            case "load":
                setIsNext(true);
                setIsCurrent(false);
                break;
            case "unload":
                
                setIsNext(false);
                setIsCurrent(true);
                break;
            
            default:
                setIsActive(false);
                setUnLoad(false);
                break;
        }
    }

   
    return (
        <> 
        <button
            key = {reset}
            className={currentAnimation({isCurrent: isCurrent}) + defaultAnimation({isNext: isNext, isCurrent: isCurrent}) + nextAnimation({isNext: isNext}) + ' hover:text-[#00FFD1]'}
            onClick={buttonFunction}
            // onMouseEnter={() => {
            //     isActiveRef.current = true;
            // }} 
            // onMouseLeave={() => {
            //     isActiveRef.current =false;
            // }}      
            >
                {textValue}
                 
         </button>
        </>

    );
});

    export default NavButtons;