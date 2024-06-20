'use client'

import { useRouter } from 'next/navigation'

import { Experiment } from "./data/schema"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { Button } from "@/components/ui/button"

import { Upload, Download } from "lucide-react"
import { useEffect, useState } from 'react'

function getData(): Experiment[] {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            platform: "JD-selfrun",
            type: "New",
            qualified: "Yes",
            status: "Finalized",
            experimentID: "1",
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
            experimentID: "2",
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
            experimentID: "3",
            owner: "Lucie Lu",
            name: "2",
            start: "1",
            end: "3",
            phrase: "2"
        },
        // ...
    ]
}

export default function Experiments() {
    const router = useRouter()
    const data = getData()

    const [experimentDetailItems, setExperimentDetailItems] = useState<Experiment[]>([])

    useEffect(() => {
        const fetchExperimentDetails = async () => {
            try {
                const experimentDetailList = await fetch('/api/experiment', {
                    method: "GET"
                }).then(response => response.json())
                setExperimentDetailItems(experimentDetailList.data.experimentDetailData)
            } catch (error) {
                console.error('Error fetching experiment details:', error);
            }
        };

        fetchExperimentDetails();
    }, [])

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Experiments Detail</h2>
                <p className="text-muted-foreground">
                    Here&apos;s a list of our experiments !
                </p>
            </div>
            <div className="flex items-center gap-6">
                <div >
                    <Button variant="ghost">
                        <Upload className="mr-2 h-4 w-4" /> Upload
                    </Button>

                    <Button variant="ghost">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
                <div className="ml-auto">
                    <Button onClick={() => router.push('/experiments/add')}>
                        Add
                    </Button>
                </div>
            </div>
            {/* <DataTable data={data} columns={columns} /> */}
            <DataTable data={experimentDetailItems} columns={columns} />
        </div>
    )
}
