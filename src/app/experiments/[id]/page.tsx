import { ExperimentForm } from "./experiment-form";
import { getExperimentDetailForItem } from "@/data-access/experimentDetail"

export default async function Page({ params }: { params: { id: string } }) {
    const experimentDetail = await getExperimentDetailForItem(params.id)

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Experiment</h3>
                <p className="text-sm text-muted-foreground">
                    You need to edit this Experiment details.
                </p>
            </div>
            <ExperimentForm data={experimentDetail} />
        </div>
    )
}