import data from "@/data/data"
// import { MyResponsiveLine } from "@/components/LineChart"
import { HandleeExcel } from "@/components/HandleExcelFile";
// import { SelectForm } from "@/components/SelectDrop";
import { GetDataOrder } from "@/app/orders/_components/charts/OrdersByStringChart"

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <HandleeExcel />
      <GetDataOrder />
      {/* <SelectForm />
      <MyResponsiveLine data={data} /> */}
    </div>
  );
}
