import React, { useState } from "react";

export default ({items, onSelectionChange}) => {
    const [selectedItems, setSelectedItems] = useState([]);
  
    const itemsWithState = items.map((item) => (
      {
        selected: false,
        name: item
      }
    ));
  
    const [searchQuery, setSearchQuery] = useState("");
  
    const [listItems, setListItems] = useState(itemsWithState);
  
    return (
      <div className="flex flex-col relative group">
        <div className="flex bg-slate-200 p-2 rounded-lg border-gray-800 border">
          <div className="flex *:mr-1">
            {
              selectedItems.map((item) =>
                <div key={`tag-${item}`} className="flex bg-gray-400 text-sm px-1">
                  { item }
                  <span className="px-1 font-bold text-blue-950 hover:text-blue-900 hover:cursor-pointer"
                    onClick={() => {
                      const newSelectedItems = selectedItems.filter(selectedItem => selectedItem != item);
                      setSelectedItems(newSelectedItems);
                      onSelectionChange(newSelectedItems);
                      setListItems(listItems.map(listItem => {
                        if(listItem.name == item) {
                          return {
                            selected: false,
                            name: item
                          }
                        } else {
                          return listItem;
                        }
                      }))
                    }}>x</span>
                </div>
              )
            } 
          </div>
          <input className="bg-transparent focus:outline-0 w-full" type="text" value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }} />
        </div>
        <div className="absolute top-12 flex-col w-full invisible group-has-[:focus]:visible">
          {
            listItems.map((item) =>
              !item.selected && item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
                <div key={`item-${item.name}`} className="p-4 bg-slate-50 hover:bg-slate-300 hover:cursor-pointer shadow-sm"
                  onMouseDown={() => {
                    setListItems(listItems.map(listItem => {
                      if(listItem.name == item.name) {
                        return {
                          selected: true,
                          name: item.name
                        }
                      } else {
                        return listItem
                      }
                    }))
                    const newSelectedItems = [...selectedItems, item.name];
                    setSelectedItems(newSelectedItems);
                    setSearchQuery("");
                    onSelectionChange(newSelectedItems);
                  }}>
                  {item.name}
                </div>
  
            )
          } 
        </div>
      </div>
    )
  }