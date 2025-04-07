
import { NavLink } from "react-router-dom";
const Navbar = () => { 
    const LinkClass = ({isActive}) => isActive ? 
    'text-white  bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':
    'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';
      
    return ( 
        <nav className=" fixed bg-orange-500 border0-b-2 border-orange-600 w-full text-white h-1/10 z-50">
            <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex  h-20 items-center justify-between">
                        <div className='flex flex-1 items-center
                    justify-center md:items-stretch
                    md:justify-start'>
                   
                        <div className='md:ml-auto'>
                        <div className='flex space-x-2'>
                            <NavLink 
                            to="/"
                            className= {LinkClass}>
                                About Me
                            </NavLink>
                            <NavLink
                                to="/jobs"
                                className= {LinkClass}

                                >Projects
                            </NavLink>
                            <NavLink
                                to="add-job"
                                className= {LinkClass}
                                >Card3
                            </NavLink>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
     );
}
export default Navbar;