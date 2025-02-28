import React from "react";
import sort from "../../assets/sort.png";
import sortup from "../../assets/sortup.png";
import sortdown from "../../assets/sortdown.png";

interface SortButtonProps {
  label: string;
  filterKey: string;
  currentFilter: string;
  changeFilter: (filterKey: string) => void;
}

export const SortButton: React.FC<SortButtonProps> = ({ label, filterKey, currentFilter, changeFilter }) => {
  const isActive = currentFilter.includes(filterKey);

  return (
    <button
      className="w-full md:w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-12 md:h-14"
      onClick={() => changeFilter(filterKey)}
    >
      {label}
      <div className="relative w-5 my-2">
        <img
          src={sortup}
          className={`absolute inset-0 w-full transition-opacity duration-300 ${
            currentFilter === filterKey ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={sortdown}
          className={`absolute inset-0 w-full transition-opacity duration-300 ${
            currentFilter === `${filterKey}-reverse` ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={sort}
          className={`absolute inset-0 w-full transition-opacity duration-300 ${
            !isActive ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${
          isActive ? "w-full" : "w-0"
        } h-[1px] bg-white transition-all`}
      ></div>
    </button>
  );
};
