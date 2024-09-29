interface SectionPageProps {
  table: any;
}

import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";
import PaginationButton from "./buttonPageTable";

const PaginationControls = ({ table }: SectionPageProps) => {
  const totalPages = table.getPageCount();
  return (
    <div className="flex w-full  justify-end items-center gap-4 mt-4">
      <section className=" flex">
        <PaginationButton
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconArrowLeft />
          <IconArrowLeft />
        </PaginationButton>
        <PaginationButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconArrowLeft />
        </PaginationButton>
        {[1, 2, 3, 4, 5].map((page) => (
          <PaginationButton
            key={page}
            onClick={() => table.setPageIndex(page - 1)}
            isActive={table.getState().pagination.pageIndex === page - 1}
            disabled={page > totalPages}
          >
            {page}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <IconArrowRight />
        </PaginationButton>
        <PaginationButton
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <IconArrowRight />
          <IconArrowRight />
        </PaginationButton>
      </section>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="px-4 py-1  hover:bg-purple-300 border border-gray-300  outline-none rounded-sm text-sm "
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationControls;
