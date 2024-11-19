import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/navbar/navbar";
import { useUser } from "@/hook/useUser";
import NavAdmin from "@/components/ui/navbar/navAdmin";

const Layout = () => {
  const { user } = useUser();

  return (
    <section className="flex w-full flex-row h-full bg-customWhite">
      {user?.role === "admin" ? <NavAdmin /> : <Navbar />}
      <main className="flex h-full animate-[appear_1s]">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
