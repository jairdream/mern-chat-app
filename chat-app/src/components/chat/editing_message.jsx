import { faClose, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { CANCEL_UPDATE } from "../../core/reducers/messageSlice";

export const EditingMessage = ({ content, handleClick }) => {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(CANCEL_UPDATE());
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between w-full shadow-[0px_0px_3px] shadow-white cursor-pointer rounded-lg p-3 hover:shadow-[0px_0px_10px] mb-3 transition-all ease-in-out duration-300"
    >
      <div className="flex items-center">
        <FontAwesomeIcon icon={faReply} fontSize={15} />
        <div className="ms-3">{content}</div>
      </div>
      <div
        className="rounded-full w-[25px] h-[25px] me-3 cursor-pointer hover:border-[1px] flex justify-center items-center"
        onClick={handleCancel}
      >
        <FontAwesomeIcon icon={faClose} className="" />
      </div>
    </div>
  );
};
