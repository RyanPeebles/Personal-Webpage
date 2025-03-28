import { Container } from "postcss";
import { Link } from "react-router-dom";

const FlashCard = ({ Title ="project",Description ="Description", link ="linkTo"}) => {

    return (
        <>
        <div className="w-lg border-solid border-black border-2 rounded-lg bg-white shadow-md grid justify-items-stretch p-4 m-2">


            <h2>{Title}</h2>
            <p>project description Here</p>
            <Link
             to={link}
              className="justify-self-end inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
                View Project GitHub
            </Link>
        </div>
        </>
    );
}
export default FlashCard;