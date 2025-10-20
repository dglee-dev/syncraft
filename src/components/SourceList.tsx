"use client";

import React from "react";

import List from "@/components/common/List";
import Checkbox from "@/components/common/checkbox";

const SourceList = ({
  sourceList,
}: {
  sourceList: Array<string>;
}) => {
  return (
    <List.Container>
      {sourceList.map((sourceItem, index) => {
        return (
          <List.Item
            key={sourceItem + index}
            title={sourceItem}
            checkbox={
              <Checkbox
                checkedDefault={false}
                onChange={() => {
                  console.log(sourceItem);
                }}
              />
            }
          />
        );
      })}
    </List.Container>
  );
};

export default SourceList;
