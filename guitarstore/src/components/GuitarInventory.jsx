import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { useState } from 'react';

function GuitarInventory({ guitars, onSelectGuitar, selectedGuitar }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const columns = [
        { header: 'Guitar Model', accessorKey: 'guitarModel' },
        { header: 'Body Type', accessorKey: 'bodyType' },
        { header: 'Brand Name', accessorKey: 'brandName' },
        { header: 'Stock', accessorKey: 'stockQuantity' },
        { header: 'Manufacturer', accessorKey: 'manufacturerName' },
        { header: 'Role', accessorKey: 'userRole' },
    ];

    const table = useReactTable({
        data: guitars,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    return (
        <div className="inventoryCard">
            <h2>Guitar Inventory</h2>

            <div className="inventoryTableWrap">
                <table className="inventoryTable">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            const isSelected =
                                selectedGuitar &&
                                selectedGuitar.id === row.original.id;

                            return (
                                <tr
                                    key={row.id}
                                    className={isSelected ? 'selectedRow' : ''}
                                    onClick={() => onSelectGuitar(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="tableActions">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default GuitarInventory;