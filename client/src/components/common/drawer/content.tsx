import { useState } from "react";
import Drawer from ".";
const Content = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="relative">
      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <h2 className="text-xl font-bold">titulo</h2>
        <p>Contenido</p>
      </Drawer>
    </div>
  );
};

export default Content;
