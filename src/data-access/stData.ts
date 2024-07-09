import { StDataItem, optionSchema } from '@/app/manualReporting/data/schema';
import prisma from '@/db';
import { formSchema, stDataReturnData } from "@/app/manualReporting/data/schema";
import { z } from 'zod';

export async function createOrUpdateStDataItem(stDataItem: StDataItem) {
    const record = await prisma.fy24STData.findFirst({
        where: {
            generalAgent: stDataItem.generalAgent,
            businessModule: stDataItem.businessModule,
            hqID: stDataItem.hqID,
            className: stDataItem.className,
            subClass: stDataItem.subClass,
            mpn: stDataItem.mpn,
        }
    })
    if (!record) {
        await prisma.fy24STData.create({
            data: stDataItem
        })
    } else {
        await prisma.fy24STData.update({
            where: {
                id: record.id
            },
            data: stDataItem
        })
    }
}

export async function getAllStDataItems(stParams: formSchema) {
    const stDataItems = await prisma.fy24STData.groupBy({
        // by: ['generalAgent', 'businessModule', 'hqName', 'className', 'subClass'],
        by: ['subClass'],
        where: {
            generalAgent: { in: stParams.generalAgent.map((ga) => ga.value) },
            businessModule: { in: stParams.businessModule.map((bm) => bm.value) },
            hqName: { in: stParams.hq.map((h) => h.value) },
            className: { in: stParams.className.map((cn) => cn.value) },
            subClass: { in: stParams.subLob.map((cn) => cn.value) },
        },
        _sum: {
            distribution: true,
            actualEOH: true,
            fy23Q4STQTD: true,
            q1STQTD: true,
            q2STQTD: true,
            q3STQTD: true,
            q4STQTD: true,
            st5WeekAve: true,

            // TODO: fix this
            stQ3WK9: true,
            stQ3WK10: true,
            stQ3WK11: true,
            stQ3WK12: true,
            stQ3WK13: true,
        },
    })

    const stDataReturnList: stDataReturnData[] = stDataItems.map((stDataItem) => {
        const stDataReturnItem: stDataReturnData = {
            // generalAgent: stDataItem.generalAgent,
            // businessModule: stDataItem.businessModule,
            // hqName: stDataItem.hqName,
            // className: stDataItem.className,
            subClass: stDataItem.subClass,

            distribution: stDataItem._sum.distribution!,
            actualEOH: stDataItem._sum.actualEOH!,
            fy23Q4STQTD: stDataItem._sum.fy23Q4STQTD!,
            q1STQTD: stDataItem._sum.q1STQTD!,
            q2STQTD: stDataItem._sum.q2STQTD!,
            q3STQTD: stDataItem._sum.q3STQTD!,
            q4STQTD: stDataItem._sum.q4STQTD!,
            st5WeekAve: Math.round(stDataItem._sum.st5WeekAve!),

            stQ3WK9: stDataItem._sum.stQ3WK9!,
            stQ3WK10: stDataItem._sum.stQ3WK10!,
            stQ3WK11: stDataItem._sum.stQ3WK11!,
            stQ3WK12: stDataItem._sum.stQ3WK12!,
            stQ3WK13: stDataItem._sum.stQ3WK13!,

            wklyST: stDataItem._sum.stQ3WK12! !== 0 ? ((stDataItem._sum.stQ3WK13! - stDataItem._sum.stQ3WK12!) / (stDataItem._sum.stQ3WK12!) * 100).toFixed(2) + "%" : "0",
            lastWeekVsAve: stDataItem._sum.st5WeekAve! !== 0 ? ((stDataItem._sum.stQ3WK13! - stDataItem._sum.st5WeekAve!) / (stDataItem._sum.st5WeekAve!) * 100).toFixed(2) + "%" : "0",
        }

        return stDataReturnItem
    })
    return stDataReturnList
}

export async function getSubLob(classNameSchema: z.infer<typeof optionSchema>[]) {
    const records = await prisma.fy24STData.findMany({
        where: {
            className: {
                in: classNameSchema.map((cn) => cn.value)
            }
        },
        distinct: ['subClass'],
        select: {
            subClass: true
        }
    })

    const result = records.map((record) =>
    ({
        label: record.subClass,
        value: record.subClass
    })
    );

    return result
}