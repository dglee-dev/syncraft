import React from "react";

import List from "@/components/common/List";
import { getSourceList } from "@/lib/source";

const SourceList = async () => {
  const sourceList = await getSourceList();

  return (
    <List.Container>
      {sourceList.map((sourceItem, index) => {
        return (
          <List.Item
            key={sourceItem + index}
            title={sourceItem}
          />
        );
      })}
    </List.Container>
  );
};

export default SourceList;
