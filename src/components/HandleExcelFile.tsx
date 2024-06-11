"use client";

import React, { FormEventHandler, useState } from "react";
import * as XLSX from "xlsx";

import { Button } from "./ui/button";
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form, FormLabel } from "./ui/form";


const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";


export function HandleeExcel() {

    const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);


    const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.files?.[0]);
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

            //  store database
            try {
                await fetch('/api/add-post', {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(data)
                })
            } catch (error) {
                console.error(`/api/add-post:  ${error}`)
            }
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