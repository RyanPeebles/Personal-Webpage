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
  const getCurrentCard = () => {
    if(cardboxRef.current) {
      return cardboxRef.current.currentCardRef;
    }
    return null;
  }

    
  return (
    <>
    <Navbar onCallNextBox = {handleCardBoxCall} onCallPrevBox={handleCardBoxCallPrev} currentCard = {getCurrentCard}/>
    <CardBox ref={cardboxRef}/>
    </>
  );
}
export default Homepage;