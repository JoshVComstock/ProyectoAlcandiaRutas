import React, { useState } from "react";
import Form from "@/components/ui/form";

const ProductosForm = () => {
  const [formProduct, setFormProduct] = useState({
    nombre: "",
    photo: "",
    price: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitProduct = () => {
    console.log("Form submitted with data:", formProduct);
  };

  const inputs = [
    {
      label: "Nombre",
      type: "text",
      placeholder: "Escribe el nombre",
      value: formProduct.nombre,
      required: true,
      name: "nombre",
    },
    {
      label: "Precio",
      type: "number",
      placeholder: "Ponga el precio",
      value: formProduct.price,
      required: true,
      name: "price",
    },
  ];

  return (
    <div>
      <Form
        title="Productos"
        action="Submit"
        onClick={handleSubmitProduct}
        onChange={handleInputChange}
        inputs={inputs}
      />
    </div>
  );
};

export default ProductosForm;
