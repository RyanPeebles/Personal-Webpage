import CardBox from "../components/CardBox";
import Navbar from "../components/Navbar";
import{ useRef, useState } from "react";



const Homepage = () => { 

  const [currentCard, setCurrentCard] = useState(null);
  const cardboxRef = useRef(null);
  const navBarRef = useRef(null);

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
  const passCurrentCard = (card) => {
    console.log("passing current card: ", card);
    navBarRef.current.recieveCurrentCard(card);
  }
  const passPrevCard = (card) => {
    console.log("passing previous card: ", card);
    navBarRef.current.recievePrevCard(card);
  }
  const passNextCard = (card) => {
    console.log("passing next card: ", card);
    navBarRef.current.recieveNextCard(card);
  }

    
  return (
    <>
    <Navbar ref ={navBarRef} onCallNextBox = {handleCardBoxCall} onCallPrevBox={handleCardBoxCallPrev}/>
    <CardBox ref={cardboxRef} passCurrentCard= {passCurrentCard} passPrevCard = {passPrevCard} passNextCard={passNextCard}/>
    </>
  );
}
export default Homepage;