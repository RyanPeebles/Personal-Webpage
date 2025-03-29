import { use, useEffect, useState } from "react";
import SlideCards from "./SlideCards";
import FlashCard from "./FlashCard";

const CardBox = () => {

    const [scrollY, setScrollY] = useState(0);
    const  [scrollDisable, setScrollDisable] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            console.log("scrollY: ",window.scrollY);
            const threshold = 560;
            if(scrollY > threshold) {
                setScrollDisable(true);
                
            }
            else {
                setScrollDisable(false);
            }
            
        };

        
    

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    

    useEffect(() => {



        const lockScroll = () => {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
        }
        const unlockScroll = () => {
            const scrollY = parseInt(document.body.style.top || '0', 10) *-1;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY);
        }

        if(scrollDisable){
            lockScroll();
        }
        else {
            unlockScroll();
        };

        return () => {
            unlockScroll();
        };
    }, [scrollDisable]);

    const calculateOpacity = (cardIndex) => {
        const cardHeight = window.innerHeight;
        //console.log("card size: " , cardHeight);
        const startFade = cardIndex * cardHeight;
        const endFade = startFade + cardHeight;
        return 'opacity-100';
        // if(scrollY < startFade) {
        //     return 'opacity-100';
        // }
        // if(scrollY > endFade) {
        //     return 'opacity-0';
        // }
        // console.log("scroll: " ,scrollY, "Fade Start: ", startFade, "fade end: ", endFade);

        // const opacityPercentage = 100 - ((scrollY-startFade)/cardHeight) * 100;
        // const opacityStep = Math.round(opacityPercentage/10) * 10;

        // console.log("opacity values ",opacityStep, opacityPercentage);

        // return `opacity-${opacityStep}`;
    };

    // const calculateCardSize = (cardIndex) => {
    //     const 
  return (
    
      <div className="sticky min-h-2379 w-full top-40 bg-purple-500">
        <SlideCards bg="bg-red-100" zIndex="z-10" opacity={calculateOpacity(0)} top = 'top-20' title="About Me">
        
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

        <SlideCards bg="bg-blue-100" zIndex="z-20" opacity={calculateOpacity(1)} top="top-40" title="Projects" >
            
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
        <SlideCards bg="bg-green-100" zIndex="z-30" opacity={calculateOpacity(2)} top="top-60" >   
            <h2 className="text-2xl font-bold mb-4">Card Box3</h2>
            <p>More stuff about me and/or links to more cool stuff idk yet</p>
        </SlideCards>

      </div>
     
    
  );
}
export default CardBox;