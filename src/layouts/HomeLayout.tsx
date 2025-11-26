import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-[#0f0f0f] text-white">
      <Navbar />
      <main className="flex-1 mt-16 p-4 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;