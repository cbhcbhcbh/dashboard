import { StDataItem } from "@/app/manualReporting/data/schema";
import { createOrUpdateStDataItem, getSubLob } from "@/data-access/stData";
import prisma from "@/db";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { GeneralAgent } from "@/app/manualReporting/data/options";
import { getBusinessModule, getHQ } from "@/data-access/stDatamapping";
import { Option } from '@/components/multiple-selector';

export async function POST(request: Request): Promise<NextResponse> {

    const content = await request.json();
    const name = content.name.split(".")[0].split('-')[1].toUpperCase()
    const stDataList: StDataItem[] = []
    content.data.forEach((item: any) => {
        console.log(item['总代'])

        const stDataItem = {
            generalAgent: item['总代'],
            hqID: item['Apple HQ ID'],
            hqName: item['Apple HQ Name'],
            className: item['Class Name'],
            subClass: item['Sub Class'],
            mpn: item['MPN'],
            marketingPartName: item['Marketing Part Name'],
            businessModule: item['业务模块'],
            initialEOH: item['期初EOH'],
            distribution: item['本周分货'],
            endEOH: item['期末EOH'],
            actualEOH: item['实际EOH'],
            ltd: item['LTD'],
            fy23Q4STQTD: item['FY23 Q4 ST QTD'],
            q1STQTD: item['Q1 ST QTD'],
            q2STQTD: item['Q2 ST QTD'],
            q3STQTD: item['Q3 ST QTD'],
            q4STQTD: item['Q4 ST QTD'],
            st5WeekAve: item['ST 5Wk Ave'],
            woi: item['WOI'],

            fy23stQ4WK13: item['FY23 ST Q4 Wk13'],

            stQ1WK1: item['ST Q1 Wk1'],
            stQ1WK2: item['ST Q1 Wk2'],
            stQ1WK3: item['ST Q1 Wk3'],
            stQ1WK4: item['ST Q1 Wk4'],
            stQ1WK5: item['ST Q1 Wk5'],
            stQ1WK6: item['ST Q1 Wk6'],
            stQ1WK7: item['ST Q1 Wk7'],
            stQ1WK8: item['ST Q1 Wk8'],
            stQ1WK9: item['ST Q1 Wk9'],
            stQ1WK10: item['ST Q1 Wk10'],
            stQ1WK11: item['ST Q1 Wk11'],
            stQ1WK12: item['ST Q1 Wk12'],
            stQ1WK13: item['ST Q1 Wk13'],

            stQ2WK1: item['ST Q2 Wk1'],
            stQ2WK2: item['ST Q2 Wk2'],
            stQ2WK3: item['ST Q2 Wk3'],
            stQ2WK4: item['ST Q2 Wk4'],
            stQ2WK5: item['ST Q2 Wk5'],
            stQ2WK6: item['ST Q2 Wk6'],
            stQ2WK7: item['ST Q2 Wk7'],
            stQ2WK8: item['ST Q2 Wk8'],
            stQ2WK9: item['ST Q2 Wk9'],
            stQ2WK10: item['ST Q2 Wk10'],
            stQ2WK11: item['ST Q2 Wk11'],
            stQ2WK12: item['ST Q2 Wk12'],
            stQ2WK13: item['ST Q2 Wk13'],

            stQ3WK1: item['ST Q3 Wk1'],
            stQ3WK2: item['ST Q3 Wk2'],
            stQ3WK3: item['ST Q3 Wk3'],
            stQ3WK4: item['ST Q3 Wk4'],
            stQ3WK5: item['ST Q3 Wk5'],
            stQ3WK6: item['ST Q3 Wk6'],
            stQ3WK7: item['ST Q3 Wk7'],
            stQ3WK8: item['ST Q3 Wk8'],
            stQ3WK9: item['ST Q3 Wk9'],
            stQ3WK10: item['ST Q3 Wk10'],
            stQ3WK11: item['ST Q3 Wk11'],
            stQ3WK12: item['ST Q3 Wk12'],
            stQ3WK13: item['ST Q3 Wk13'],

            stQ4WK1: item['ST Q4 Wk1'],
            stQ4WK2: item['ST Q4 Wk2'],
            stQ4WK3: item['ST Q4 Wk3'],
            stQ4WK4: item['ST Q4 Wk4'],
            stQ4WK5: item['ST Q4 Wk5'],
            stQ4WK6: item['ST Q4 Wk6'],
            stQ4WK7: item['ST Q4 Wk7'],
            stQ4WK8: item['ST Q4 Wk8'],
            stQ4WK9: item['ST Q4 Wk9'],
            stQ4WK10: item['ST Q4 Wk10'],
            stQ4WK11: item['ST Q4 Wk11'],
            stQ4WK12: item['ST Q4 Wk12'],
            stQ4WK13: item['ST Q4 Wk13'],

            current: name,
        }

        stDataList.push(stDataItem)
    })

    for (let stDataItem of stDataList) {
        await createOrUpdateStDataItem(stDataItem)
    }

    return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

export async function GET(request: Request): Promise<NextResponse> {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const generalAgent = JSON.parse(searchParams.get('GeneralAgent')!);
    const businessModule = JSON.parse(searchParams.get('BusinessModule')!);
    const className = JSON.parse(searchParams.get('ClassName')!);

    let data: Option[] = []
    if (generalAgent) {
        data = await getBusinessModule(generalAgent)
    } else if (businessModule) {
        data = await getHQ(businessModule)
    } else {
        data = await getSubLob(className)
    }

    return NextResponse.json({ status: 200, revalidated: false, data: data });
}