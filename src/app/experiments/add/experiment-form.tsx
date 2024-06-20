"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { experimentCreateSchema, ExperimentCreate } from "../data/schema"


export function ExperimentForm() {
    const router = useRouter();

    const defaultValues: ExperimentCreate = {
        platform: '',
        type: '',
        qualified: '',
        status: '',
        experimentID: '',
        owner: '',
        name: '',
        start: '',
        end: '',
        phrase: '',
    }

    const form = useForm<ExperimentCreate>({
        resolver: zodResolver(experimentCreateSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: ExperimentCreate) {
        console.log(`onSubmit: ${data}`)
        try {
            await fetch(`/api/experiment`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            })
            router.push('/experiments')
        } catch (error) {
            console.error(`/experiments: ${error}`)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" {...field} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Carry-over">Carry-over</SelectItem>
                                    <SelectItem value="New">New</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="qualified"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Qualified</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" {...field} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="Possible">Possible</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" {...field} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Finalized">Finalized</SelectItem>
                                    <SelectItem value="Rollout">Rollout</SelectItem>
                                    <SelectItem value="Temporarily Hold">Temporarily Hold</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                    <SelectItem value="Submitted">Submitted</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="experimentID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ExperimentID</FormLabel>
                            <FormControl>
                                <Input placeholder="experimentID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Owner</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" {...field} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Lucie Lu">Lucie Lu</SelectItem>
                                    <SelectItem value="Kerry Yang">Kerry Yang</SelectItem>
                                    <SelectItem value="Greg Gao">Greg Gao</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="experimentID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start</FormLabel>
                            <FormControl>
                                <Input placeholder="experimentID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End</FormLabel>
                            <FormControl>
                                <Input placeholder="experimentID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phrase"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phrase</FormLabel>
                            <FormControl>
                                <Input placeholder="experimentID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Update Detail</Button>
            </form>
        </Form>
    )
}