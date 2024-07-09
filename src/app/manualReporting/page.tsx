import AddWithExcel from "./_components/add";
import { STDataMultipleSelectorWithForm } from "./_components/form";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <AddWithExcel />
      </div>

      <div>
        <STDataMultipleSelectorWithForm />
      </div>
    </div>
  );
}
