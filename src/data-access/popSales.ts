import { ResellerSales } from '@/app/orders/data/popsales';
import prisma from '@/db';

export type PopSales = {
    reseller: string[],
    saleType: string[],
    product: string[],
}

export async function getPopSalesForItems(popSale: PopSales, datePicker: any) {
    const resellerList: string[] = []
    popSale.reseller.map((resellerItem: string) => {
        if (Object.keys(ResellerSales).includes(resellerItem)) {
            resellerList.push(ResellerSales[resellerItem as keyof typeof ResellerSales])
        }
    })

    const popsales = await prisma.popSale.groupBy({
        by: ['reseller', 'saleType', 'product', 'date'],
        where: {
            reseller: { in: resellerList },
            saleType: { in: popSale.saleType },
            product: { in: popSale.product },
            date: {
                lt: datePicker.to,
                gt: datePicker.from,
            }
        },
        _sum: {
            netPaymentQuantity: true
        },
        orderBy: {
            date: 'asc',
        },
    });

    return popsales
}