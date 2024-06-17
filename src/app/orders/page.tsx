import { HandleeExcel } from "@/components/HandleExcelFile";
import { GetDataOrder } from "@/app/orders/_components/charts/OrdersByStringChart"
import MultiSelectZod from "@/app/orders/_components/charts/OrdersByStringsChart"

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <HandleeExcel />
      <MultiSelectZod />
    </div>
  );
}
