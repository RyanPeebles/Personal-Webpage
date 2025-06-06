
import { useRef, useLayoutEffect, useState, forwardRef, useImperativeHandle} from "react";
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from "react-icons/fa6";




import NavButtons from "./NavButtons";
import ThemeToggle from "./themeToggle";

const Navbar = forwardRef(({onCallNextBox, onCallPrevBox}, ref) => {
    

    const intervalRef = useRef(null);
    const timerRef = useRef(null);
    
    
    const navBtnRef = [useRef(), useRef(), useRef(), useRef()];


    
    // useEffect(() => {
    //     navBtnRef.current[0] = document.querySelector('.animate--animate-fillText');

    // }, []);

    useImperativeHandle(ref, () => ({
        callLoadAnimation: (card) => {
            handleLoadAnimation(card);
        },
        callunloadAnimation: (card) => {
            
            handleUnloadAnimation(card);
        }
    }));
    const handleLoadAnimation = (currentCard) => {
        if(currentCard) {
        console.log("animation started for card: " ,currentCard);
        navBtnRef[currentCard].current.setIsCurrent(true);
        }else {
            //navBtnRef[0].current.setIsCurrent(true);
        }
    };

    const handleUnloadAnimation = (prevCard) => {
        if(prevCard) {
        // console.log("animation ended for card: " ,currentCard);
        navBtnRef[prevCard].current.animationSwitch("reset");
        navBtnRef[prevCard].current.animationSwitch("unload");
        
        }
        else {
            navBtnRef[0].current.animationSwitch("reset");
            navBtnRef[0].current.animationSwitch("unload");
        }
    }
      
   
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

      
    }
    const unmountInterval = () => {
        clearInterval(intervalRef.current); // Clear the interval
        intervalRef.current = null; // Reset the ref to null
        timerRef.current = 10000-( (Date.now() - timerRef.current)% 10000); // Calculate the time delta
    }
   

    useLayoutEffect(() => {
        
        mountInterval(); // Start the interval on mount
        //handleLoadAnimation();

        initBtnStates();
        
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }
    , []);
    const initBtnStates = () => {
        navBtnRef[0].current.setIsCurrent(true);
        navBtnRef[1].current.setIsCurrent(false);
        navBtnRef[2].current.setIsCurrent(false);
        navBtnRef[3].current.setIsCurrent(false);

        navBtnRef[1].current.animationSwitch("load");
        ;
    }

    const tick = () => { 
        //handleLoadAnimation();
        onCallNextBox();
        
           
    }
    
    return (

        <nav className=" static bg-background text-on-background  w-full h-1/10 z-50">
            <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex  h-20 items-center justify-between ">
                        <div className='flex flex-1 items-center
                    justify-center md:items-stretch
                    md:justify-start'>
                   
                        <div className='md:ml-auto'>
                            
                            
                        <div className='flex space-x-2 text-xl font-bold'>
                               
                                
                                
                                <ThemeToggle/>
                                <FaPlay id="playBtn" className="text-white text-2xl hover:button-primary hidden" onClick={play}/>
                                <FaPause id="pauseBtn" className="text-white text-2xl hover:button-primary" onClick={pause}/>
                                <FaArrowLeft className="text-on-background text-2xl hover:button-primary" onClick={onCallPrevBox}/>
                                <FaArrowRight className="text-on-background text-2xl hover:button-primary" onClick={onCallNextBox}/>
                           <NavButtons ref={navBtnRef[0]} textValue={"About Me"}></NavButtons>
                           
                           <NavButtons ref={navBtnRef[1]} textValue={"Projects"}></NavButtons>
                           <NavButtons ref={navBtnRef[2]} textValue={"Experience"}></NavButtons>
                           <NavButtons ref={navBtnRef[3]} textValue={"More"}></NavButtons>
                           

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
     );
     
});
export default Navbar;