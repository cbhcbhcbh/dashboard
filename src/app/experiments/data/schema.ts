import { z } from "zod"

export const experimentSchema = z.object({
    id: z.string(),
    platform: z.string(),
    type: z.string(),
    qualified: z.string(),
    status: z.string(),
    experimentID: z.string(),
    owner: z.string(),
    name: z.string(),
    start: z.string(),
    end: z.string(),
    // phrase: z.string().url({ message: "Please enter a valid URL." }),
    phrase: z.string(),
})

export type Experiment = z.infer<typeof experimentSchema>

export const experimentCreateSchema = z.object({
    platform: z.string(),
    type: z.string(),
    qualified: z.string(),
    status: z.string(),
    experimentID: z.string(),
    owner: z.string(),
    name: z.string(),
    start: z.string(),
    end: z.string(),
    // phrase: z.string().url({ message: "Please enter a valid URL." }),
    phrase: z.string(),
})

export type ExperimentCreate = z.infer<typeof experimentCreateSchema>