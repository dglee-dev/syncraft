import clsx from "clsx";

import SourceList from "@/components/SourceList";
import { getSourceList } from "@/lib/source";
import SourceDisplay from "@/features/source-repository/components/source-display";

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
        <SourceDisplay />

        <SourceList sourceList={sourceList} />
      </div>

      <div
        className={clsx(
          "flex-1 p-[1em]",
          "flex justify-center items-center",
        )}
      >
        <div
          className={clsx(
            "w-fit p-1 px-2 rounded-sm",
            "bg-gray-300",
            "text-[13px]",
          )}
        >
          <label htmlFor="file">
            새로운 파일 추가하기
          </label>

          <input
            type="file"
            id="file"
            name="file"
            hidden
            multiple
          />
        </div>
      </div>
    </div>
  );
}
