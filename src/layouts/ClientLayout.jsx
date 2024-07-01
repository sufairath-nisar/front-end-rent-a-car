import { Outlet } from "react-router-dom";
import ClientNavbar from "../components/navbar/clientNavbar";
import Footer from "../components/footer/Footer";

const ClientLayout = () => {
  return (
    <>
      <nav>
        <ClientNavbar />
      </nav>

      <Outlet />

      <footer>
       <Footer />
      </footer>
    </>
  );
};

export default ClientLayout;