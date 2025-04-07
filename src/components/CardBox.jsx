import { use, useEffect, useState, useRef } from "react";
import SlideCards from "./SlideCards";
import FlashCard from "./FlashCard";

const CardBox = () => {

    const [scrollY, setScrollY] = useState(0);
    const [topValues,setTopValues] = useState([80, 613, 653]);


    const [scrollDirection, setScrollDirection] = useState('none');
    const lastScrollRef = useRef('dowm');
    
    const maxTops = [80, 160, 240]
        useEffect(() => {
            const handleScroll = (event) => {
                //setScrollY(window.scrollY);
    
                const currentScrollY = event.deltaY;
                if (currentScrollY > 0) {
                    setScrollDirection('down');
                    lastScrollRef.current = 'down';
                    updateTopValues('down', currentScrollY);


                }
                else if (currentScrollY < 0) {
                    setScrollDirection('up');
                    lastScrollRef.current = 'up';
                    updateTopValues('up', currentScrollY);
                }
                //setLastScrollY(currentScrollY);
                console.log("scroll: ", lastScrollRef.current);
    
    
            };


            
    
            
            //TODO: add position property switching functions to pass a props to slideCards.
            //TODO: add a function to calculate the start size and position of the cards based on screen size.
    
            window.addEventListener("wheel", handleScroll);
    
            return () => {
                window.removeEventListener("wheel", handleScroll);
            };
        }, []);



        const updateTopValues = ( direction ,strength) => {
            setTopValues((prevTopValues) => {
            const newTopValues = [...prevTopValues];

            for(let i = 0; i < newTopValues.length; i++) {
                if(newTopValues[i] <= maxTops[i]) {
                    
                    console.log("max top value reached: ", topValues[i], "card: ", i);
                        continue;
                    
                }
                else if(newTopValues[i] > maxTops[i]) {
                    console.log("updating top value: ", topValues[i], "card: ", i);
                    newTopValues[i] = newTopValues[i] + (direction === 'down' ? -20: 20);
                    console.log("new top value: ", newTopValues[i]);
                    break;
                }
            }
            return newTopValues;

        });
        };



        
    useEffect(() => {
        console.log("tops changed: ", topValues);
   
    }, [topValues]);

    const calculateCardSize = (cardIndex) => {
        const windowHeight = window.innerHeight;
    
        const startHeight = Math.round(windowHeight * .051);
        
        const cardHeight = windowHeight - (startHeight*2) - (startHeight * cardIndex);
        //console.log("card size: " , cardHeight, "startHeight: ", startHeight, "window height: ", windowHeight);
        return `h-[${cardHeight}px]`;
    }
    
    


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
    
      <div className="relative h-full w-full bg-purple-500">
        <SlideCards bg="bg-red-100" zIndex="z-10" opacity={calculateOpacity(0)} height = 'h-[660px]' top = {'80px'}  pos='absolute' title="About Me">
        
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

        <SlideCards bg="bg-blue-100" zIndex="z-20" opacity={calculateOpacity(1)} height='h-screen' top ={ `${topValues[1]}px` } pos="absolute" title="Projects" >
            
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
        <SlideCards bg="bg-green-100" zIndex="z-30" opacity={calculateOpacity(2)} top ={  `${topValues[2]}px` } pos="absolute" height="h-[400px]" >   
            <h2 className="text-2xl font-bold mb-4">Card Box3</h2>
            <p>More stuff about me and/or links to more cool stuff idk yet</p>
        </SlideCards>

      </div>
     
    
  );
}
export default CardBox;