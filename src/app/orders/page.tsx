import { HandleeExcel } from "@/components/HandleExcelFile";
import MultiSelectZod from "@/app/orders/_components/charts/OrdersByStringsChart"

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <HandleeExcel />
      </div>
      <div>
        <MultiSelectZod />
      </div>
    </div>
  );
}
