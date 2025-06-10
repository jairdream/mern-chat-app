import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StarIcon } from "../icons/star_icon";
import { StarIconOutlined } from "../icons/start_icon_outlined";
import { UserIcon } from "../icons/user_icon";
import {
  faCartShopping,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export const ProductItem = ({ name, price, id, onDelete, onUpdate }) => {
  return (
    <div className="mb-1 bg-[#ffffff10] p-2 rounded-[10px] hover:bg-[#ffffff30] cursor-pointer flex items-center">
      <div className="w-[50px] h-[50px] bg-[#1cb661] p-1 rounded-[5px] flex items-center justify-center ">
        <FontAwesomeIcon icon={faCartShopping} fontSize={25} />
      </div>
      <div className="ms-3">
        <div>{name}</div>
        <div>{price}$</div>
      </div>
      <div className="grow flex justify-end pe-5">
        <div
          className="w-[30px] h-[30px] p-2 flex items-center justify-center bg-[#9fd327] rounded-lg hover:bg-white group"
          onClick={() => {
            onUpdate(id);
          }}
        >
          <FontAwesomeIcon
            icon={faEdit}
            className="group-hover:text-[#9fd327]"
          />
        </div>
        <div
          className="w-[30px] h-[30px] p-2 flex items-center justify-center bg-[#b61a1a] rounded-lg hover:bg-white group ms-2"
          onClick={() => {
            onDelete(id);
          }}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            className="group-hover:text-[red]"
          />
        </div>
      </div>
    </div>
  );
};
