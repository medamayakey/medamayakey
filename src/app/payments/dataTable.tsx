'use client';
import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Croissant, X } from 'lucide-react';

import { addFridgeItems, deleteFridgeItems } from '@/db/firebase/firestore';

import Item from '@/types/item';

interface DataTableProps<Item, TValue> {
  columns: ColumnDef<Item, TValue>[];
  data: Item[];
}

export function DataTable<Item, TValue>({
  columns,
  data,
}: DataTableProps<Item, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // console.log('data', data);

  const getRandomNumber = () => {
    const min = 1;
    const max = 10;
    const decimal = 100;
    return Math.ceil((Math.random() * (max - min) + min) * decimal) / decimal;
  };

  const handleAddClick = async () => {
    const inputValue = table.getColumn('name')?.getFilterValue() as string;
    const newItem = {
      name: inputValue,
      quantity: 1,
      price: getRandomNumber(),
    };
    await addFridgeItems(newItem);
  };

  const handleDeleteClick = async (id: string) => {
    await deleteFridgeItems(id);
  };

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search item..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <Button size={'lg'} className="mb-4" onClick={handleAddClick}>
        <Croissant className="mr-2" />
        Add item
      </Button>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="flex justify-between"
                    id={cell.row.original.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    <button
                      onClick={() => handleDeleteClick(cell.row.original.id)}
                    >
                      <X />
                    </button>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-18 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
