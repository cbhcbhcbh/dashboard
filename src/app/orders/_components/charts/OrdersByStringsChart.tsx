'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import * as React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { MyResponsiveLineBump, MyPerceptionResponsiveLineBump } from '@/components/LineChart'
import { useState } from "react"

import MultipleSelector, { Option } from '@/components/multiple-selector';

const Categories: Option[] = [
    { label: "常规", value: '常规' },
    { label: "百亿补贴", value: '百亿补贴' },
    { label: "小时达", value: '小时达' },
    { label: "24期分期", value: '24期分期' }
]

const Products: Option[] = [
    { label: "iPhone 15", value: 'iPhone 15' },
    { label: "iPhone 15 Plus", value: 'iPhone 15 Plus' },
    { label: "iPhone 15 Pro", value: 'iPhone 15 Pro' },
    { label: "iPhone 15 Pro Max", value: 'iPhone 15 Pro Max' }
]

const Storages: Option[] = [
    { label: "128G", value: '128G' },
    { label: "256G", value: '256G' },
    { label: "512G", value: '512G' }
]

const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});

const FormSchema = z.object({
    category: z.array(optionSchema).min(1),
    product: z.array(optionSchema).min(1),
    storage: z.array(optionSchema).min(1),
});

const MultipleSelectorWithForm = () => {
    const [getData, setGetData] = useState<DataProps[]>([]);
    const [getPerceptionData, setGetPerceptionData] = useState<PerceptionDataProps[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        console.log(data.category)
        try {
            const dataPropsList = await fetch(`/api/add-post?Category=${JSON.stringify(data.category)}&Product=${JSON.stringify(data.product)}&Storage=${JSON.stringify(data.storage)}`, {
                method: "GET"
            }).then(response => response.json())
            setGetData(dataPropsList["data"]["returnData"]);
            setGetPerceptionData(dataPropsList["data"]["anotherData"]);
            setIsVisible(true);
        } catch (error) {
            console.error(`/api/add-post:  ${error}`)
        }
    }

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>价格跟踪表</CardTitle>
                <CardDescription>可以看到多个经销商的价格</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 p-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categories</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={Categories}
                                        placeholder="Select categories you like..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="product"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Products</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={Products}
                                        placeholder="Select products you like..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="storage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Storages</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={Storages}
                                        placeholder="Select storages you like..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Form>

            {isVisible &&
                <CardContent className='w-full h-[400px]'>
                    {/* <MyResponsiveLineBump data={getData} /> */}

                    <MyResponsiveLineBump data={getData} />
                    <MyPerceptionResponsiveLineBump data={getPerceptionData} />

                </CardContent>
            }

        </Card>
    );
};
export default MultipleSelectorWithForm;