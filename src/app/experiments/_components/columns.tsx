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
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
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
    },
    {
        accessorKey: "experiment_id",
        header: "Experiment ID",
    },
    {
        accessorKey: "owner",
        header: "Owner",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "start",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Start
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "end",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    End
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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