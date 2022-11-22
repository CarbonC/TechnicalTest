import * as React from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TablePagination,
    Stack,
    Chip,
} from "@mui/material";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    SortingState,
    ColumnFiltersState,
    useReactTable,
} from '@tanstack/react-table'
import Filter from "./Filter";
import { fetchData } from "../../lib/api";
import { MetalBand } from "../../types";

const columns: ColumnDef<MetalBand>[] = [
    {
        accessorKey: 'band_name',
        header: 'Band name',
        enableColumnFilter: false
    },
    {
        accessorKey: 'fans',
        header: 'Fans',
        enableColumnFilter: false
    },
    {
        accessorKey: 'formed',
        header: 'Formed at',
        enableColumnFilter: false
    },
    {
        accessorKey: 'origin',
        header: 'Origin',
        enableSorting: false
    },
    {
        accessorKey: 'split',
        header: 'Split',
        enableSorting: false,
        enableColumnFilter: false
    },
    {
        accessorKey: 'style',
        header: 'Music style',
        enableSorting: false,
        cell: (cell) =>
        (
            <Stack direction="row" spacing={1}>
                {String(cell.getValue()).split(',').map(style => <Chip label={style} />)}
            </Stack>
        )
    },
];


function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'band_name', desc: false }]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [data, setData] = React.useState<MetalBand[]>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    React.useEffect(() => {
        fetchData(1000).then((fetchedData: MetalBand[]) => {
            console.log(data.length, table.getRowModel().rows.length);

            setData(fetchedData);
        });
    }, []);

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        table.setPageSize(parseInt(event.target.value, 10));
        table.setPageIndex(0);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        table.setPageIndex(newPage)
    };

    return (
        <TableContainer sx={{ maxWidth: 1200 }}>
            <Table aria-labelledby="metalBands_data">
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header =>
                            ((
                                <TableCell key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </TableCell>
                            )))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table
                        .getRowModel()
                        .rows
                        .map(row => ((
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell =>
                                ((
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                )))}
                            </TableRow>
                        )))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={table.getTotalSize()}
                page={table.getState().pagination.pageIndex}
                onPageChange={handleChangePage}
                rowsPerPage={table.getState().pagination.pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default DataTable;