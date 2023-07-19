import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer/Footer";


const Main = () => {
  return (
    <>
     <Outlet/>
     <Footer/>
    
    </>
  )
};

export default Main;
