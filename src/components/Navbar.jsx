
import { useRef,useEffect, useLayoutEffect, useState, forwardRef, useImperativeHandle} from "react";
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from "react-icons/fa6";




import NavButtons from "./NavButtons";
import ThemeToggle from "./themeToggle";

const Navbar = forwardRef(({onCallNextBox, onCallPrevBox}, ref) => {
    

    const intervalRef = useRef(null);
    const timerRef = useRef(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [prevCard, setPrevCard] = useState(null);
    const [nextCard, setNextCard] = useState(null);
    
    
    const navBtnRef = [useRef(), useRef(), useRef(), useRef()];


    
    // useEffect(() => {
    //     navBtnRef.current[0] = document.querySelector('.animate--animate-fillText');

    // }, []);

    useImperativeHandle(ref, () => ({
        recieveCurrentCard: (card) => {
            setCurrentCard(card);
        },
        recievePrevCard: (card) => {
            setPrevCard(card);
        },
        recieveNextCard: (card) => {
            setNextCard(card);
        }
    }));

    useEffect(() => {
        if(currentCard !== null){
            navBtnRef[currentCard].current.animationSwitch("unload");
        }

    },[currentCard]);
    useEffect(() => {
        if(prevCard !== null){
            navBtnRef[prevCard].current.animationSwitch("reset");
        }

    },[prevCard]);
    useEffect(() => {
        if(nextCard !== null){
            navBtnRef[nextCard].current.animationSwitch("load");
        }

    },[nextCard]);
    // const handleLoadAnimation = (currentCard) => {
    //     if(currentCard) {
    //     console.log("animation started for card: " ,currentCard);
    //     navBtnRef[currentCard].current.setIsCurrent(true);
    //     }else {
    //         //navBtnRef[0].current.setIsCurrent(true);
    //     }
    // };

    // const handleUnloadAnimation = (prevCard) => {
    //     if(prevCard) {
    //     // console.log("animation ended for card: " ,currentCard);
    //     //navBtnRef[prevCard].current.animationSwitch("reset");
    //     navBtnRef[prevCard].current.animationSwitch("unload");
        
    //     }
    //     else {
    //        // navBtnRef[0].current.animationSwitch("reset");
    //         navBtnRef[0].current.animationSwitch("unload");
    //     }
    // }
      
   
    const pause = () => {
        const playBtn = document.getElementById("playBtn");
        playBtn.style.display = "block";
        const pauseBtn = document.getElementById("pauseBtn");
        pauseBtn.style.display = "none";
        unmountInterval(); // Stop the interval
        navBtnRef[currentCard].current.setPauseAnimation(true);
        navBtnRef[nextCard].current.setPauseAnimation(true);
       
    }

    const play = () => {
        const playBtn = document.getElementById("playBtn");
        playBtn.style.display = "none";
        const pauseBtn = document.getElementById("pauseBtn");
        pauseBtn.style.display = "block";
        resumeTimer();
        mountInterval(); // Start the interval again
        navBtnRef[currentCard].current.setPauseAnimation(false);
        navBtnRef[nextCard].current.setPauseAnimation(false);
       
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
        navBtnRef[0].current.animationSwitch("unload");
        navBtnRef[1].current.animationSwitch("load");
        navBtnRef[2].current.animationSwitch("reset");
        navBtnRef[3].current.animationSwitch("reset");

        
        
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
                               
                                
                                <div className = 'flex mx-2 align-center items-center'>
                            <ThemeToggle/>
                            <FaPlay id="playBtn" className="text-white text-2xl hover:button-primary hidden" onClick={play}/>
                            <FaPause id="pauseBtn" className="text-white text-2xl hover:button-primary" onClick={pause}/>
                                
                                
                            <FaArrowLeft className="text-on-background text-2xl hover:button-primary" onClick={onCallPrevBox}/>
                            <FaArrowRight className="text-on-background text-2xl hover:button-primary" onClick={onCallNextBox}/>
                            </div>
                            <div className = 'flex p-2 align-center items-center space-x-4'>
                            <NavButtons ref={navBtnRef[0]} textValue={"About Me"}></NavButtons>
                           
                           <NavButtons ref={navBtnRef[1]} textValue={"Projects"}></NavButtons>
                           <NavButtons ref={navBtnRef[2]} textValue={"Experience"}></NavButtons>
                           <NavButtons ref={navBtnRef[3]} textValue={"More"}></NavButtons>
                            </div>
                           

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
     );
     
});
export default Navbar;