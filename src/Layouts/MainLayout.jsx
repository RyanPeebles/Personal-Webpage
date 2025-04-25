import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
const mainLayout = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Outlet />
    </>
  );
}
export default mainLayout;