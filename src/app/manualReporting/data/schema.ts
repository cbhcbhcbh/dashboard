import { z } from "zod"

export const stDataSchemaItem = z.object({
    generalAgent: z.string(),
    hqID: z.number(),
    hqName: z.string(),
    className: z.string(),
    subClass: z.string(),
    mpn: z.string(),
    marketingPartName: z.string(),
    businessModule: z.string(),
    initialEOH: z.number(),
    distribution: z.number(),
    endEOH: z.number(),
    actualEOH: z.number(),
    ltd: z.number(),
    fy23Q4STQTD: z.number(),
    q1STQTD: z.number(),
    q2STQTD: z.number(),
    q3STQTD: z.number(),
    q4STQTD: z.number(),
    st5WeekAve: z.number(),
    woi: z.number(),

    fy23stQ4WK13: z.number(),
    stQ1WK1: z.number(),
    stQ1WK2: z.number(),
    stQ1WK3: z.number(),
    stQ1WK4: z.number(),
    stQ1WK5: z.number(),
    stQ1WK6: z.number(),
    stQ1WK7: z.number(),
    stQ1WK8: z.number(),
    stQ1WK9: z.number(),
    stQ1WK10: z.number(),
    stQ1WK11: z.number(),
    stQ1WK12: z.number(),
    stQ1WK13: z.number(),

    stQ2WK1: z.number(),
    stQ2WK2: z.number(),
    stQ2WK3: z.number(),
    stQ2WK4: z.number(),
    stQ2WK5: z.number(),
    stQ2WK6: z.number(),
    stQ2WK7: z.number(),
    stQ2WK8: z.number(),
    stQ2WK9: z.number(),
    stQ2WK10: z.number(),
    stQ2WK11: z.number(),
    stQ2WK12: z.number(),
    stQ2WK13: z.number(),

    stQ3WK1: z.number(),
    stQ3WK2: z.number(),
    stQ3WK3: z.number(),
    stQ3WK4: z.number(),
    stQ3WK5: z.number(),
    stQ3WK6: z.number(),
    stQ3WK7: z.number(),
    stQ3WK8: z.number(),
    stQ3WK9: z.number(),
    stQ3WK10: z.number(),
    stQ3WK11: z.number(),
    stQ3WK12: z.number(),
    stQ3WK13: z.number(),

    stQ4WK1: z.number(),
    stQ4WK2: z.number(),
    stQ4WK3: z.number(),
    stQ4WK4: z.number(),
    stQ4WK5: z.number(),
    stQ4WK6: z.number(),
    stQ4WK7: z.number(),
    stQ4WK8: z.number(),
    stQ4WK9: z.number(),
    stQ4WK10: z.number(),
    stQ4WK11: z.number(),
    stQ4WK12: z.number(),
    stQ4WK13: z.number(),

    current: z.string(),
})

export type StDataItem = z.infer<typeof stDataSchemaItem>


export const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});


export const FormSchema = z.object({
    generalAgent: z.array(optionSchema).min(1),
    businessModule: z.array(optionSchema).min(1),
    hq: z.array(optionSchema).min(1),
    className: z.array(optionSchema).min(1),
    subLob: z.array(optionSchema).min(1),
});


export type formSchema = z.infer<typeof FormSchema>

export const StDataReturnData = z.object({
    // generalAgent: z.string(),
    // businessModule: z.string(),
    // hqName: z.string(),
    // className: z.string(),
    subClass: z.string(),

    distribution: z.number(),
    actualEOH: z.number(),
    fy23Q4STQTD: z.number(),
    q1STQTD: z.number(),
    q2STQTD: z.number(),
    q3STQTD: z.number(),
    q4STQTD: z.number(),
    st5WeekAve: z.number(),

    stQ3WK9: z.number(),
    stQ3WK10: z.number(),
    stQ3WK11: z.number(),
    stQ3WK12: z.number(),
    stQ3WK13: z.number(),

    wklyST: z.string(),
    lastWeekVsAve: z.string(),
})

export type stDataReturnData = z.infer<typeof StDataReturnData>