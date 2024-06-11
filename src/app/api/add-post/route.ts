import prisma from "@/db";
import { getDateString } from "@/utils/dateFormat";
import { Prisma } from "@prisma/client";
import { DateTime } from 'luxon';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: Request
): Promise<NextResponse> {
    if (request.method !== "POST") {
        return NextResponse.json({ status: 500, revalidated: true, now: Date.now() });
    }

    try {
        const content = await request.json();

        // const baseDate = DateTime.fromObject({ year: 1900, month: 1, day: 1 }).setLocale("zh-CN").setZone("Asia/Shanghai");
        const baseDate = DateTime.fromObject({ year: 1899, month: 12, day: 30 });

        const pricetrackingData = content.map((item: any) => {
            const pricetracking = {
                date: baseDate.plus({ days: item.Date }),
                product: item.Product,
                storage: item.Storage,
                alp: item.ALP,
                dac: item.DAC,
                dg: item.DG,
                newDAC: item['DAC  new'],
                marketplace_price: item['市场价'],
                reseller: JSON.stringify({
                    "常规": {
                        "JD self-run": item['JD self-run'],
                        "Tmall AOS": item['Tmall AOS'],
                        "Tmall 移动": item['Tmall 移动'],
                        "Tmall 联通": item['Tmall 联通'],
                        "Tmall 电信": item['Tmall 电信'],
                        "VIP": item['VIP'],
                        "SN self-run": item['SN self-run'],
                        "Maoning": item['Maoning'],
                        "壹品良机": item['壹品良机'],
                        "深蓝港": item['深蓝港'],
                        "机御": item['机御'],
                        "天猫校园": item['天猫校园'],
                    },
                    "百亿补贴": {
                        "Taobao 百补": item['Taobao 百补'],
                        "PDD 百补": item['PDD 百补'],
                    },
                    "小时达": {
                        "JD LBS": item['JD LBS'],
                        "美团 LBS": item['美团 LBS'],
                    },
                    "24期分期": {
                        "DY-24期": item['DY-24期'],
                        "MN-24期": item['MN-24期'],
                        "壹品-24期": item['壹品-24期'],
                        "深蓝-24期": item['深蓝-24期'],
                        "机御-24期": item['机御-24期'],
                        "天猫校园-24期": item['天猫校园-24期'],
                    },
                }),
            };

            return pricetracking
        })

        const createPricetracking = await prisma.pricetracking.createMany({ data: pricetrackingData })
        return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 303, revalidated: true, now: Date.now() });
    }
}

export async function GET(request: Request): Promise<NextResponse> {
    const emptyDataProps: DataProps[] = [];
    if (request.method !== "GET") {
        return NextResponse.json({ status: 500, revalidated: true, now: Date.now(), data: emptyDataProps });
    }

    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const category = searchParams.get('Category');
        const product = searchParams.get('Product');
        const storage = searchParams.get('Storage');

        console.log(category)

        const pricetrackings = await prisma.pricetracking.findMany({
            where: {
                product: product!,
                storage: storage!,
            },
            orderBy: {
                date: 'asc',
            },
        })

        console.log(pricetrackings)

        const returnData: DataProps[] = []
        const returnJson: { [key: string]: DataPoint[] } = {}

        pricetrackings.map((pricetracking) => {
            if (!returnJson["newDAC"]) {
                returnJson["newDAC"] = [];
            }
            (returnJson["newDAC"] as { x: String, y: number }[]).push({ x: getDateString(pricetracking.date), y: pricetracking.newDAC })
            const resellerObject = pricetracking.reseller as Prisma.JsonObject
            const resellerJson = JSON.parse(JSON.parse(JSON.stringify(resellerObject)))
            Object.entries(resellerJson).forEach(([key, value]) => {
                console.log(`Object key1: ${key}, value1:`, value);
                if (key === category) {
                    Object.entries(value as JSON).forEach(([key2, value2]) => {
                        if (!returnJson[key2]) {
                            returnJson[key2] = [];
                        }
                        console.log(`Object key2: ${key2}, value2:`, value2);
                        if (value2 !== undefined && typeof value2 === 'number') {
                            (returnJson[key2] as { x: String, y: number }[]).push({ x: getDateString(pricetracking.date), y: value2 })
                        }
                    });
                }
            });

        });

        Object.entries(returnJson).forEach(([key, value]) => {
            const tempDataProps: DataProps = {
                id: '',
                data: []
            };

            if (!tempDataProps.id && tempDataProps.id !== key) {
                tempDataProps.id = key
                tempDataProps.data = value
            }

            returnData.push(tempDataProps)
        })

        console.log(`returnData: ${returnData}`)

        return NextResponse.json({ status: 200, revalidated: true, now: Date.now(), data: returnData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 303, revalidated: true, now: Date.now() });
    }
}