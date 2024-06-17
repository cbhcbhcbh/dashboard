import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns, Experiment } from "./_components/columns"
import { DataTable } from "./_components/data-table"

async function getData(): Promise<Experiment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            platform: "JD-selfrun",
            type: "New",
            qualified: "Yes",
            status: "Finalized",
            experiment_id: 1,
            owner: "Lucie Lu",
            name: "1",
            start: "1",
            end: "1",
            phrase: "1"
        },
        {
            id: "728ed32f",
            platform: "JD-selfrun",
            type: "Carry-over",
            qualified: "Possible",
            status: "Rollout",
            experiment_id: 2,
            owner: "Lucie Lu",
            name: "2",
            start: "2",
            end: "2",
            phrase: "2"
        },
        {
            id: "7283d32f",
            platform: "JD-selfrun",
            type: "Carry-over",
            qualified: "Possible",
            status: "Rollout",
            experiment_id: 3,
            owner: "Lucie Lu",
            name: "2",
            start: "1",
            end: "3",
            phrase: "2"
        },
        // ...
    ]
}

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
}



export default async function TaskPage() {
    const tasks = await getData()

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">

                    <h2 className="text-2xl font-bold tracking-tight">Marketplaces Experiments</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of Marketplaces experiments!
                    </p>

                </div>
                <DataTable data={tasks} columns={columns} />
            </div>
        </>
    )
}