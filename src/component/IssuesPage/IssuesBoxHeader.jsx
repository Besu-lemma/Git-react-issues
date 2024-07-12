import { ClosedIcon, OpenIcon } from "./Icons";
import { headerList } from "./Static";
import RightHeader from "./RightHeader";
import RightButtons from "../SearchBar/RightButtons";
import { useState } from "react";

function IssuesBoxHeader() {
  const [openDropDownIndex, setOpenDropDownIndex] = useState(null);

  const toggleDropDown = (index) => {
    setOpenDropDownIndex(index === openDropDownIndex ? null : index);
  };

  return (
    <div className="min-h-[50px] flex flex-col border-b border-slate-700 md:flex-row md:justify-between items-center px-3 py-4 rounded-t-md gap-4 bg-[#30363D]">
      <div className="flex gap-3">
        <RightButtons
          text="Open"
          count="731"
          icon={<OpenIcon color="#fff" />}
          rounded="rounded-l-md"
        />
        <RightButtons
          text="Closed"
          count="12,300"
          icon={<ClosedIcon />}
          rounded="rounded-r-md"
        />
      </div>
      <div className="flex  gap-3 sm:gap-8">
        {headerList.map((item, index) => (
          <RightHeader
            key={`headerList-${index}`}
            item={item}
            isOpen={openDropDownIndex === index}
            onToggle={() => toggleDropDown(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default IssuesBoxHeader;
