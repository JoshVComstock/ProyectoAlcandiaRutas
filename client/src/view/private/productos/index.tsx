import React, { useState } from "react";
import PageContainer from "@/components/common/moduloPage";
import { ColumnDef } from "@tanstack/react-table";
import TableContainer from "@/components/common/table/tableContainer";

// region Columna
const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    footer: "Mi nombre",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

const data = [
  { id: 1, firstName: "John", lastName: "Doe", age: 28 },
  { id: 2, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 3, firstName: "John", lastName: "Doe", age: 28 },
  { id: 4, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 5, firstName: "John", lastName: "Doe", age: 28 },
  { id: 6, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 7, firstName: "John", lastName: "Doe", age: 28 },
  { id: 8, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 9, firstName: "John", lastName: "Doe", age: 28 },
  { id: 10, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 11, firstName: "John", lastName: "Doe", age: 28 },
  { id: 12, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 13, firstName: "John", lastName: "Doe", age: 28 },
  { id: 14, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 15, firstName: "John", lastName: "Doe", age: 28 },
  { id: 16, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 17, firstName: "John", lastName: "Doe", age: 28 },
  { id: 18, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 19, firstName: "John", lastName: "Doe", age: 28 },
  { id: 20, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 21, firstName: "John", lastName: "Doe", age: 28 },
  { id: 22, firstName: "Jane", lastName: "Smith", age: 32 },
];

const Productos = () => {
  return (
    <PageContainer title="Productos">
      <TableContainer columns={columns} data={data} />
    </PageContainer>
  );
};

export default Productos;
