/**
 *
 * This is for the custom input of the search or other specific input
 */
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "../icons/search_icon";

export const SearchInput = ({ action }) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    if (event.target.value == "") action("");
    setValue(event.target.value);
  };
  const [searchTerm] = useDebounce(value, 1000);

  useEffect(() => {
    if (searchTerm) action(searchTerm);
  }, [searchTerm]);
  return (
    <div className="relative w-full p-3 rounded-[10px] flex items-center pe-5">
      <SearchIcon />
      <input
        className="w-full bg-transparent outline-none ms-3 "
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
      {value && (
        <FontAwesomeIcon
          icon={faClose}
          className="cursor-pointer"
          onClick={() => {
            setValue("");
            action("");
          }}
        />
      )}
    </div>
  );
};
