import * as z from 'zod';

import prisma from '@/db';
import { optionSchema } from '@/app/manualReporting/data/schema';

export async function getBusinessModule(generalAgentSchema: z.infer<typeof optionSchema>[]) {
    const records = await prisma.generalAgentHQMappingTable.findMany({
        where: {
            generalAgent: {
                in: generalAgentSchema.map((ga) => ga.value)
            }
        },
        distinct: ['businessModule'],
        select: {
            businessModule: true
        }
    })

    const result = records.map((record) =>
    ({
        label: record.businessModule,
        value: record.businessModule
    })
    );

    return result
}

export async function getHQ(businessModuleSchema: z.infer<typeof optionSchema>[]) {
    const records = await prisma.generalAgentHQMappingTable.findMany({
        where: {
            businessModule: {
                in: businessModuleSchema.map((bm) => bm.value)
            }
        },
        distinct: ['hqName'],
        select: {
            hqName: true
        }
    })

    const result = records.map((record) =>
    ({
        label: record.hqName,
        value: record.hqName
    })
    );

    return result
}