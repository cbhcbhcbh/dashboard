'use client';

import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"


const AddWithExcel = () => {
    const router = useRouter()

    return (
        <div className="p-4">
            <Button onClick={() => router.push('/manualReporting/add')}>
                Add
            </Button>
        </div>
    )
}

export default AddWithExcel;