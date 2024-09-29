import React from "react";

interface PerfilProps {
  name?: string;
  photo?: string;
  description?: string;
}

const Perfil: React.FC<PerfilProps> = ({ name, photo, description }) => {
  return (
    <section
      className={`${
        description ? "" : "flex-col justify-center"
      } w-full flex gap-2  items-center `}
    >
      {photo ? (
        <img src={photo} alt={name} className=" h-12 rounded-lg" />
      ) : (
        <div className="bg-primary w-12 h-12 rounded-lg"></div>
      )}
      <div>
        <h2 className="font-bold">{name}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </section>
  );
};

export default Perfil;
