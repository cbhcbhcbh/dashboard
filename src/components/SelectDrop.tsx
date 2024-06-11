"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { Card } from "./ui/card"
import { categories, products, storages } from "@/data/category"

const FormSchema = z.object({
    category: z.string().min(1).max(50),
    product: z.string(),
    storage: z.string(),
})

export function SelectForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        try {
            const dataPropsList = await fetch(`/api/add-post?Category=${data.category}&Product=${data.product}&Storage=${data.storage}`, {
                method: "GET"
            })
            console.log(dataPropsList)
        } catch (error) {
            console.error(`/api/add-post:  ${error}`)
        }
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified data source to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((item) => (
                                        <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage category addresses in your{" "}
                                <Link href="/examples/forms">category settings</Link>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>product</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified data source to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {products.map((item) => (
                                        <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage product addresses in your{" "}
                                <Link href="/examples/forms">product settings</Link>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="storage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>storage</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified data source to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {storages.map((item) => (
                                        <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage category addresses in your{" "}
                                <Link href="/examples/forms">storage settings</Link>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>

    )
}
