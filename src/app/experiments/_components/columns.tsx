"use client"

import { Ellipsis, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Url } from "next/dist/shared/lib/router/router"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"

export type Experiment = {
    id: string
    platform: string // 
    type: "Carry-over" | "New" //  Quota Type 
    qualified: "Yes" | "Possible" // Qualified
    status: "Finalized" | "Rollout" | "Temporarily Hold" | "Completed" | "Ongoing" | "Submitted"
    experiment_id: number
    owner: "Lucie Lu" | "Kerry Yang" | "Greg Gao"
    name: string
    start: string
    end: string
    phrase: Url
}

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
        accessorKey: "experiment_id",
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
        cell: ({ row }) => {
            const experiment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Ellipsis className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(experiment.id)}
                        >
                            Copy experiment ID
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View experiment details</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]