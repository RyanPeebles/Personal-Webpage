import CardBox from "../components/CardBox";
import Navbar from "../components/Navbar";
import{ useRef } from "react";



const Homepage = () => { 

  const cardboxRef = useRef(null);

  const handleCardBoxCall = () => {

    if(cardboxRef.current) {
      cardboxRef.current.callScrollDown();
    }
  };

  const handleCardBoxCallPrev = () => {
    if(cardboxRef.current) {
      cardboxRef.current.callScrollUp();
    }
  };

    
  return (
    <>
    <Navbar onCallNextBox = {handleCardBoxCall} onCallPrevBox={handleCardBoxCallPrev}/>
    <CardBox ref={cardboxRef}/>
    </>
  );
}
export default Homepage;