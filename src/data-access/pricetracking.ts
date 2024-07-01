import prisma from '@/db';

export type PopSales = {
    reseller: string[],
    saleType: string[],
    product: string[],
}

export async function getPriceTrackingAll(product: any, storage: any, datePicker: any) {
    const pricetrackings = await prisma.pricetracking.findMany({
        where: {
            product: { in: product.map((pdt: any) => pdt.value) },
            storage: { in: storage.map((pdt: any) => pdt.value) },
            date: {
                lt: datePicker.to,
                gt: datePicker.from,
            }
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

    return pricetrackings;
}