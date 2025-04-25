import { Container } from "postcss";
import { Link } from "react-router-dom";

const FlashCard = ({ Title ="project",Description ="Description", link ="linkTo"}) => {

    return (
        <>
        <div className="bg-[#121212] w-lg border-solid border-[#1E1E1E] border-2 rounded-lg  shadow-md grid justify-items-stretch p-4 m-2">


            <h2>{Title}</h2>
            <p>{Description}</p>
            <Link
             to={link}
              className="justify-self-end inline-block bg-[#00FFD1] text-[#121212] rounded-lg px-4 py-2 hover:bg-[#FF4F81]  max-h-40"
            >
                View Project GitHub
            </Link>
        </div>
        </>
    );
}
export default FlashCard;