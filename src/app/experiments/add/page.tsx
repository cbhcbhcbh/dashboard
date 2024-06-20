import { ExperimentForm } from "./experiment-form";

export default async function Page() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Experiment</h3>
                <p className="text-sm text-muted-foreground">
                    You need to add a new Experiment details.
                </p>
            </div>
            <ExperimentForm />
        </div>
    )
}