// import { useNavigate } from "react-router-dom";
import React, { ReactNode } from "react";
interface Props {
  title: string;
  children: ReactNode;
}
const ModuloPage: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-2 p-8 w-full">
      <head className="flex gap-2 items-center">
        <h3 className=" text-4xl font-bold">{title}</h3>
      </head>
      {children}
      <div className="flex-1 relative flex flex-col overflow-y-scroll overflow-x-auto px-5"></div>
    </div>
  );
};

export default ModuloPage;
