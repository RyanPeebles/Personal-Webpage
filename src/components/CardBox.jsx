import { useEffect, useState } from "react";
import SlideCards from "./SlideCards";
import FlashCard from "./FlashCard";

const CardBox = () => {

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const calculateOpacity = (cardIndex) => {
        const cardHeight = window.innerHeight;
        const startFade = cardIndex * cardHeight;
        const endFade = startFade + cardHeight;

        if(scrollY < startFade) {
            return 'opacity-100';
        }
        if(scrollY > endFade) {
            return 'opacity-0';
        }

        const opacityPercentage = 100 - ((scrollY-startFade)/cardHeight) * 100;
        const opacityStep = Math.round(opacityPercentage/10) * 10;
        
        return `opacity-${opacityStep}`;
    };

    const calculateTranslateY = (cardIndex) => {
        const cardHeight = window.innerHeight;
        
        const translateY = cardHeight - (20*cardIndex);
        return `bottom-${translateY}`;
    }
  return (
    
      <div className=" relative  min-h-[320vh] w-full">
        <SlideCards bg="bg-red-100" zIndex="z-10" opacity={calculateOpacity(0)} top = 'top-20'>
            <h2 className="text-2xl font-bold mb-4">Card Box</h2>
            <h3 className="text-xl font-bold mb-4">About Me</h3>
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

        <SlideCards bg="bg-blue-100" zIndex="z-20" opacity={calculateOpacity(1)} top="top-40" yIndex={calculateTranslateY(1)}>
            <h2 className="text-2xl font-bold mb-4">Card Box2</h2>
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
        <SlideCards bg="bg-green-100" zIndex="z-30" opacity={calculateOpacity(2)} top="top-60" yIndex={calculateTranslateY(2)}>   
            <h2 className="text-2xl font-bold mb-4">Card Box3</h2>
            <p>More stuff about me and/or links to more cool stuff idk yet</p>
        </SlideCards>

      </div>
    
  );
}
export default CardBox;