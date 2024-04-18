'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
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

import {
  addFridgeItems,
  deleteFridgeItems,
} from '@/actions/db/firebase/firestore';

import Item from '@/types/item';

const CSV_URL =
  'https://spoonacular.com/application/frontend/downloads/top-1k-ingredients.csv';

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

  // fetch CSV data from spoonacular Ingredients API
  const [inputData, setInputData] = useState([]);
  // search item state
  const [searchItem, setSearchItem] = useState('');
  // filtered data state
  const [filteredData, setFilteredData] = useState([]);

  // const [selectedItem, setSelectedItem] = useState('');

  interface ConvertedData {
    id: string;
    name: string;
  }

  const convertCSVData = (data: Array<Array<string>>): Array<ConvertedData> => {
    return data.map((row) => ({
      id: row[1],
      name: row[0],
    }));
  };
  // fetch CSV data from spoonacular Ingredients API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV_URL);
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, {
          header: false,
        });
        setInputData(parsedData.data as never[]);
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = (inputData as never[]).filter((item) =>
      (item[0] as string).toLowerCase().includes(searchItem)
    );
    setFilteredData(filteredData);
  }, [inputData, searchItem]);

  const handleChange = (event: any) => {
    table.getColumn('name')?.setFilterValue(event.target.value);
    setSearchItem(event.target.value);
  };

  return (
    <>
      <div className="py-4">
        <Input
          placeholder="Search item..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={handleChange}
          list="ingredients"
          type="text"
        />
        <datalist id="ingredients">
          {filteredData.map((item, index) => (
            <option key={index} value={item[0]} />
          ))}
        </datalist>
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
