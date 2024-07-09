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
import { MyResponsiveLineBump, MyPerceptionResponsiveLineBump, MyPopResponsiveLineBump } from '@/components/LineChart'
import { useState } from "react"
import MultipleSelector, { Option } from '@/components/multiple-selector';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { useRouter } from 'next/navigation'
import { getResellersForCategories } from '@/lib/resellersForCategories';
import { PerceptionTable } from './table';

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

const DATE_REQUIRED_ERROR = "Date is required.";

const FormSchema = z.object({
    category: z.array(optionSchema).min(1),
    reseller: z.array(optionSchema),
    product: z.array(optionSchema).min(1),
    storage: z.array(optionSchema).min(1),
    date: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }, { required_error: DATE_REQUIRED_ERROR }).refine((date) => {
        return !!date.from;
    }, DATE_REQUIRED_ERROR),
});

const MultipleSelectorWithForm = () => {
    const router = useRouter()

    const [getData, setGetData] = useState<DataProps[]>([]);
    const [getPerceptionData, setGetPerceptionData] = useState<PerceptionDataProps[]>([]);
    const [getPopSalesData, setGetPopSalesData] = useState<PopSalesDataProps[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [IsVisiblePop, setIsVisiblePop] = useState(false);
    const [availableResellers, setAvailableResellers] = useState<Option[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date: {
                from: undefined,
                to: undefined,
            },
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const dataPropsList = await fetch(`/api/add-post?Category=${JSON.stringify(data.category)}&Reseller=${JSON.stringify(data.reseller)}&Product=${JSON.stringify(data.product)}&Storage=${JSON.stringify(data.storage)}&Date=${JSON.stringify(data.date)}`, {
                method: "GET"
            }).then(response => response.json())
            setGetData(dataPropsList["data"]["returnData"]);
            setGetPerceptionData(dataPropsList["data"]["anotherData"]);
            if (dataPropsList["data"]["popData"].length > 0 && dataPropsList["data"]["popData"] !== undefined) {
                console.log(`dataPropsList["data"]["popData"]: ${dataPropsList["data"]["popData"]}`)
                setIsVisiblePop(true);
                setGetPopSalesData(dataPropsList["data"]["popData"]);
            } else {
                setIsVisiblePop(false);
                setGetPopSalesData([]);
            }
            setIsVisible(true);
        } catch (error) {
            console.error(`/api/add-post:  ${error}`)
        }
    }

    const handleCategoryChange = (categoryOptions: z.infer<typeof optionSchema>[]) => {
        const temp = getResellersForCategories(categoryOptions)
        setAvailableResellers(temp);
    }

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>价格跟踪表</CardTitle>
                <CardDescription>可以看到多个经销商的价格</CardDescription>
            </CardHeader>

            <div className="p-4">
                <Button onClick={() => router.push('/orders/add')}>
                    Add
                </Button>
            </div>

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
                                        // 使用{...field}确实是为了让MultipleSelector的onChange事件被field.onChange替代
                                        {...field}
                                        defaultOptions={Categories}
                                        hidePlaceholderWhenSelected
                                        placeholder="Select categories you like..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                        onChange={(value) => {
                                            field.onChange(value)
                                            handleCategoryChange(value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reseller"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resellers</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={[]}
                                        options={availableResellers}
                                        hidePlaceholderWhenSelected
                                        placeholder="Select resellers you like..."
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
                                        hidePlaceholderWhenSelected
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
                                        hidePlaceholderWhenSelected
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
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value.from && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value.from ? (
                                                field.value.to ? (
                                                    <>
                                                        {format(field.value.from, "LLL dd, y")} -{" "}
                                                        {format(field.value.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(field.value.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={field.value.from}
                                            selected={{ from: field.value.from!, to: field.value.to }}
                                            onSelect={field.onChange}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
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
                    <PerceptionTable data={getData} />
                    <MyPerceptionResponsiveLineBump data={getPerceptionData} />
                    {/* <PerceptionTable data={getPerceptionData} /> */}
                    {IsVisiblePop &&
                        <MyPopResponsiveLineBump data={getPopSalesData} />
                    }
                </CardContent>
            }

        </Card>
    );
};
export default MultipleSelectorWithForm;