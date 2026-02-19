import clsx from "clsx";
import React from "react";

const List = () => {};

List.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ul className="flex-1 min-h-0 overflow-y-scroll">
      {children}
    </ul>
  );
};

List.Item = ({
  title,
  checkbox,
}: {
  title: string;
  checkbox: React.ReactElement;
}) => {
  return (
    <li
      className={clsx(
        "p-2 px-3 pl-2",
        "hover:bg-amber-100",
        "border-b-1 border-b-amber-200",
        "flex items-center justify-between",
        "cursor-pointer select-none",
        "text-sm",
      )}
    >
      <span>{title}</span>

      {checkbox}
    </li>
  );
};

export default List;
