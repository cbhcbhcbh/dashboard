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
import { Button } from '@/components/ui/button';
import { useState } from "react";
import MultipleSelector, { Option } from '@/components/multiple-selector';
import { FormSchema, formSchema, stDataReturnData, optionSchema } from '../data/schema';
import { BusinessModule, ClassName, GeneralAgent, HQ } from '../data/options';
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const STDataMultipleSelectorWithForm = () => {

    const [businessModule, setBusinessModule] = useState<Option[]>([]);
    const [hqName, setHQName] = useState<Option[]>([]);
    const [subLob, setSubLob] = useState<Option[]>([]);
    const [stData, setStData] = useState<stDataReturnData[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const form = useForm<formSchema>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: formSchema) {
        await fetch(`/api/manualCheck`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log(`data.stDataReturnList: ${data.data.stDataReturnList}`)
            setStData(data.data.stDataReturnList)
            setIsVisible(true);
        })
    }

    const handleGeneralAgentChange = async (generalAgentOptions: z.infer<typeof optionSchema>[]) => {
        const businessModuleData = await fetch(`/api/manualReporting?GeneralAgent=${JSON.stringify(generalAgentOptions)}`, {
            method: "GET"
        }).then(response => response.json())

        setBusinessModule(businessModuleData["data"]);
    }

    const handleBusinessModuleChange = async (businessModuleOptions: z.infer<typeof optionSchema>[]) => {
        const hqData = await fetch(`/api/manualReporting?BusinessModule=${JSON.stringify(businessModuleOptions)}`, {
            method: "GET"
        }).then(response => response.json())
        setHQName(hqData["data"]);
    }

    const handleClassNameChange = async (classNameOptions: z.infer<typeof optionSchema>[]) => {
        const classNameData = await fetch(`/api/manualReporting?ClassName=${JSON.stringify(classNameOptions)}`, {
            method: "GET"
        }).then(response => response.json())

        setSubLob(classNameData["data"]);
    }

    return (
        <div>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 p-4">
                    <FormField
                        control={form.control}
                        name="generalAgent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Disti</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        // 使用{...field}确实是为了让MultipleSelector的onChange事件被field.onChange替代
                                        {...field}
                                        defaultOptions={GeneralAgent}
                                        hidePlaceholderWhenSelected
                                        placeholder="Select Disti you like..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                        onChange={(value) => {
                                            field.onChange(value)
                                            handleGeneralAgentChange(value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="businessModule"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Platform</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={BusinessModule}
                                        options={businessModule}
                                        hidePlaceholderWhenSelected
                                        placeholder="Select platform you like..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                        onChange={(value) => {
                                            field.onChange(value)
                                            handleBusinessModuleChange(value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hq"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>T2 Resellers</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={HQ}
                                        options={hqName}
                                        hidePlaceholderWhenSelected
                                        placeholder="Select T2 Resellers you like..."
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
                        name="className"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lob</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={ClassName}
                                        hidePlaceholderWhenSelected
                                        placeholder="Select Lob you like..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                        onChange={(value) => {
                                            field.onChange(value)
                                            handleClassNameChange(value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subLob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sub Lob</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        hidePlaceholderWhenSelected
                                        options={subLob}
                                        placeholder="Select Sub Lob you like..."
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

                    <Button type="submit">Update Detail</Button>
                </form>

            </Form>

            {isVisible &&
                <Card>
                    <DataTable data={stData} columns={columns} />
                </Card>
            }

        </div>
    )
}