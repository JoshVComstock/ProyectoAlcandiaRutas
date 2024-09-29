import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonNav } from "./buttonNav";
import Perfil from "./perfil";
import { mainNavItems, NavItem, secondaryNavItems } from "./navItems";
import { IconLogout } from "../icons";
// import Button from "@/components/common/button";
import { ROUTES } from "@/types/enums/Routes";
import Logo from "@assets/LogoSistemas.png";
import { Button } from "../button";

interface Props {
  isExpanded?: boolean;
}

const Navbar = ({ isExpanded }: Props) => {
  const navigate = useNavigate();
  const [forma, setForma] = useState({
    caminar: false,
    auto: false,
    trufi: false,
    micro: false,
  });
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const redirect = (path: string) => {
    navigate(path);
  };
  const handleItemClick = useCallback((path: string) => {
    setExpandedItem((prev) => (prev === path ? null : path));
    if (path) {
      redirect(path);
    }
  }, []);

  const renderNavItems = (items: NavItem[]) =>
    items.map((item, i) => (
      <div key={i} className="w-full">
        <ButtonNav
          onClick={() => handleItemClick(item.path)}
          label={isExpanded ? item.label : ""}
          icon={item.icon}
        />
        {item.children && expandedItem === item.path && (
          <div
            className={`${
              isExpanded ? "" : "w-[80%] mx-auto"
            } py-2 bg-gray-200 w-full rounded-lg  `}
          >
            {item.children.map((child, i) => (
              <ButtonNav
                key={i}
                onClick={() => redirect(child.path)}
                label={isExpanded ? child.label : ""}
                icon={child.icon}
              />
            ))}
          </div>
        )}
      </div>
    ));

  return (
    <nav
      className={`${
        isExpanded ? "w-[350px] p-8" : "w-[80px] p-0 py-8"
      } bg-customWhite shadow-lg h-screen flex flex-col transition-all duration-300 justify-center items-center gap-4`}
    >
      <Perfil photo={Logo} description={`${isExpanded ? "" : ""}`} />
      <article className="w-full py-4 flex gap-2 flex-col">
        <Button
          label="Caminar"
          onClick={() => setForma({ ...forma, caminar: !forma.caminar })}
        />
        <Button
          label="Auto"
          onClick={() => setForma({ ...forma, auto: !forma.auto })}
        />
        <Button
          label="Trufi"
          onClick={() => setForma({ ...forma, trufi: !forma.trufi })}
        />
        <Button
          label="Micro"
          onClick={() => setForma({ ...forma, micro: !forma.micro })}
        />
      </article>
      <ButtonNav
        onClick={() => redirect(ROUTES.LOGIN)}
        label={isExpanded ? "Salir" : ""}
        icon={IconLogout}
        important
      />
    </nav>
  );
};

export default Navbar;
