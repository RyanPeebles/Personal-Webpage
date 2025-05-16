
import { useRef, useEffect, useState} from "react";
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from "react-icons/fa6";




import NavButtons from "./NavButtons";
const Navbar = ({onCallNextBox, onCallPrevBox}) => {
    

    const intervalRef = useRef(null);
    const timerRef = useRef(null);
    
    
    
      
   
    const pause = () => {
        const playBtn = document.getElementById("playBtn");
        playBtn.style.display = "block";
        const pauseBtn = document.getElementById("pauseBtn");
        pauseBtn.style.display = "none";
        unmountInterval(); // Stop the interval
       
    }

    const play = () => {
        const playBtn = document.getElementById("playBtn");
        playBtn.style.display = "none";
        const pauseBtn = document.getElementById("pauseBtn");
        pauseBtn.style.display = "block";
        resumeTimer();
        mountInterval(); // Start the interval again
       
    }
    const resumeTimer = () => {
        setTimeout(() =>{tick(); mountInterval(); }, timerRef.current);
     } // Resume the timer

    const mountInterval = () => {  
        if(intervalRef.current !== null) {
            clearInterval(intervalRef.current); // Clear the existing interval
        }
        intervalRef.current = setInterval(tick, 10000); // Set the interval to 10 seconds
        timerRef.current = Date.now(); // Store the current time

        console.log("Interval mounted:", intervalRef.current);
    }
    const unmountInterval = () => {
        clearInterval(intervalRef.current); // Clear the interval
        intervalRef.current = null; // Reset the ref to null
        timerRef.current = 10000-( (Date.now() - timerRef.current)% 10000); // Calculate the time delta
    }

    useEffect(() => {
       
        mountInterval(); // Start the interval on mount

        
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }
    , []);

    const tick = () => { 
        onCallNextBox();
        console.log("Interval ticked:", intervalRef.current);
           
    }
    return (

        <nav className=" static bg-[#121212]   w-full text-red h-1/10 z-50">
            <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex  h-20 items-center justify-between ">
                        <div className='flex flex-1 items-center
                    justify-center md:items-stretch
                    md:justify-start'>
                   
                        <div className='md:ml-auto'>
                            
                            
                        <div className='flex space-x-2 text-xl  bg-white font-bold text-transparent bg-gradient-to-r from-[#FF4F81] to-[#FF4F81]
                             bg-no-repeat bg-[length:0%_100%] bg-clip-text animate-(--animate-fillText) '>
                               
                                
                                
                                
                                <FaPlay id="playBtn" className="text-white text-2xl hover:text-[#00FFD1] hidden" onClick={play}/>
                                <FaPause id="pauseBtn" className="text-white text-2xl hover:text-[#00FFD1]" onClick={pause}/>
                                <FaArrowLeft className="text-white text-2xl hover:text-[#00FFD1]" onClick={onCallPrevBox}/>
                                <FaArrowRight className="text-white text-2xl hover:text-[#00FFD1]" onClick={onCallNextBox}/>
                           <NavButtons textValue={"About Me"}></NavButtons>
                           
                           <NavButtons textValue={"Projects"}></NavButtons>
                           <NavButtons textValue={"Experience"}></NavButtons>
                           <NavButtons textValue={"More"}></NavButtons>
                           

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
     );
     
}
export default Navbar;