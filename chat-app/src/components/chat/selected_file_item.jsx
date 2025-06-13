import { faClose, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SelectedFileItem = ({ name, type, deleteFile }) => {
  return (
    <div className="p-3 pe-1 rounded-lg  border-[1px] flex items-center max-w-[200px] mb-3">
      <FontAwesomeIcon icon={faNoteSticky} />
      <div className="ms-2 grow truncate">{name}</div>
      <div
        className="ms-1 cursor-pointer box-border hover:border-[1px] rounded-full w-[30px] h-[30px] flex justify-center items-center p-2"
        onClick={() => {
          deleteFile(name);
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
    </div>
  );
};
