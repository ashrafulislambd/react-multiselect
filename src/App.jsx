import React, { useState } from "react";

import MultiSelect from "./MultiSelect";

export default () => {
  const [selectedItems, setSelectedItems] = useState([]);
  return (<>

    { selectedItems.map((item) => (<span key={`${item}`}>{item} </span>)) }

    <MultiSelect items={[
      "Alu",
      "Potol",
      "Kola",
    ]} onSelectionChange={(items) => {
      setSelectedItems(items);
    }}/>
    
  </>)
};
