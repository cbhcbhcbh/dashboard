"use client";

import React, { FormEventHandler, useState } from "react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";


const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";


export default function HandleeExcel() {

    const router = useRouter()

    const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);
    const [name, setName] = useState<string | undefined>();


    const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.files?.[0]);
        console.log(event.target.files?.[0].name);
        setName(event.target.files?.[0].name)
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            setTypeError(null);
            const reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (e) => {
                setExcelFile(e.target?.result as string | ArrayBuffer);
            }

        } else {
            console.log("Please select your file");
        }
    }

    const handleFileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: "buffer" })
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(`body: ${JSON.stringify(data)}`)

            try {
                await fetch('/api/manualReporting', {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ data: data, name: name })
                })
            } catch (error) {
                console.error(`/api/manualReporting:  ${error}`)
            }
            router.push("/manualReporting")
        } else {
            console.log("handleFileSubmit Error");
        }

    }

    return (
        <Card className='wrapper'>
            <CardHeader>
                <CardTitle>Choose File (*csv, xls, etc.)</CardTitle>
            </CardHeader>
            <CardContent className='w-full h-[150px]'>
                <form onSubmit={handleFileSubmit}>
                    <Label htmlFor="excel">Excel</Label>
                    <Input id="excel" type="file" accept={acceptableCSVFileTypes} onChange={onFileChangeHandler} />
                    <Button type="submit">
                        UPLOAD
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}