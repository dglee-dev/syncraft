"use client";

import React, { useState } from "react";
import Select from "react-dropdown-select";

const options = [
  { label: "cms source option 1", value: 1 },
  { label: "cms source option 2", value: 2 },
];

const SourceSelect = () => {
  const [selectedOption] = useState(options[0]);

  const onchange = (
    value: (typeof options)[number][],
  ) => {
    console.log(value);
  };

  return (
    <Select
      options={options}
      values={[selectedOption]}
      onChange={onchange}
      multi={false}
    />
  );
};

export default SourceSelect;
