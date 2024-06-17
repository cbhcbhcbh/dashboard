import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"

export const statuses = [
    {
        value: "Finalized",
        label: "Finalized",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "Rollout",
        label: "Rollout",
        icon: CircleIcon,
    },
    {
        value: "Temporarily Hold",
        label: "Temporarily Hold",
        icon: StopwatchIcon,
    },
    {
        value: "Completed",
        label: "Completed",
        icon: CheckCircledIcon,
    },
    {
        value: "Ongoing",
        label: "Ongoing",
        icon: CrossCircledIcon,
    },
    {
        value: "Submitted",
        label: "Submitted",
        icon: CrossCircledIcon,
    },
]
