import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StarIcon } from "../icons/star_icon";
import { StarIconOutlined } from "../icons/start_icon_outlined";
import { UserIcon } from "../icons/user_icon";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const CustomerItem = () => {
  return (
    <div className="mb-1 bg-[#ffffff10] p-2 rounded-[10px] hover:bg-[#ffffff30] cursor-pointer flex items-center">
      <div className="w-[50px] h-[50px] bg-[#1cb661] p-1 rounded-[5px] ">
        <UserIcon />
      </div>
      <div className="ms-3">
        <div>Tyler West</div>
        <div className="flex">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIconOutlined />
          <StarIconOutlined />
        </div>
      </div>
      <div className="grow flex justify-end pe-5">
        <div className="w-[30px] h-[30px] p-2 flex items-center justify-center bg-[#b61a1a] rounded-lg hover:bg-white group">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="group-hover:text-[red]"
          />
        </div>
      </div>
    </div>
  );
};
