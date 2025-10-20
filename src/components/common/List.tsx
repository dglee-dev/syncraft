import clsx from "clsx";
import React from "react";

const List = () => {};

List.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ul>{children}</ul>;
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
        "text-sm mb-[0.2em]",
        "flex items-center justify-between"
      )}
    >
      <span>{title}</span>

      {checkbox}
    </li>
  );
};

export default List;
