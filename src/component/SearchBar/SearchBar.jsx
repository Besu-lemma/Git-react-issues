import React, { useEffect, useState } from "react";
import DropDownIcons from "../Dropdowns/DropDownIcons";
import RightButtons from "./RightButtons";
import Modals from "../Dropdowns/Modals";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues, setSearch } from "../../redux/githubSlice";
import { dropDownDummyText } from "./static";
import { LabelIcon, MileStoneIcon, SelectedIcon } from "./SearchIcons";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { search, currentPage } = useSelector((state) => state.github); // Access 'search' from 'github' slice

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(fetchIssues({ page: currentPage, search }));
    }
  };

  const handleButtonClick = (data) => {
    dispatch(setSearch(data));
    dispatch(fetchIssues({ page: 1, search: data }));
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(isOpen, "isOpen");
  }, [isOpen]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 items-center justify-between">
      <div className="flex items-center w-full md:w-[50%] h-[30px]">
        <div className="h-full relative">
          <button
            onClick={toggleDropDown}
            className="text-white hover:bg-gray-800 bg-[#21262D] h-full px-2 rounded-l-md flex text-sm items-center gap-1"
          >
            Filters <DropDownIcons />
          </button>
          {isOpen && (
            <Modals
              modelPostion={"left-0 right-0"}
              title="Filter Issues"
              onClose={toggleDropDown}
            >
              <ul>
                {dropDownDummyText.map((text, index) => (
                  <li
                    key={`searchBarDropDown-${index}`}
                    className={`${
                      index !== dropDownDummyText.length - 1 ? "border-b" : ""
                    } hover:bg-gray-800 border-slate-700 flex items-center`}
                  >
                    <button
                      className="w-full text-start h-full py-3 px-10"
                      onClick={() => handleButtonClick(text)}
                    >
                      <span className="flex items-center">
                        {search === text && <SelectedIcon />}
                        {search !== text && (
                          <div style={{ width: "24px" }}></div>
                        )}
                        <span
                          className={`inline-block ${
                            search === text && "pl-[15px]"
                          } ${search !== text && "pl-[7px]"}`}
                        >
                          {text}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Modals>
          )}
        </div>
        <div className="h-full w-full">
          <input
            type="text"
            className="h-full w-full border-l-0 rounded-r-md border border-slate-700 outline-none focus:outline-none bg-[#010409] text-sm px-4 text-[#8B949E] focus:outline-blue"
            placeholder="Issues"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
            value={search}
          />
        </div>
      </div>
      <div className="flex justify-between md:gap-3 h-[30px] w-full md:max-w-[380px]">
        <div className="flex">
          <RightButtons
            icon={<LabelIcon />}
            text={"Labels"}
            count={"32"}
            rounded="rounded-l-md"
          />
          <RightButtons
            icon={<MileStoneIcon />}
            text={"Milestones"}
            count={"4"}
            rounded="rounded-r-md"
          />
        </div>
        <button className="text-white bg-green-600 rounded-md text-sm px-2 hover:bg-green-500">
          New issue
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
