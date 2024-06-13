import { HandleeExcel } from "@/components/HandleExcelFile";
import { GetDataOrder } from "@/app/orders/_components/charts/OrdersByStringChart"

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <HandleeExcel />
      <GetDataOrder />
    </div>
  );
}
