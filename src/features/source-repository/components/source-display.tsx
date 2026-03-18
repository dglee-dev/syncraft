"use client";

import clsx from "clsx";
import React from "react";
import { overlay } from "overlay-kit";

import SettingsIcon from "@/features/source-repository/components/settings-icon";
import S3SettingsForm from "@/features/source-repository/components/s3-settings-form";

const SourceDisplay = () => {
  const openSettings = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <S3SettingsFormOverlay isOpen={isOpen} close={close} unmount={unmount} />
    ));
  };

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
        onClick={openSettings}
      />
    </h3>
  );
};

const S3SettingsFormOverlay = ({
  close,
  unmount,
}: {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={close}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative z-10 w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <S3SettingsForm
          onSubmit={(settings) => {
            console.log("S3 settings:", settings);
            unmount();
          }}
          onCancel={unmount}
        />
      </div>
    </div>
  );
};

export default SourceDisplay;
