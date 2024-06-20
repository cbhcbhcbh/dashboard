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
        const baseDate = DateTime.fromObject({ year: 1899, month: 12, day: 30 });

        const productList = ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max']
        const acc: any[] = []
        if (content[0]["T2"]) {
            const popSaleData = content.reduce((acc: any[], item: any) => {
                if (productList.includes(item['Sub LoB'])) {
                    const refundRate = item['支付金额'] ? (item['成功退款金额'] / item['支付金额']) : 0
                    const refundAmount = refundRate * item['支付件数']
                    const netPaymentQuantity = item['支付件数'] - refundAmount
                    const popSale = {
                        reseller: item['T2'],
                        date: baseDate.plus({ days: item['统计日期'] }),
                        productID: item['商品ID'],
                        saleType: item['直降/分期'],
                        product: item['Sub LoB'],
                        totalSales: item['支付件数'],
                        totalMoney: item['支付金额'],
                        refundMoney: item['成功退款金额'],

                        refundRate: parseFloat(refundRate.toFixed(3)),
                        refundAmount: parseFloat(refundAmount.toFixed(3)),
                        netPaymentQuantity: Math.round(netPaymentQuantity),
                    }

                    if (popSale === undefined) {
                        console.log(`item: ${item} reseller: ${item['T2']} date: ${baseDate.plus({ days: item['统计日期'] })} productID: ${item['商品ID']} saleType: ${item['直降/分期']} product: ${item['Sub LoB']}`)
                    }

                    // return popSale

                    return [...acc, popSale];
                }
                return acc
            }, [])

            for (let popSale of popSaleData) {
                try {
                    const record = await prisma.popSale.findFirst({
                        where: {
                            reseller: popSale.reseller,
                            date: popSale.date,
                            productID: popSale.productID,
                            saleType: popSale.saleType,
                            product: popSale.product,
                        }
                    })
                    if (!record) {
                        await prisma.popSale.create({
                            data: popSale
                        })
                    }
                } catch (error) {
                    console.log(`error: ${error} popSale: ${popSale}`)
                }
            }

        } else {
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
                            "JD-24期": item['JD-24期'] ? item['JD-24期'] : "-",
                        },
                    }),
                };

                return pricetracking
            })

            for (let pricetrack of pricetrackingData) {
                const record = await prisma.pricetracking.findFirst({
                    where: {
                        date: pricetrack.date,
                        product: pricetrack.product,
                        storage: pricetrack.storage,
                    }
                })
                if (!record) {
                    await prisma.pricetracking.create({
                        data: pricetrack
                    })
                }
            }
        }

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
        const category = JSON.parse(searchParams.get('Category')!);
        const product = JSON.parse(searchParams.get('Product')!);
        const storage = JSON.parse(searchParams.get('Storage')!);

        const categoryList = category.map((cat: any) => cat.value)

        const pricetrackings = await prisma.pricetracking.findMany({
            where: {
                product: { in: product.map((pdt: any) => pdt.value) },
                storage: { in: storage.map((pdt: any) => pdt.value) },
            },
            select: {
                date: true,
                product: true,
                storage: true,
                newDAC: true,
                reseller: true,
            },
            orderBy: {
                date: 'asc',
            },
        })

        const returnData: DataProps[] = []
        const returnJson: { [key: string]: { [key: string]: number } } = {}
        const newDACJson: { [key: string]: { [key: string]: number } } = {}

        const anotherData: PerceptionDataProps[] = []

        pricetrackings.map((pricetracking) => {
            const newDAC: number = pricetracking.newDAC
            if (!returnJson["newDAC"]) {
                returnJson["newDAC"] = {};
                newDACJson["newDAC"] = {};
            }
            if (!returnJson["newDAC"][getDateString(pricetracking.date)]) {
                returnJson["newDAC"][getDateString(pricetracking.date)] = 0;
                newDACJson["newDAC"][getDateString(pricetracking.date)] = 0;
            }

            returnJson["newDAC"][getDateString(pricetracking.date)] += newDAC
            newDACJson["newDAC"][getDateString(pricetracking.date)] += newDAC

            const resellerObject = pricetracking.reseller as Prisma.JsonObject
            const resellerJson = JSON.parse(JSON.parse(JSON.stringify(resellerObject)))
            Object.entries(resellerJson).forEach(([key, value]) => {
                if (categoryList.includes(key)) {
                    Object.entries(value as JSON).forEach(([key2, value2]) => {
                        if (!returnJson[key2]) {
                            returnJson[key2] = {};
                        }

                        if (value2 !== undefined && typeof value2 === 'number') {
                            if (!returnJson[key2][getDateString(pricetracking.date)]) {
                                returnJson[key2][getDateString(pricetracking.date)] = 0;
                            }
                            returnJson[key2][getDateString(pricetracking.date)] += value2
                        }
                    })
                }
            })
        });

        if (categoryList.includes("24期分期")) {
            console.log(`returnJson:  ${returnJson["newDAC"]}`)
            delete returnJson?.["newDAC"];
        }

        Object.entries(returnJson).forEach(([key, value]) => {
            const tempDataProps: DataProps = {
                id: '',
                data: []
            };

            const tempAnotherDataProps: PerceptionDataProps = {
                id: '',
                data: []
            };

            Object.entries(value).forEach(([key1, value1]) => {
                if (!tempDataProps.id && tempDataProps.id !== key) {
                    tempDataProps.id = key
                }
                tempDataProps.data.push({ x: key1, y: value1 } as DataPoint)

                if (!tempAnotherDataProps.id && tempAnotherDataProps.id !== key) {
                    tempAnotherDataProps.id = key
                }
                tempAnotherDataProps.data.push({ x: key1, y: parseFloat((value1 / newDACJson["newDAC"][key1] - 1).toFixed(3)) } as DataPoint)
            })
            returnData.push(tempDataProps)
            anotherData.push(tempAnotherDataProps)

        })


        return NextResponse.json({ status: 200, revalidated: true, now: Date.now(), data: { returnData: returnData, anotherData: anotherData } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 303, revalidated: true, now: Date.now() });
    }
}