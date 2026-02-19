import clsx from "clsx";

import SelectedList from "@/components/SelectedList";
import SourceList from "@/components/SourceList";
import { getSourceList } from "@/lib/source";

export default async function Home() {
  const sourceList = await getSourceList();

  return (
    <div
      className={clsx(
        "h-[calc(100dvh-var(--app-header-height))]",
        "flex",
      )}
    >
      <div
        className={clsx(
          "h-full",
          "flex-1",
          "flex flex-col",
        )}
      >
        <h3
          className={clsx(
            "border-r-1 border-b-1 border-amber-200",
            "p-2",
          )}
        >
          소스에서 가져온 리스트
        </h3>

        <SourceList sourceList={sourceList} />
      </div>

      <div className="flex-1 p-[1em]">
        <h3>선택된 리스트</h3>

        <SelectedList />
      </div>
    </div>
  );
}
