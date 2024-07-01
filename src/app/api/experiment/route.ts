import { NextResponse, NextRequest } from 'next/server'

import { Experiment, ExperimentCreate } from "@/app/experiments/data/schema"
import { updateExperimentDetailForItem, createExperimentDetailItem, getAllExperimentDetailItems, deleteExperimentDetailItem } from "@/data-access/experimentDetail"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'

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

export async function DELETE(request: Request) {
    const content: Experiment = await request.json();
    await deleteExperimentDetailItem(content.id)
    revalidatePath("/experiments")
    return NextResponse.json({ staus: 200, revalidated: true, now: Date.now() })
}