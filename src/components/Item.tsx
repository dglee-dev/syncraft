"use client";

import clsx from "clsx";
import React, { useState } from "react";

const Item = ({ title }: { title: string }) => {
  return (
    <li
      className={clsx(
        "text-sm mb-[0.2em]",
        "flex items-center justify-between"
      )}
    >
      <span>{title}</span>
      <Checkbox checkedDefault={false}></Checkbox>
    </li>
  );
};

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

const Checked = () => {
  return (
    <svg
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 8"
      width="12"
      height="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      transform="translate(0,3)"
    >
      <polyline points="2 1 6 7 10 1" />
    </svg>
  );
};

export default Item;
