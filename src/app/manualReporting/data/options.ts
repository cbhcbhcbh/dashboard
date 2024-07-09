import { Option } from '@/components/multiple-selector';

export const GeneralAgent: Option[] = [
    { label: "福州神码", value: 'FZDC' },
    { label: "佳华信息", value: 'JHXX' },
    { label: "酷联", value: 'KLTX' },
]

export const BusinessModule: Option[] = [
    { label: "Alipay", value: 'Alipay' },
    { label: "DW", value: 'DW' },
    { label: "JD", value: 'JD' },
    { label: "Tmall", value: 'Tmall' },
    { label: "VIP", value: 'VIP' },
]

// export const HQ: Option[] = [
//     { label: "爱租机", value: '3660582' },
//     { label: "百利时代", value: '3746199' },
//     { label: "北京丰享", value: '3704936' },
//     { label: "畅普斯数码", value: '1971181' },
//     { label: "丰年时代", value: '1551650' },
//     { label: "杭州斐途", value: '2063263' },
//     { label: "杭州松杏", value: '2089790' },
//     { label: "嘉世优品", value: '3288108' },
//     { label: "江西今朝", value: '3415946' },
//     { label: "景贤加业", value: '3281451' },
//     { label: "南京羽通", value: '1770509' },
//     { label: "轻松换", value: '4047494' },
//     { label: "上海古霖", value: '2446585' },
//     { label: "上海盘潜", value: '2982725' },
//     { label: "上海桑核", value: '3293951' },
//     { label: "上海卓瓦", value: '4001366' },
//     { label: "深蓝港", value: '1805265' },
//     { label: "深圳扬笛", value: '3288731' },
//     { label: "天猫校园", value: '3704936' },
//     { label: "新奇示", value: '3661459' },
//     { label: "银诺嘉信", value: '2135120' },
//     { label: "友好物", value: '4192041' },
//     { label: "智慧生活", value: '2068768' },
// ]

//  上个季度  校园和丰享 同一个id
//  这个季度  校园和橙淘网络 同一个id

export const HQ: Option[] = [
    { label: "爱租机", value: '爱租机' },
    { label: "百利时代", value: '百利时代' },
    { label: "北京丰享", value: '北京丰享' },
    { label: "畅普斯数码", value: '畅普斯数码' },
    { label: "丰年时代", value: '丰年时代' },
    { label: "橙淘", value: '橙淘' },
    { label: "杭州斐途", value: '杭州斐途' },
    { label: "杭州松杏", value: '杭州松杏' },
    { label: "嘉世优品", value: '嘉世优品' },
    { label: "江西今朝", value: '江西今朝' },
    { label: "景贤加业", value: '景贤加业' },
    { label: "南京羽通", value: '南京羽通' },
    { label: "轻松换", value: '轻松换' },
    { label: "上海古霖", value: '上海古霖' },
    { label: "上海盘潜", value: '上海盘潜' },
    { label: "上海桑核", value: '上海桑核' },
    { label: "上海卓瓦", value: '上海卓瓦' },
    { label: "深蓝港", value: '深蓝港' },
    { label: "深圳扬笛", value: '深圳扬笛' },
    { label: "天猫校园", value: '天猫校园' },
    { label: "新奇示", value: '新奇示' },
    { label: "银诺嘉信", value: '银诺嘉信' },
    { label: "友好物", value: '友好物' },
    { label: "智慧生活", value: '智慧生活' },
]


export const ClassName: Option[] = [
    { label: "iPhone", value: 'iPhone' },
    { label: "iPad", value: 'iPad' },
    { label: "CPU", value: 'CPU' },
    { label: "Watch", value: 'Watch' },
    { label: "AirPods", value: 'AirPods' },
    { label: "Accessories", value: 'Accessories' },
    { label: "AC+", value: 'AC+' },
    { label: "Beats", value: 'Beats' },
]

export const BusinessModuleChange = {
    "FZDC": [
        { label: "京东", value: 'JD' },
    ],
    "JHXX": [
        { label: "Taobao 百补", value: 'Taobao 百补' },
        { label: "PDD 百补", value: 'PDD 百补' },
    ],
    "KLTX": [
        { label: "JD LBS", value: 'JD LBS' },
        { label: "美团 LBS", value: '美团 LBS' },
    ],
}