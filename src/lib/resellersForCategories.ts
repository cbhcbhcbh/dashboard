import { Option } from '@/components/multiple-selector';

export const Resellers = {
    "常规": [
        { label: "JD self-run", value: 'JD self-run' },
        { label: "Tmall AOS", value: 'Tmall AOS' },
        { label: "Tmall 移动", value: 'Tmall 移动' },
        { label: "Tmall 联通", value: 'Tmall 联通' },
        { label: "Tmall 电信", value: 'Tmall 电信' },
        { label: "VIP", value: 'VIP' },
        { label: "SN self-run", value: 'SN self-run' },
        { label: "Maoning", value: 'Maoning' },
        { label: "壹品良机", value: '壹品良机' },
        { label: "深蓝港", value: '深蓝港' },
        { label: "机御", value: '机御' },
        { label: "天猫校园", value: '天猫校园' },
    ],
    "百亿补贴": [
        { label: "Taobao 百补", value: 'Taobao 百补' },
        { label: "PDD 百补", value: 'PDD 百补' },
    ],
    "小时达": [
        { label: "JD LBS", value: 'JD LBS' },
        { label: "美团 LBS", value: '美团 LBS' },
    ],
    "24期分期": [
        { label: "DY-24期", value: 'DY-24期' },
        { label: "MN-24期", value: 'MN-24期' },
        { label: "壹品-24期", value: '壹品-24期' },
        { label: "深蓝-24期", value: '深蓝-24期' },
        { label: "机御-24期", value: '机御-24期' },
        { label: "天猫校园-24期", value: '天猫校园-24期' },
        { label: "JD-24期", value: 'JD-24期' },
    ],
}

export function getResellersForCategories(categoryOptions: Option[]) {
    const resellers = categoryOptions.reduce((acc, item) => {
        if ((Resellers as any)[item.label]) {
            acc = [...acc, ...(Resellers as any)[item.label]]
        }
        return acc;
    }, [] as Option[]);
    resellers.splice(0, 0, { label: "All", value: 'All' });
    return resellers
}