import { useSelector } from "react-redux";
import { baseURL } from "../../../utils/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { StarIcon } from "../../../components/icons/star_icon";
import { StarIconOutlined } from "../../../components/icons/start_icon_outlined";

export const Account = ({ onBack }) => {
  const auth = useSelector((state) => state.auth.detail);
  return (
    <div className=" flex flex-col p-[20px_20px_20px_20px] overflow-auto bg-[#252933] rounded-[10px] h-full   min-w-[300px] max-w-[550px] w-full  max-[780px]:w-full max-[780px]:h-full">
      <div className="flex items-center mb-7">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="cursor-pointer"
          onClick={onBack}
        />
        <div className="ms-5">My Account</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] h-[100px] rounded-full p-5 flex justify-center items-center bg-[#22b9ff]">
          <img src={`${auth.pic}`} className="rounded-full" />
        </div>
        <div className="ms-5 text-3xl font-semibold">
          <div>{auth.name}</div>
          <div>{auth.email}</div>
        </div>
      </div>
      <div className="mt-5 uppercase font-bold text-xl">current Rate</div>
      <div className="flex mt-3">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIconOutlined />
        <div className="ms-5">Bought 20 products</div>
      </div>
      <div className="mt-5 uppercase font-bold text-xl">History</div>
      <div className="overflow-auto grow"></div>
      <div className="flex justify-around">
        <div className="min-w-[150px] rounded-md bg-[#0592ca] text-center p-2 font-bold text-xl cursor-pointer">
          Edit
        </div>
        <div className="min-w-[150px] rounded-md bg-[#b63232] text-center p-2 font-bold text-xl cursor-pointer">
          Delete
        </div>
      </div>
    </div>
  );
};
