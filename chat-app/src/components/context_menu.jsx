import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CustomContextMenu = ({ onClose, menuPosition, handleClick }) => {
  const handleOptionClick = () => {
    handleClick();
    onClose();
  };
  return (
    <div
      onClick={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed z-[1000] top-0 left-0 w-[100vw] h-[100vh] bg-transparent"
    >
      <div
        className="context-menu absolute backdrop-blur-sm py-1 rounded-[5px] shadow-[0px_0px_5px] shadow-white min-w-[200px]"
        style={{ left: menuPosition.x, top: menuPosition.y }}
      >
        <ul>
          <li
            onClick={() => handleOptionClick("Option 1")}
            className="flex items-center cursor-pointer px-5 hover:bg-[#2b416e]/50 py-3"
          >
            <FontAwesomeIcon icon={faEdit} />
            <span className="ms-2">Edit</span>
          </li>
          <li
            onClick={() => handleOptionClick("Option 2")}
            className="flex items-center cursor-pointer px-5 hover:bg-[#2b416e]/50 py-3"
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="ms-2">Delete</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
