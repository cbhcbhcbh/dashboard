"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const router = useRouter()


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent align="end" className="w-[160px]">

                <DropdownMenuItem asChild>
                    <Link href={`experiments/${experiment.id}`}>
                        Edit
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(String(experiment.experimentID))}
                >
                    Make a copy
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                    await fetch(`/api/experiment`, {
                        method: "Delete",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({ id: experiment.id })
                    });
                    router.refresh();
                }}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent> */}
        </DropdownMenu >
    )
}
