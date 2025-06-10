/**
 * This Component is for the Custom Input
 * Especially for the Authentication Input
 * such as
 * Email
 * Name
 * Password(set the Show/Hide the password)
 */

import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AuthInput = ({
  placeholder,
  password,
  value,
  handleChange,
  name,
  error,
  type,
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex items-center px-5 rounded-xl border-[1px] border-gray-200/20 w-full mt-3">
        <input
          className="w-full bg-transparent outline-none my-5"
          type={type && !show ? type : "text"}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            handleChange(event, name);
          }}
        />
        {type == "password" && (
          <FontAwesomeIcon
            icon={!show ? faEye : faEyeSlash}
            className="hover:bg-gray-300/30 cursor-pointer rounded-full p-3"
            onClick={() => {
              setShow(!show);
            }}
          />
        )}
      </div>
      {error && <div className="self-start text-red-500">{error}</div>}
    </>
  );
};
