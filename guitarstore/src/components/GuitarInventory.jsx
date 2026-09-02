import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { useEffect, useMemo, useState } from 'react';

const columns = [
    { header: 'Guitar Model', accessorKey: 'guitarModel' },
    { header: 'Body Type', accessorKey: 'bodyType' },
    { header: 'Brand Name', accessorKey: 'brandName' },
    { header: 'Stock', accessorKey: 'stockQuantity' },
    { header: 'Manufacturer', accessorKey: 'manufacturerName' },
    { header: 'Role', accessorKey: 'userRole' },
];

function GuitarInventory({ guitars, onSelectGuitar, selectedGuitar }) {
    const [category, setCategory] = useState('All');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const categories = ['All', 'Electric', 'Acoustic', 'Bass', 'Classical', 'Merchant', 'Consumer'];
    const filteredGuitars = useMemo(
        () => category === 'All'
            ? guitars
            : guitars.filter(
                (guitar) => guitar.bodyType === category || guitar.userRole === category,
            ),
        [category, guitars],
    );

    useEffect(() => {
        setPagination((current) => ({ ...current, pageIndex: 0 }));
    }, [category]);

    const table = useReactTable({
        data: filteredGuitars,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        state: {
            pagination,
        },
    });

    return (
        <div className="inventoryCard">
            <h2>Guitar Inventory</h2>

            <div className="inventoryContent">
                <nav className="categoryFilter" aria-label="Filter guitars by type or user role">
                    <span className="categoryLabel">Category</span>
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={category === item ? 'activeCategory' : ''}
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

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
                    {filteredGuitars.length === 0 && (
                        <p className="emptyInventory">No guitars in this category yet.</p>
                    )}
                </div>
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