import React from "react";
import clsx from "clsx";
import Checkbox from "@/components/common/checkbox";

const List = () => {};

List.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ul>{children}</ul>;
};

List.Item = ({ title }: { title: string }) => {
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

export default List;
