
import { useState,useRef, forwardRef, useImperativeHandle } from "react";


const NavButtons = forwardRef(({ textValue, image = null , buttonFunction}, ref) => {
   const [isNext,setIsNext] = useState(false);
   
   const [isCurrent, setIsCurrent] = useState(false);

    const defaultAnimation = ({isNext, isCurrent}) => !isNext && !isCurrent ? 
    ' bg-white  text-transparent bg-no-repeat bg-[length:0%_100%] bg-clip-text':
    ' ';

    const nextAnimation = ({isNext, isCurrent}) => isNext && !isCurrent ? 
    ' bg-white  text-transparent bg-gradient-to-r from-[#FF4F81] to-[#FF4F81] bg-no-repeat bg-[length:0%_100%] bg-clip-text animate-fillText delay-1000':
    ' ';
    const currentAnimation = ({isCurrent, isNext}) => isCurrent && !isNext ? 
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
            case "reset":
                setIsNext(false);
                setIsCurrent(false);
                break;
            default:
                return;
        }
    }

   
    return (
        <> 
        <button
            key = {isCurrent && !isNext ? "current" : "else"}
            className={currentAnimation({isCurrent: isCurrent,isNext: isNext}) + defaultAnimation({isNext: isNext,isCurrent: isCurrent}) + nextAnimation({isNext: isNext,isCurrent: isCurrent}) + ' hover:text-[#00FFD1]'}
            onClick={buttonFunction}
                
            >
                {textValue}
                 
         </button>
        </>

    );
});

    export default NavButtons;