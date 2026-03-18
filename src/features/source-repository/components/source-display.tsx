import clsx from "clsx";
import React from "react";

import SettingsIcon from "@/features/source-repository/components/settings-icon";

const SourceDisplay = () => {
  return (
    <h3
      className={clsx(
        "border-r-1 border-b-1 border-amber-200",
        "bg-gray-400 text-white font-medium text-[0.8em]",
        "p-2",
        "flex justify-between items-center",
      )}
    >
      <span>
        s3://justin-blog-contents (ap-northeast-2)
      </span>

      <SettingsIcon
        size={{ width: 20, height: 20 }}
      />
    </h3>
  );
};

export default SourceDisplay;
