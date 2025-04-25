import { use, useEffect, useState, useRef } from "react";
import SlideCards from "./SlideCards";
import FlashCard from "./FlashCard";

const CardBox = () => {

    const [topValues,setTopValues] = useState([40, 60, 80, 100]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [disableMouseEvents1, setDisableMouseEvents1] = useState(false);
    const [disableMouseEvents2, setDisableMouseEvents2] = useState(false);
    const [openDrawers, setOpenDrawers] = useState([true, false, false, false]);
    const [hasOpened, setHasOpened] = useState([true, false, false, false]);
    const [widths, setWidths] = useState([98, 98, 98, 98]);
    const [heights, setHeights] = useState([100, 100, 100, 100]);
    const [zIndexs, setZIndexs] = useState([40, 30, 20, 10]);
    const [nextDrawer, setNextDrawer] = useState(1);
    const [currentDrawer, setCurrentDrawer] = useState(0);
    const [opacities, setOpacities] = useState([1, 1, 1, 1]);
    const [closing, setClosing] = useState([false, false, false, false]);
    const [duration, setDuration] = useState([500,500,500,500]);

    const startWidths = useRef(null);
    const widthStep = window.innerWidth * 0.05;
    const topStep = window.innerHeight * 0.03;
    const maxTops = [40, 40, 40, 40]
    const startTops = [40, 60, 80, 100]
    

  
    

        useEffect(() => {
            const initialWidth = window.innerWidth -( window.innerWidth * 0.05);
           
            const newWidths = [initialWidth, initialWidth - widthStep, initialWidth - widthStep*2, initialWidth - widthStep*3];
            setWidths(newWidths);
            startWidths.current= [...newWidths];

            const newHeights = [window.innerHeight - 100, window.innerHeight - 100, window.innerHeight - 100, window.innerHeight - 100];

            setCurrentDrawer(0);

            
            
            }  , []);



        useEffect(() => {

            const handleScroll = (event) => {
                //setDisableMouseEvents(true);
                if(isAnimating) {
                    return; 
                }
                setIsAnimating(true);
                const currentScrollY = event.deltaY;
                if (currentScrollY > 0) {
                    scrollDown();


                }
                else if (currentScrollY < 0) {
                    scrollUp();
                }

                

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

       
        const handleAnimation = (index) => {
           
               
                setDuration((prevDuration) => {
                    const newDuration = [...prevDuration];
                    newDuration[index] = 500;
                    return newDuration;
                });
                setOpacities((prevOpacities) => {
                    const newOpacities = [...prevOpacities];
                    newOpacities[index] = .5;
                    return newOpacities;
                });
                setTopValues((prevTopValues) => {
                    const newTopValues = [...prevTopValues];
                    newTopValues[index] = window.innerHeight;
                    return newTopValues;
                });
                setWidths((prevWidths) => {
                    const newWidths = [...prevWidths];
                    newWidths[index] = startWidths.current[3] - widthStep - widthStep;
                    return newWidths;
                });

                setTimeout(() => {
                    
                    setDuration((prevDuration) => {
                        const newDuration = [...prevDuration];
                        newDuration[index] = 0;
                        return newDuration;
                    });
                   
                    setTopValues((prevTopValues) => {
                        const newTopValues = [...prevTopValues];
                        newTopValues[index] = window.innerHeight - 100;
                        return newTopValues;
                    });
                    
                    setZIndexs((prevZIndexs) => {
                        const newZIndexs = [...prevZIndexs];
                        newZIndexs[index] = -10;
                        return newZIndexs;
                    });
                    
                },500);
                
                setTimeout(() => {
                    setDuration((prevDuration) => {
                        const newDuration = [...prevDuration];
                        newDuration[index] = 500;
                        return newDuration;
                    });
                    setOpacities((prevOpacities) => {
                        const newOpacities = [...prevOpacities];
                        newOpacities[index] = 1;
                        return newOpacities;
                    });
                    setTopValues((prevTopValues) => {
                        const newTopValues = [...prevTopValues];
                        newTopValues[index] = startTops[3];
                        return newTopValues;
                    });
                    setWidths((prevWidths) => {
                        const newWidths = [...prevWidths];
                        console.log("final width", startWidths.current[3]);
                        console.log("widths",startWidths.current);
                        newWidths[index] = startWidths.current[3];
                        return newWidths;
                    });
                }, 550); // Delay to match the animation duration
            
        }
       
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
       
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
        const scrollDown =  async () => {
            let j = currentDrawer;
            for(let i = 0; i < 4; i++) {
                

                console.log("current drawer", currentDrawer);
                console.log("next drawer", nextDrawer);
                if(j === currentDrawer) {
                    console.log("close drawer", j);
                    closeDrawer(j);

                    await sleep(100);
                
                
                }else if( j === nextDrawer) {
                    console.log("open drawer", j);
                    openCard(j);
                    // setNewZIndex(i);
                    expandWidth(j);
                    setNextDrawer((prevNextDrawer) => prevNextDrawer + 1);
                    if(nextDrawer >= 3) {
                        setNextDrawer(0);
                    }
                }else{
                    console.log("slide drawer", j);
                    //openCard(i);
                    raiseTop(j);
                    expandWidth(j);
                    raiseZIndex(j);
                    
                    
                }
                j++;
                if(j > 3) {
                    j = 0;
                }
            }
            
            
        };
        const closeDrawer = (index) => {
           
            // setClosing((prevClosing) => {
            //     const newClosing = [...prevClosing];
            //     newClosing[index] = true;
            //     return newClosing;
            // });
            console.log("animating", index);
            handleAnimation(index);
        }

        const shrinkWidth = (index) => {
            setWidths((prevWidths) => {
                const newWidths = [...prevWidths];
                newWidths[index] = newWidths[index] - widthStep;
                return newWidths;
            });
            
        }

        const expandWidth = (index) => {
            setWidths((prevWidths) => {
                const newWidths = [...prevWidths];
                newWidths[index] = newWidths[index] + widthStep;
                return newWidths;
            });
        }

    
        const openCard = (index) => {
            setOpenDrawers((prevOpenDrawers) => {
                const newOpenDrawers = [...prevOpenDrawers];
                const updatedOpenDrawers = newOpenDrawers.map((_, i) => i === index ? true : false);
                
                return updatedOpenDrawers;
               
            });
            
            setTopValues((prevTopValues) => {
                const newTopValues = [...prevTopValues];
                newTopValues[index] = maxTops[index];
                return newTopValues;
            });
            setHasOpened((prevHasOpened) => {
                const newHasOpened = [...prevHasOpened];
                newHasOpened[index] = true;
                return newHasOpened;
            });
            setZIndexs((prevZIndexs) => {
                const newZIndexs = [...prevZIndexs];
                newZIndexs[index] = 40;
                return newZIndexs;
            });
            setCurrentDrawer(index);
            
        }
        const raiseTop = (index) => {
            setTopValues((prevTopValues) => {
                const newTopValues = [...prevTopValues];
                newTopValues[index] = newTopValues[index] - topStep;
                return newTopValues;
            });
        }

        const raiseZIndex = (index) => {
            setZIndexs((prevZIndexs) => {
                // console.log("Previous zIndexs:", prevZIndexs);
                const newZIndexs = [...prevZIndexs];
                newZIndexs[index] = newZIndexs[index] + 10;
                return newZIndexs;
            });
        }
        const lowerZIndex = (index) => {
            setZIndexs((prevZIndexs) => {
                // console.log("Previous zIndexs:", prevZIndexs);
                const newZIndexs = [...prevZIndexs];
                newZIndexs[index] = newZIndexs[index] - 10;
                return newZIndexs;
            });
        }
        
        const mouseStateByIndex = (index) => {
            if(index === 1){
                setDisableMouseEvents1(!disableMouseEvents1);

            }else if(index === 2){
                setDisableMouseEvents2(!disableMouseEvents2);
            }
        }


        

   
    
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
    
      <div className="fixed grid grid-col max-w-screen place-items-center box-border h-full w-screen  bg-[#121212]">
        <SlideCards duration = {`${duration[0]}`}  bg="bg-[#2C2C2E]" zIndex={ `${zIndexs[0]}`}  height = 'h-7/10'  width = { `${widths[0]}px`} top = { `${topValues[0]}px` } pos='absolute' title="About Me" disableMouseEvents = {true} cardOpen = {openDrawers[0]} closing = {closing[0]} maxTop = {maxTops[0]} opacity = {opacities[0]} >
        
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

        <SlideCards  duration = {`${duration[1]}`} bg="bg-[#1E1E1E]" zIndex={ `${zIndexs[1]}`}  height='h-7/10' width={ `${widths[1]}px`} top ={ `${topValues[1]}px` } pos="absolute" title="Projects" disableMouseEvents = {true} maxTop = {maxTops[1]} cardOpen= {openDrawers[1]} closing={closing[1]} opacity= {opacities[1]}>
            
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
        <SlideCards  duration = {`${duration[2]}`} bg="bg-[#2C2C2E]" zIndex={ `${zIndexs[2]}`} title="Work And Education" width = { `${widths[2]}px`} top ={  `${topValues[2]}px` } pos="absolute" height="h-7/10" disableMouseEvents = {true} maxTop = {maxTops[2]} cardOpen = {openDrawers[2]} closing = {closing[2]} opacity= {opacities[2]}>
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
        <SlideCards  duration = {`${duration[3]}`} bg="bg-[#2C2C2E]" zIndex={ `${zIndexs[3]}`} title="Hobbies and More" width = { `${widths[3]}px`} top ={  `${topValues[3]}px` } pos="absolute" height="h-7/10" disableMouseEvents = {true} maxTop = {maxTops[3]} cardOpen = {openDrawers[3]} closing={closing[3]} opacity= {opacities[3]}>   
            
            <h3>More about my interest in Games, Art, and more!</h3>
        </SlideCards>

      </div>
     
    
  );
}
export default CardBox;