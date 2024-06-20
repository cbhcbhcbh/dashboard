import { NextResponse, NextRequest } from 'next/server'

import { Experiment, ExperimentCreate } from "@/app/experiments/data/schema"
import { updateExperimentDetailForItem, createExperimentDetailItem, getAllExperimentDetailItems } from "@/data-access/experimentDetail"

export async function POST(request: Request) {
    const content: Experiment = await request.json();
    if (content.id) {
        await updateExperimentDetailForItem(content as Experiment)
    } else[
        await createExperimentDetailItem(content as ExperimentCreate)
    ]

    return NextResponse.json({ staus: 200, revalidated: true, now: Date.now() })
}

export async function GET(request: Request) {
    const experimentDetailItems = await getAllExperimentDetailItems()
    return NextResponse.json({ staus: 200, revalidated: true, now: Date.now(), data: { "experimentDetailData": experimentDetailItems } })
}