import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/navbar/navbar";
import { useState } from "react";
import { IconHidenSideBar, IconLowSideBar } from "@/components/ui/icons";
import Content from "@/components/common/drawer/content";
const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className="flex w-full bg-customWhite h-full">
      <Navbar isExpanded={isExpanded} />
      <main className="flex flex-col animate-[appear_1s]  w-full justify-start ">
        <nav className="bg-white h-8 shadow-md flex  items-center p-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-2xl text-gray-600"
          >
            {!isExpanded ? <IconHidenSideBar /> : <IconLowSideBar />}{" "}
          </button>
          <Content />
        </nav>
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
