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

export default async function Experiments() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
