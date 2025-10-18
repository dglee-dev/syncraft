"use client";

import clsx from "clsx";
import React, { useState } from "react";

import Checked from "@/components/common/checkbox/icon/Checked";

const Checkbox = ({
  checkedDefault = false,
  children,
  onChange,
}: {
  checkedDefault: boolean;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState(
    checkedDefault
  );

  const id = React.useId();

  const input = (
    <input
      id={id}
      type="checkbox"
      className={clsx(
        "absolute",
        "opacity-0 w-0 h-0"
      )}
      onChange={(e) => {
        setIsChecked(e.target.checked);
        onChange?.(e.target.checked);
      }}
      checked={isChecked}
    />
  );

  const checkboxClasses = clsx(
    "inline-block",
    "bg-blue-100 min-w-[18px] min-h-[18px]",
    "group-has-[input:checked]:bg-red-100",
    isChecked ? "bg-red-100" : "",
    "flex justify-center items-center"
  );

  return (
    <label
      className={checkboxClasses}
      htmlFor={id}
    >
      {input}
      {isChecked && <Checked />}
      {children && <span>{children}</span>}
    </label>
  );
};

export default Checkbox;
