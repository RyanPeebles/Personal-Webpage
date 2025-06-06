import { useLayoutEffect, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import SlideCards from "./SlideCards";
import FlashCard from "./FlashCard";

const CardBox = forwardRef(({props, passCurrentCard, passPrevCard},ref) => {

 
 
  
   
    const [rank, setRank] = useState([0, 1, 2, 3]);

    const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
   
    const currentCard = useRef(0);
    const nextDrawer = useRef(1);
    const previousCard = useRef(3);

    const startWidths = useRef(null);
    const isAnimatingRef = useRef(false);
    const widthStep = window.innerWidth * 0.05;
    const topStep = window.innerHeight * 0.03;
    const maxTops = [40, 40, 40, 40]
    const startTops = [40, 60, 80, 100]
    const startColors = ['bg-surface3', 'bg-surface2', 'bg-surface1', 'bg-background'];
     const zIndexes = [40,30,20,10];
        useImperativeHandle(ref, () => ({
            callScrollDown: () => {
                scrollDown();
            },
            callScrollUp: () => {
                scrollUp();
            },
           
        }));
     
  


        useLayoutEffect(() => {
            const initialWidth = window.innerWidth -( window.innerWidth * 0.05);
           
           startWidths.current = [initialWidth, initialWidth - widthStep, initialWidth - widthStep*2, initialWidth - widthStep*3];
            
            
            const cardHeight = window.innerHeight *.7;

            

            currentCard.current = 0;
            passCurrentCard(currentCard.current);

            nextDrawer.current = 1;
            previousCard.current = 3;
           // passPrevCard(previousCard.current);

            

            cardRefs.forEach((card, index) => {
                card.current.callWidth(startWidths.current[index]);
                card.current.callTopPosition(startTops[index]);
                card.current.callColorChange(startColors[index]);
                card.current.callHeight(cardHeight);
                card.current.callZindex(zIndexes[index]);
            });
           
            
            
            }  , []);


        
        
        useEffect(() => {

            const handleScroll = (event) => {
               
                const currentScrollY = event.deltaY;
                if (currentScrollY > 0) {
                    scrollDown();


                }
                else if (currentScrollY < 0) {
                    scrollUp();
                }

                

        
            };


            
    
            
           
    
            window.addEventListener("wheel", handleScroll);
    
            return () => {
                window.removeEventListener("wheel", handleScroll);
            };
        }, []);

       
        const handleAnimation = (index) => {
           
               const cardRef = cardRefs[index];
            
               
                cardRef.current.callDuration(500);

              
                cardRef.current.callOpacity(0);
                
                cardRef.current.callTopPosition(0);
                
                cardRef.current.callWidth(window.innerWidth);
                setTimeout(() => {
                    
                    
                    cardRef.current.callDuration(0);
                   
                   
                    cardRef.current.callTopPosition(startTops[3] + 100);
                    
                    cardRef.current.callWidth(startWidths.current[3]- widthStep);
                   
                    cardRef.current.callZindex(0);
                   
                    cardRef.current.callColorChange(startColors[3]);
                    
                },500);
                
                setTimeout(() => {
                   
                    cardRef.current.callDuration(500);
                    
                    cardRef.current.callOpacity(1);
                    
                    cardRef.current.callTopPosition(startTops[3]);
                    
                    cardRef.current.callWidth(startWidths.current[3]);
                }, 550); // Delay to match the animation duration
            
        }

        const reverseAnimation = (index) => {
                const cardRef = cardRefs[index];

                cardRef.current.callDuration(500);
                

                cardRef.current.callTopPosition(window.innerHeight - 100);
             
                cardRef.current.callOpacity(.5);
                setTimeout(() => {
                
                
                cardRef.current.callDuration(0);
                
                cardRef.current.callZindex(40);
                }, 500); // Delay to match the animation duration
                setTimeout(() => { 
                    
                    cardRef.current.callDuration(500);
                   
                    cardRef.current.callOpacity(1);
                  
                    cardRef.current.callWidth(startWidths.current[0]);
                   
                    cardRef.current.callTopPosition(startTops[0]);
                }, 550); // Delay to match the animation duration

        }
       
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
       
        const scrollUp = async () => {
            if(isAnimatingRef.current) {
                return; 
            }
            isAnimatingRef.current = true;

            
            for(let i = 0; i < 4; i++) {
               
                
                if(i === previousCard.current) {
                   
                    reopenCard(i);
                    
                    
                // await sleep(100);
               
                }else{
                    
                    
                    cardRefs[i].current.callColorChange(startColors[i]);
                  
                    cardRefs[i].current.lowerTop(topStep);
                   
                    cardRefs[i].current.shrinkWidth(widthStep);
                    
                    cardRefs[i].current.lowerZindex(10);
                }
                
            }
            nextDrawer.current = currentCard.current;
            currentCard.current = previousCard.current;

            previousCard.current = previousCard.current -1;
            
            if(previousCard.current < 0) {
                previousCard.current = 3;
            }
            passPrevCard(previousCard.current);
            passCurrentCard(currentCard.current);


            setTimeout(() => {
                isAnimatingRef.current = false;
            }, 600); // Delay to match the animation duration
        }
        const scrollDown =  async () => {
            if(isAnimatingRef.current) {
                return; 
            }
            isAnimatingRef.current = true;
            
            
            for(let i = 0; i < 4; i++) {
                

               
                
                if(i === currentCard.current) {
                    
                    closeDrawer(i);

                    await sleep(100);
                
                
                }else if( i === nextDrawer.current) {
                    
                     openCard(i);
                    
                    cardRefs[i].current.expandWidth(widthStep);
                    
                    
                }else{
                    
                    
                    cardRefs[i].current.raiseTop(topStep);
                    cardRefs[i].current.expandWidth(widthStep);
                    cardRefs[i].current.raiseZindex(10);
                    
                    
                    
                }

                
                
                
               
            }
            previousCard.current = currentCard.current;
            currentCard.current = nextDrawer.current;
            

            nextDrawer.current = nextDrawer.current + 1;
                    if(nextDrawer.current > 3) {
                        nextDrawer.current = 0;
                    }
            passCurrentCard(currentCard.current);
            passPrevCard(previousCard.current)
            
            setTimeout(() => {
                isAnimatingRef.current = false;
            }, 600); // Delay to match the animation duration
            
        };

       

      

        const reopenCard = (index) => {

            

            cardRefs[index].current.callColorChange(startColors[0]);
            
           reverseAnimation(index);
        }
        const closeDrawer = (index) => {   
            handleAnimation(index);
        }

    
    
        const openCard = (index) => {
            cardRefs[index].current.callColorChange(startColors[0]);
            cardRefs[index].current.callTopPosition(maxTops[index]);
            cardRefs[index].current.callZindex(40);
        }
        
    
  return (
    
      <div className="relative grid grid-col max-w-screen place-items-center box-border h-screen w-screen text-on-background bg-background">
        <SlideCards ref={cardRefs[0]}  pos='absolute' title="About Me" >
        
            <div className="grid grid-cols-2 gap-0 w-full h-full">
            
            <div className="w-auto">
                <p>Recent Computer Science graduate with a passion for new technologies and innovation.
                 Skilled in C#, Java, Python, and JavaScript, with a strong understanding of machine learning and deep learning principles.
                  Excited to begin my journey in the professional world of software development and contribute to the industry's future.</p>
               
            </div>
            <img className=" top-[30px] objecct-scale-down  ml-50"
                src = 'src/assets/stickFigureME.png'
                alt="stickFigure"
            />
            </div>
        </SlideCards>

        <SlideCards ref={cardRefs[1]} pos="absolute" title="Projects" >
            
            <h3>Links to my personal projects</h3>
            <div className="flex flex-nowrap basis-lg gap-4 mt-4">
            <FlashCard 
                Title="Fruit Classifier AI"
                Description="Collaborated as a team to develop a machine learning model using ResNet50,
achieving 87% classification accuracy for labeling a fruit image dataset."
                link="linkTo1"
            />
            <FlashCard  
                Title="Review Tone Detection AI"
                Description="Built a text classifier using BERT tokenization to analyze customer reviews,
addressing linguistic nuances like irony and sarcasm"
                link="linkTo2"
            />
            <FlashCard
                Title="Pixel-Slider Lock password verification App"
                Description="Developed a secure login application using Google Firestore and Firebase with
front-end technologies (JavaScript, HTML, CSS)"
                link="linkTo3"    
            />
            <FlashCard
                Title="Portfolio Website"
                Description="Personal portfolio website showcasing my projects and skills, built with React and Tailwind CSS along with a custom API built in C#."
                link="linkTo4"    


            />
            </div>
        </SlideCards>
        <SlideCards  ref={cardRefs[2]}  title="Work and Education"  pos="absolute">
        <h3>My work experience and education</h3>
        <h2 className="text-2xl font-bold mb-1 mt-4 ">Education</h2>
               <ol className="list-disc list-inside">
                <li className="font-bold">Georgia State University, Atlanta, GA
                    <ul className="list-none list-inside font-normal text-sm ml-8">
                    <li>Bachelor of Computer Science</li>
                    <li>Graduated: May 2024</li>
                    </ul>
                </li>

                <li className="font-bold">University of North Georgia, Gainesville, GA
                    <ul className="list-none list-inside font-normal text-sm ml-8">
                    <li>Associate of Computer Science</li>
                    <li>Graduated: May 2022</li>
                    </ul>
                </li>
                
                </ol>
            <h2 className="text-2xl font-bold mb-1 mt-4 ">Work Experience</h2>
               <ol className="list-disc list-inside">
                <li className="font-bold">Colletta Food and Wine Bar, Alpharetta, GA
                    <ul className="list-none list-inside font-normal text-sm ml-8">
                    <li>Line Cook</li>
                    <li>January 2022 - current</li>
                    </ul>
                </li>

                <li className="font-bold">Antebellum Restaurant, Flowery Branch, GA
                    <ul className="list-none list-inside font-normal text-sm ml-8">
                    <li>Line Cook</li>
                    <li>September 2022 - July 2023</li>
                    </ul>
                </li>
                <li className="font-bold">Provino's Italian Restaurant, Buford, GA
                    <ul className="list-none list-inside font-normal text-sm ml-8">
                    <li>Line Cook/Server Assistant</li>
                    <li>September 2017 - December 2022</li>
                    </ul>
                </li>
                
                </ol>
       
        </SlideCards>
        <SlideCards ref={cardRefs[3]}  title="Hobbies and More"  pos="absolute" >   
            
            <h3>More about my interest in Games, Art, and more!</h3>
        </SlideCards>

      </div>
     
    
  );
});
export default CardBox;