import { getSourceList } from "@/lib/source";

export default async function Home() {
  const sourceList = await getSourceList();

  console.log("Source: ", sourceList);

  return (
    <div>
      <h1 className="bg-green-100 p-3 font-bold">Syncraft</h1>

      <div className="flex">
        <div className="flex-1 p-[1em]">
          <h3>소스에서 가져온 리스트</h3>

          <ul>
            {sourceList.map((source, index) => {
              return (
                <li key={source + index} className="text-sm mb-[0.2em]">
                  {source}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-1 p-[1em]">
          <h3>변환된 리스트</h3>
        </div>
      </div>
    </div>
  );
}
