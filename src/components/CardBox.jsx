import { use, useEffect, useState, useRef } from "react";
import SlideCards from "./SlideCards";
import FlashCard from "./FlashCard";

const CardBox = () => {

    const [topValues,setTopValues] = useState([80, 713, 753]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [disableMouseEvents1, setDisableMouseEvents1] = useState(false);
    const [disableMouseEvents2, setDisableMouseEvents2] = useState(false);


    
    const maxTops = [80, 160, 240]
    const startTops = [80, 713, 753]
        useEffect(() => {

            const handleScroll = (event) => {
                //setDisableMouseEvents(true);
                if(isAnimating) {
                    return; 
                }
                
                const currentScrollY = event.deltaY;
                if (currentScrollY > 0) {
                    scrollDown();


                }
                else if (currentScrollY < 0) {
                    scrollUp();
                }

                setIsAnimating(true);

        // Re-enable scroll detection after the animation duration (e.g., 0.5s)
        setTimeout(() => {
            setIsAnimating(false);
            //setDisableMouseEvents(false);
        }, 250); // Match the CSS transition duration
    
        // setTimeout(() => {
        //     setDisableMouseEvents(false);
        // },500);
            };


            
    
            
           
    
            window.addEventListener("wheel", handleScroll);
    
            return () => {
                window.removeEventListener("wheel", handleScroll);
            };
        }, [isAnimating]);

       
       
       
        const scrollUp = () => {
           

            setTopValues((prevTopValues) => {
                const newTopValues = [...prevTopValues];
                for(let i = newTopValues.length -1; i > 0; i--) {
                    if(newTopValues[i] <= maxTops[i]) {
                        
                        
                        newTopValues[i] = startTops[i];
                        setTimeout(() => {
                            mouseStateByIndex(i);
                        }, 500); // Delay to match the animation duration
                        break;
                    }
                }
                return newTopValues;
            });
        }
        const scrollDown = () => {

            setTopValues((prevTopValues) => {
                const newTopValues = [...prevTopValues];
                for(let i = 1; i < newTopValues.length; i++) {
                   
                    if(newTopValues[i] > maxTops[i]) {
                    mouseStateByIndex(i);

                        newTopValues[i] = maxTops[i];
                        break;
                    }
                }
                return newTopValues;
            });
        };

        const mouseStateByIndex = (index) => {
            if(index === 1){
                setDisableMouseEvents1(!disableMouseEvents1);

            }else if(index === 2){
                setDisableMouseEvents2(!disableMouseEvents2);
            }
        }


        
    // useEffect(() => {
    //     console.log("tops changed: ", topValues);
   
    // }, [topValues]);

   
    
    const handleMouseClick= (index) => {
        console.log("mouse click", index);
        setTopValues((prevTopValues) => {

            const newTopValues = [...topValues];
            if(newTopValues[index] > maxTops[index]) {
                newTopValues[index] = maxTops[index];
                mouseStateByIndex(index);
            }
            else if(newTopValues[index] == maxTops[index]) {
                newTopValues[index] = startTops[index];
               // mouseStateByIndex(index);
            }
            return newTopValues;
        });
    }


    
  return (
    
      <div className="relative h-full w-full bg-purple-500">
        <SlideCards  bg="bg-red-100" zIndex="z-10"  height = 'h-screen' top = '80px' pos='absolute' title="About Me" disableMouseEvents = {true} maxTop = {maxTops[0]}>
        
            <div className="grid grid-cols-2 gap-0 justify-items-stretch">
            
            <div className="w-auto">
                <p>Latin Latin Latin</p>
               
            </div>
            <img className=" top-[30px] objecct-scale-down h-1/2 w-1/2"
                src = 'src/assets/stickFigureME.png'
                alt="stickFigure"
            />
            </div>
        </SlideCards>

        <SlideCards onClick = {() =>{handleMouseClick(1)}} bg="bg-blue-100" zIndex="z-20"  height='h-screen' top ={ `${topValues[1]}px` } pos="absolute" title="Projects" disableMouseEvents = {disableMouseEvents1} maxTop = {maxTops[1]} >
            
            <p>Containers for project highlights</p>
            <div className="flex flex-row gap-4">
            <FlashCard 
                Title="project1"
                Description="Description1"
                link="linkTo1"
            />
            <FlashCard  
                Title="project2"
                Description="Description2"
                link="linkTo2"
            />
            <FlashCard
                Title="project3"
                Description="Description3"
                link="linkTo3"    
            />
            </div>
        </SlideCards>
        <SlideCards  onClick = {()=>{handleMouseClick(2)}} bg="bg-green-100" zIndex="z-30"  top ={  `${topValues[2]}px` } pos="absolute" height="h-screen" disableMouseEvents = {disableMouseEvents2} maxTop = {maxTops[2]}>   
            <h2 className="text-2xl font-bold mb-4">Card Box3</h2>
            <p>More stuff about me and/or links to more cool stuff idk yet</p>
        </SlideCards>

      </div>
     
    
  );
}
export default CardBox;