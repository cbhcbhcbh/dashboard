import { Experiment, columns } from "./_components/columns"
import { DataTable } from "./_components/DataTable"

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
