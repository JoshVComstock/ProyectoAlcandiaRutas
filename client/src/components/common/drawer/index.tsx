import { IconClose, IconDrawer } from "@/components/ui/icons";
import React from "react";
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Drawer = ({ open, onClose, children }: DrawerProps) => {
  return (
    <div
      className={`fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg transform transition-transform  ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ zIndex: 1000 }}
    >
      <button
        onClick={onClose}
        className={`absolute top-2 -left-9 p-2 rounded-full text-white ${
          open ? "bg-primary" : "bg-secundary"
        }`}
      >
        {open ? <IconClose /> : <IconDrawer />}
      </button>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Drawer;

// {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
//     <React.Fragment key={anchor}>
//       <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//       <Drawer
//         anchor={anchor}
//         open={state[anchor]}
//         onClose={toggleDrawer(anchor, false)}
//       >
//         {list(anchor)}
//       </Drawer>
//     </React.Fragment>
//   ))}
