import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/navbar/navbar";

const Layout = () => {
  return (
    <section className="flex w-full h-full bg-customWhite">
      <Navbar />
      <main className="flex flex-col w-full z-10 animate-[appear_1s]">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
