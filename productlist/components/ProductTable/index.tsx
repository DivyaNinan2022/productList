/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"; // Required in Next.js App Router

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { ProductList } from "@/app/productList/page";

export default function ProductTable({ list }: { list: ProductList[] }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Define table columns
  const columns = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "image",
      header: "Image",
      cell: (info: { getValue: () => string | undefined }) => (
        <img src={info.getValue()} alt="Product" width={50} />
      ),
    },
    { accessorKey: "title", header: "Product Name" },
    { accessorKey: "brand", header: "Brand" },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info: { getValue: () => any }) => `$${info.getValue()}`,
    },
  ];

  // Slice the data manually based on pagination
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return list?.slice(start, start + pageSize);
  }, [list, pageIndex, pageSize]);

  // Table setup
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    initialState: {
      pagination: { pageIndex, pageSize },
    },
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };

  console.log("table.getHeaderGroups()", table.getHeaderGroups());
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup?.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div
        style={{ display: "flex", justifyContent: "center", padding: "10px" }}
      >
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={list.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </TableContainer>
  );
}
