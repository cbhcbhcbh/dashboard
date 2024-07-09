"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { stDataReturnData } from "../data/schema"

export const columns: ColumnDef<stDataReturnData>[] = [
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
        accessorKey: "subClass",
        header: "Product",
    },
    {
        accessorKey: "distribution",
        header: "本周分货",
    },
    {
        accessorKey: "actualEOH",
        header: "实际EOH",
    },
    {
        accessorKey: "fy23Q4STQTD",
        header: "FY23 Q4 ST QTD",
    },
    {
        accessorKey: "q1STQTD",
        header: "Q1 ST QTD",
    },
    {
        accessorKey: "q2STQTD",
        header: "Q2 ST QTD",
    },
    {
        accessorKey: "q3STQTD",
        header: "Q3 ST QTD",
    },
    {
        accessorKey: "q4STQTD",
        header: "Q4 ST QTD",
    },
    {
        accessorKey: "st5WeekAve",
        header: "ST 5Wk Ave",
    },

    {
        accessorKey: "stQ3WK9",
        header: "前5周",
    },
    {
        accessorKey: "stQ3WK10",
        header: "前4周",
    },
    {
        accessorKey: "stQ3WK11",
        header: "最近前3周",
    },
    {
        accessorKey: "stQ3WK12",
        header: "最近前2周",
    },
    {
        accessorKey: "stQ3WK13",
        header: "最近前1周",
    },

    {
        accessorKey: "wklyST",
        header: "Wkly ST 变化 ",
    },
    {
        accessorKey: "lastWeekVsAve",
        header: "Last week Vs Ave",
    },
]