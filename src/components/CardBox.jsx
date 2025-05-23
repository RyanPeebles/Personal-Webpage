import { use, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import SlideCards from "./SlideCards";
import FlashCard from "./FlashCard";

const CardBox = forwardRef((props,ref) => {

   
    // const [isAnimating, setIsAnimating] = useState(false);
    // const [disableMouseEvents1, setDisableMouseEvents1] = useState(false);
    // const [disableMouseEvents2, setDisableMouseEvents2] = useState(false);
   
    // const [zIndexs, setZIndexs] = useState([40, 30, 20, 10]);
    // const [nextDrawer, setNextDrawer] = useState(1);
    
  
   
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
    const startColors = ['#2C2C2E', '#212222', '#1B1B1C', '#151516'];
     const zIndexes = [40,30,20,10];
        useImperativeHandle(ref, () => ({
            callScrollDown: () => {
                scrollDown();
            },
            callScrollUp: () => {
                scrollUp();
            },
            currentCardRef: currentCard.current,
        }));
     
  


        useEffect(() => {
            const initialWidth = window.innerWidth -( window.innerWidth * 0.05);
           
           startWidths.current = [initialWidth, initialWidth - widthStep, initialWidth - widthStep*2, initialWidth - widthStep*3];
            
            
            const cardHeight = window.innerHeight *.7;

            // const initialHeight = (window.innerHeight/10) * 7;
            // const newHeights = [initialHeight, initialHeight, initialHeight, initialHeight];
            // setHeights(newHeights);

            currentCard.current = 0;

            console.log("Is my ref ready?", cardRefs[0].current);

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
                //setDisableMouseEvents(true);
                // if(isAnimatingRef.current) {
                //     return; 
                // }
                // isAnimatingRef.current = true;
                const currentScrollY = event.deltaY;
                if (currentScrollY > 0) {
                    scrollDown();


                }
                else if (currentScrollY < 0) {
                    scrollUp();
                }

                

        // Re-enable scroll detection after the animation duration (e.g., 0.5s)
        // setTimeout(() => {
        //     isAnimatingRef.current = false;
        //     //setDisableMouseEvents(false);
        // }, 550); // Match the CSS transition duration
    
        // setTimeout(() => {
        //     setDisableMouseEvents(false);
        // },500);
            };


            
    
            
           
    
            window.addEventListener("wheel", handleScroll);
    
            return () => {
                window.removeEventListener("wheel", handleScroll);
            };
        }, []);

       
        const handleAnimation = (index) => {
           
               const cardRef = cardRefs[index];
               console.log("cardRef", cardRef.current);
                // setDuration((prevDuration) => {
                //     const newDuration = [...prevDuration];
                //     newDuration[index] = 500;
                //     return newDuration;
                // });
                cardRef.current.callDuration(500);

                // setOpacities((prevOpacities) => {
                //     const newOpacities = [...prevOpacities];
                //     newOpacities[index] = 0;
                //     return newOpacities;
                // });
                cardRef.current.callOpacity(0);
                // setTopValues((prevTopValues) => {
                //     const newTopValues = [...prevTopValues];
                //     newTopValues[index] =0;
                //     return newTopValues;
                // });
                cardRef.current.callTopPosition(0);
                // setWidths((prevWidths) => {
                //     const newWidths = [...prevWidths];
                //     newWidths[index] = window.innerWidth;
                //     return newWidths;
                // });
                cardRef.current.callWidth(window.innerWidth);
                setTimeout(() => {
                    
                    // setDuration((prevDuration) => {
                    //     const newDuration = [...prevDuration];
                    //     newDuration[index] = 0;
                    //     return newDuration;
                    // });
                    cardRef.current.callDuration(0);
                   
                    // setTopValues((prevTopValues) => {
                    //     const newTopValues = [...prevTopValues];
                    //     newTopValues[index] = startTops[3] + 100;
                    //     return newTopValues;
                    // });
                    cardRef.current.callTopPosition(startTops[3] + 100);
                    // setWidths((prevWidths) => {
                    //     const newWidths = [...prevWidths];
                    //     newWidths[index] = startWidths.current[3]- widthStep;
                    //     return newWidths;
                    // });
                    cardRef.current.callWidth(startWidths.current[3]- widthStep);
                    // setZIndexs((prevZIndexs) => {
                    //     const newZIndexs = [...prevZIndexs];
                    //     newZIndexs[index] = 0;
                    //     return newZIndexs;
                    // });
                    cardRef.current.callZindex(0);
                    // setColoring((prevColor) => {
                    //     const newColor = [...prevColor];
                    //     newColor[index] = startColors[3];
                    //     return newColor;
                    // });
                    cardRef.current.callColorChange(startColors[3]);
                    
                },500);
                
                setTimeout(() => {
                    // setDuration((prevDuration) => {
                    //     const newDuration = [...prevDuration];
                    //     newDuration[index] = 500;
                    //     return newDuration;
                    // });
                    cardRef.current.callDuration(500);
                    // setOpacities((prevOpacities) => {
                    //     const newOpacities = [...prevOpacities];
                    //     newOpacities[index] = 1;
                    //     return newOpacities;
                    // });
                    cardRef.current.callOpacity(1);
                    // setTopValues((prevTopValues) => {
                    //     const newTopValues = [...prevTopValues];
                    //     newTopValues[index] = startTops[3];
                    //     return newTopValues;
                    // });
                    cardRef.current.callTopPosition(startTops[3]);
                    // setWidths((prevWidths) => {
                    //     const newWidths = [...prevWidths];
                    //     console.log("final width", startWidths.current[3]);
                    //     console.log("widths",startWidths.current);
                    //     newWidths[index] = startWidths.current[3];
                    //     return newWidths;
                    // });
                    cardRef.current.callWidth(startWidths.current[3]);
                }, 550); // Delay to match the animation duration
            
        }

        const reverseAnimation = (index) => {
                const cardRef = cardRefs[index];

                cardRef.current.callDuration(500);
                // setTopValues((prevTopValues) => {
                //     const newTopValues = [...prevTopValues];
                //     newTopValues[index] = window.innerHeight - 100;
                //     return newTopValues;
                // });

                cardRef.current.callTopPosition(window.innerHeight - 100);
                // setOpacities((prevOpacities) => {
                //     const newOpacities = [...prevOpacities];
                //     newOpacities[index] =.5;
                //     return newOpacities;
                // });
                cardRef.current.callOpacity(.5);
                setTimeout(() => {
                //     setDuration((prevDuration) => {
                //         const newDuration = [...prevDuration];
                //         newDuration[index] = 0;
                //         return newDuration;
                //     });
                
                cardRef.current.callDuration(0);
                //     setZIndexs((prevZIndexs) => {
                //         const newZIndexs = [...prevZIndexs];
                //         newZIndexs[index] = 40;
                //         return newZIndexs;
                //     });
                cardRef.current.callZindex(40);
                }, 500); // Delay to match the animation duration
                setTimeout(() => { 
                    // setDuration((prevDuration) => {
                    //     const newDuration = [...prevDuration];
                    //     newDuration[index] = 500;
                    //     return newDuration;
                    // });
                    cardRef.current.callDuration(500);
                    // setOpacities((prevOpacities) => {
                    //     const newOpacities = [...prevOpacities];
                    //     newOpacities[index] = 1;
                    //     return newOpacities;
                    // });
                    cardRef.current.callOpacity(1);
                    // setWidths((prevWidths) => {
                    //     const newWidths = [...prevWidths];
                    //     console.log("final width", startWidths.current[3]);
                    //     console.log("widths",startWidths.current);
                    //     newWidths[index] = startWidths.current[0];
                    //     return newWidths;
                    // });
                    cardRef.current.callWidth(startWidths.current[0]);
                    // setTopValues((prevTopValues) => {
                    //     const newTopValues = [...prevTopValues];
                    //     newTopValues[index] = startTops[0];
                    //     return newTopValues;
                    // });
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
               
                console.log("next drawer", nextDrawer);
                if(i === previousCard.current) {
                    console.log("open drawer", i);
                    reopenCard(i);
                    
                    
                // await sleep(100);
               
                }else{
                    console.log("slide drawer", i);
                    //openCard(i);
                    // setColoring((prevColor) => {
                    //     const newColor = [...prevColor]; 
                    //     newColor[j] = 'bg-[#1E1E1E]';
                    //     return newColor;
                    // });
                    cardRefs[i].current.callColorChange('#1E1E1E');
                    // lowerTop(j);
                    cardRefs[i].current.lowerTop(topStep);
                    // shrinkWidth(j);
                    cardRefs[i].current.shrinkWidth(widthStep);
                    // lowerZIndex(j); 
                    cardRefs[i].current.lowerZindex(10);
                }
                
            }
            nextDrawer.current = currentCard.current;
            currentCard.current = previousCard.current;
            previousCard.current = previousCard.current -1;
            if(previousCard.current < 0) {
                previousCard.current = 3;
            }
            setTimeout(() => {
                isAnimatingRef.current = false;
            }, 600); // Delay to match the animation duration
        }
        const scrollDown =  async () => {
            if(isAnimatingRef.current) {
                return; 
            }
            isAnimatingRef.current = true;
            
            // incRank();
            for(let i = 0; i < 4; i++) {
                

               
                
                if(i === currentCard.current) {
                    console.log("close drawer",i);
                    console.log("next: ", nextDrawer.current);
                    closeDrawer(i);

                    await sleep(100);
                
                
                }else if( i === nextDrawer.current) {
                    console.log("open drawer", i);
                     openCard(i);
                    // setNewZIndex(i);
                    cardRefs[i].current.expandWidth(widthStep);
                    // setNextDrawer((prevNextDrawer) => prevNextDrawer + 1);
                    
                }else{
                    console.log("slide drawer", i);
                    //openCard(i);
                    cardRefs[i].current.raiseTop(topStep);
                    cardRefs[i].current.expandWidth(widthStep);
                    cardRefs[i].current.raiseZindex(10);
                    //changeColor(j);
                    
                    
                }

                
                
                
               
            }
            previousCard.current = currentCard.current;
            currentCard.current = nextDrawer.current;
            nextDrawer.current = nextDrawer.current + 1;
                    if(nextDrawer.current > 3) {
                        nextDrawer.current = 0;
                    }
            
            setTimeout(() => {
                isAnimatingRef.current = false;
            }, 600); // Delay to match the animation duration
            
        };

        // const incRank = () => {
        //     setRank((prevRank) => { 
        //         const newRank = [...prevRank];
        //         for(let i = 0; i < newRank.length; i++) {
        //             if(newRank[i] === 3) {
        //                 newRank[i] = 0;
        //             }else{
        //                 newRank[i] = newRank[i] + 1;
        //             }
        //         }
        //           return newRank;
         
        //     });
        // }

        // const decRank = () => {
        //     setRank((prevRank) => { 
        //         const newRank = [...prevRank];
        //         for(let i = 0; i < newRank.length; i++) {
        //             if(newRank[i] === 0) {
        //                 newRank[i] = 3;
        //             }else{
        //                 newRank[i] = newRank[i] - 1;
        //             }
        //         }
        //         return newRank;
                        
        //     });
                
        // }

        // const changeColor = (index) => {
        //     setColoring((prevColor) => {
        //         const newColor = [...prevColor];
        //         newColor[index] = startColors[rank[index]];
        //         return newColor;
        //     });
        // }

        const reopenCard = (index) => {

            console.log("reopen drawer", index);
            // setColoring((prevColor) => {
            //     const newColor = [...prevColor];
            //     newColor[index] = 'bg-[#2C2C2E]';
            //     return newColor;
            // });
            cardRefs[index].current.callColorChange(startColors[0]);
            
            // let j = index -1;
            // if(j < 0) {
            //     j = 3;
            // }
            // setPreviousOpened(j);
           reverseAnimation(index);
        }
        const closeDrawer = (index) => {
           
            // setClosing((prevClosing) => {
            //     const newClosing = [...prevClosing];
            //     newClosing[index] = true;
            //     return newClosing;
            // });
            console.log("animating", index);
            
            // setPreviousOpened(index);
            handleAnimation(index);
        }

        // const shrinkWidth = (index) => {
        //     setWidths((prevWidths) => {
        //         const newWidths = [...prevWidths];
        //         newWidths[index] = newWidths[index] - widthStep;
        //         return newWidths;
        //     });
            
        // }

        // const expandWidth = (index) => {
        //     setWidths((prevWidths) => {
        //         const newWidths = [...prevWidths];
        //         newWidths[index] = newWidths[index] + widthStep;
        //         return newWidths;
        //     });
        // }

    
        const openCard = (index) => {
            
            // setColoring((prevColor) => {
            //     const newColor = [...prevColor];
            //     newColor[index] = startColors[0];
            //     return newColor;
            // });
            cardRefs[index].current.callColorChange(startColors[0]);

            
            // setTopValues((prevTopValues) => {
            //     const newTopValues = [...prevTopValues];
            //     newTopValues[index] = maxTops[index];
            //     return newTopValues;
            // });
            cardRefs[index].current.callTopPosition(maxTops[index]);
            // setHasOpened((prevHasOpened) => {
            //     const newHasOpened = [...prevHasOpened];
            //     newHasOpened[index] = true;
            //     return newHasOpened;
            // });
            // setZIndexs((prevZIndexs) => {
            //     const newZIndexs = [...prevZIndexs];
            //     newZIndexs[index] = 40;
            //     return newZIndexs;
            // });
            cardRefs[index].current.callZindex(40);
           //currentCard.current = index;
            
        }
        
        // const lowerTop = (index) => {
        //     setTopValues((prevTopValues) => {
        //         const newTopValues = [...prevTopValues];
        //         newTopValues[index] = newTopValues[index] + topStep;
        //         return newTopValues;
        //     });
        // }

        // const raiseZIndex = (index) => {
        //     setZIndexs((prevZIndexs) => {
        //         // console.log("Previous zIndexs:", prevZIndexs);
        //         const newZIndexs = [...prevZIndexs];
        //         newZIndexs[index] = newZIndexs[index] + 10;
        //         return newZIndexs;
        //     });
        // }
        // const lowerZIndex = (index) => {
        //     setZIndexs((prevZIndexs) => {
        //         // console.log("Previous zIndexs:", prevZIndexs);
        //         const newZIndexs = [...prevZIndexs];
        //         newZIndexs[index] = newZIndexs[index] - 10;
        //         return newZIndexs;
        //     });
        // }
        
        // const mouseStateByIndex = (index) => {
        //     if(index === 1){
        //         setDisableMouseEvents1(!disableMouseEvents1);

        //     }else if(index === 2){
        //         setDisableMouseEvents2(!disableMouseEvents2);
        //     }
        // }


        

   
    
    // const handleMouseClick= (index) => {
    //     console.log("mouse click", index);
    //     setTopValues((prevTopValues) => {

    //         const newTopValues = [...prevTopValues];
    //         if(newTopValues[index] > maxTops[index]) {
    //             newTopValues[index] = maxTops[index];
    //             mouseStateByIndex(index);
    //         }
    //         else if(newTopValues[index] == maxTops[index]) {
    //             newTopValues[index] = startTops[index];
    //            // mouseStateByIndex(index);
    //         }
    //         return newTopValues;
    //     });
    // }


    
  return (
    
      <div className="relative grid grid-col max-w-screen place-items-center box-border h-screen w-screen  bg-[#121212]">
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