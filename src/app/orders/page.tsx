import MultiSelectZod from "@/app/orders/_components/charts/OrdersByStringsChart"

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <MultiSelectZod />
      </div>
    </div>
  );
}
