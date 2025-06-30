
import { useState,useRef, forwardRef, useImperativeHandle } from "react";


const NavButtons = forwardRef(({ textValue, image = null , buttonFunction}, ref) => {
   const [isNext,setIsNext] = useState(false);
   const [pauseAnimation, setPauseAnimation] = useState(false);   
   const [isCurrent, setIsCurrent] = useState(false);

    const defaultAnimation = ({isNext, isCurrent}) => !isNext && !isCurrent ? 
    ' bg-white  text-transparent bg-no-repeat bg-[length:0%_100%] bg-clip-text':
    ' ';

    const nextAnimation = ({isNext, isCurrent}) => isNext && !isCurrent ? 
    ' bg-white  text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary)] bg-no-repeat bg-[length:0%_100%] bg-clip-text animate-fillText':
    ' ';
    const currentAnimation = ({isCurrent, isNext}) => isCurrent && !isNext ? 
    ' bg-secondary font-bold text-transparent bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] bg-clip-text animate-fillText scale-120':
    ' ';    


    useImperativeHandle(ref, () => ({
        
        animationSwitch: (state) => {
            handleAnimationSwitch(state);
        },
        setIsCurrent: (state) => {
            setIsCurrent(state);
        },
        setPauseAnimation: (state) => {
            setPauseAnimation(state);
        }
    }));
    
    //Handles the animation switch states for the buttons
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
            className={currentAnimation({isCurrent: isCurrent,isNext: isNext}) + defaultAnimation({isNext: isNext,isCurrent: isCurrent}) + nextAnimation({isNext: isNext,isCurrent: isCurrent}) + ' hover:text-[#00FFD1] transition-all ease-in-out'}
            onClick={buttonFunction}
            style={{animationPlayState: pauseAnimation ? "paused" : "running"}}
                
            >
                <span className="buttonFont">{textValue}</span>
                 
         </button>
        </>

    );
});

    export default NavButtons;