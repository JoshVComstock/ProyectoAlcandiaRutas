import { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { IconGear, IconSearch } from "@/components/ui/icons";
import PaginationControls from "./sectionPagination";
// import buttonArrow from "./buttonarrow";

interface Props {
  columns: ColumnDef<any, any>[];
  data: any;
}

const TableContainer = ({ columns, data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w-full">
      <div className="my-4 flex items-center gap-2 text-sm relative">
        <div className="absolute left-2 text-gray-500 ">
          <IconSearch />
        </div>
        <input
          type="text"
          className="block outline-gray-400 w-64 px-8 border border-gray-400 rounded-md py-1"
          placeholder="Buscar..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        <section className="w-8 h-8 bg-primary100 grid place-content-center rounded-sm">
          <IconGear />
        </section>
      </div>
      <table className="w-full text-sm p-2 over border ">
        <thead className="text-xs text-gray-700 uppercase bg-secundary100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-2 cursor-pointer hover:bg-slate-300"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "⬆", desc: "⬇" }[
                          //@ts-ignore
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-gray-50 even:bg-gray-200 border-b border-gray-400 hover:bg-secundary100 "
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-2 text-gray-900 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <PaginationControls table={table} />
    </div>
  );
};

export default TableContainer;
