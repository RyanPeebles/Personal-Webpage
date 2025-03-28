import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
const mainLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
  );
}
export default mainLayout;