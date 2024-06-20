"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Experiment } from "../data/schema"

export const columns: ColumnDef<Experiment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "platform",
        header: "Platform",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "qualified",
        header: "Qualified",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "experimentID",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Experiment ID" />
        )
    },
    {
        accessorKey: "owner",
        header: "Owner",
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("name")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "start",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start" />
        ),
    },
    {
        accessorKey: "end",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End" />
        ),
    },
    {
        accessorKey: "phrase",
        header: "Phrase",
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />
    },
]