import prisma from "@/db";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { formSchema } from "@/app/manualReporting/data/schema";
import { getAllStDataItems } from "@/data-access/stData";


export async function POST(request: Request): Promise<NextResponse> {

    const content: formSchema = await request.json();

    const stDataReturnList = await getAllStDataItems(content)

    return NextResponse.json({ status: 200, revalidated: true, now: Date.now(), data: { stDataReturnList: stDataReturnList } });
}