import Footer from "@/layouts/Footer";
import { Outlet } from "react-router-dom";


const Main = () => {
  return (
    <>
      <Outlet />
      <Footer />

    </>
  )
};

export default Main;
