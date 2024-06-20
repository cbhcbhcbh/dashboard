import prisma from '@/db';
import { Experiment, ExperimentCreate } from "@/app/experiments/data/schema"

export async function getExperimentDetailForItem(id: string) {
    const experimentItem = await prisma.experimentDetail.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            platform: true,
            type: true,
            qualified: true,
            status: true,
            experimentID: true,
            owner: true,
            name: true,
            start: true,
            end: true,
            phrase: true,
        }
    });

    return experimentItem;
}

export async function updateExperimentDetailForItem(data: Experiment) {
    const experimentItem = await prisma.experimentDetail.update({
        where: {
            id: data.id,
        },
        data: {
            platform: data.platform,
            type: data.type,
            qualified: data.qualified,
            status: data.status,
            experimentID: data.experimentID,
            owner: data.owner,
            name: data.name,
            start: data.start,
            end: data.end,
            phrase: data.phrase,
        }
    });

    return experimentItem;
}

export async function createExperimentDetailItem(experimentDetailItem: ExperimentCreate) {
    const experimentItem = await prisma.experimentDetail.create({
        data: {
            platform: experimentDetailItem.platform!,
            type: experimentDetailItem.type!,
            qualified: experimentDetailItem.qualified!,
            status: experimentDetailItem.status!,
            experimentID: experimentDetailItem.experimentID!,
            owner: experimentDetailItem.owner!,
            name: experimentDetailItem.name!,
            start: experimentDetailItem.start!,
            end: experimentDetailItem.end!,
            phrase: experimentDetailItem.phrase!,
        },
    });

    return experimentItem;
}

export async function getAllExperimentDetailItems() {
    const experimentDetail = await prisma.experimentDetail.findMany();
    return experimentDetail;
}

export async function deleteExperimentDetailItem(id: string) {
    const deleteUsers = await prisma.experimentDetail.delete({
        where: {
            id: id
        }
    })
    return deleteUsers;
}