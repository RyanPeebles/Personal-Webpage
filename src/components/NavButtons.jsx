
import { useState,useRef } from "react";


const NavButtons = ({ textValue, image = null , buttonFunction}) => {
   const isActiveRef = useRef(false);

    const buttonClass = ({isActive}) => isActive ? 
    '  hover:text-[#00FFD1]':
    '  hover:  rounded-md px-3 py-2';

   
    return (
        <> 
        <button
            className={buttonClass({isActive: isActiveRef.current}) + `${image}` + ' hover:text-[#00FFD1]'}
            onClick={buttonFunction}
            onMouseEnter={() => {
                isActiveRef.current = true;
            }} 
            onMouseLeave={() => {
                isActiveRef.current =false;
            }}      
            >
                {textValue}
                 
         </button>
        </>

    );
}

    export default NavButtons;