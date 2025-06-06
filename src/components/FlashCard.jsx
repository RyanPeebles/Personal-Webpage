import { Container } from "postcss";
import { Link } from "react-router-dom";

const FlashCard = ({ Title ="project",Description ="Description", link ="linkTo"}) => {

    return (
        <>
        <div className="bg-background text-on-background w-lg border-solid border-primary border-2 rounded-lg  shadow-md grid justify-items-stretch p-4 m-2">


        <h2 className="text-xl font-bold mb-2">{Title}</h2>
            
            {/* Description section with fixed height and overflow */}
            <div className="overflow-auto mb-4">
                <p>{Description}</p>
            </div>
            
            {/* Button section - always at bottom */}
            <div className="mt-auto flex justify-end">
                <Link
                    to={link}
                    className="inline-block bg-primary text-on-primary rounded-lg border-1  border-primary px-1 py-2 hover:bg-secondary hover:text-on-secondary hover:border-primary  w-60 text-center"
                >
                    View Project on GitHub
                </Link>
            </div>
        </div>
        </>
    );
}
export default FlashCard;