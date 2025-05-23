
import { useState,useRef, forwardRef, useImperativeHandle } from "react";


const NavButtons = forwardRef(({ textValue, image = null , buttonFunction}, ref) => {
   const [isActive, setIsActive] = useState(false);

    const buttonClass = ({isActive}) => isActive ? 
    ' bg-white  text-transparent bg-gradient-to-r from-[#FF4F81] to-[#FF4F81] bg-no-repeat bg-[length:0%_100%] bg-clip-text animate-(--animate-fillText) ':
    ' ';


    useImperativeHandle(ref, () => ({
        toggleLoadingAnimation: () => {
            setIsActive(!isActive);
            console.log("isActiveRef.current", isActive);
        }
    }));

   
    return (
        <> 
        <button
            className={buttonClass({isActive: isActive})  + ' hover:text-[#00FFD1]'}
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