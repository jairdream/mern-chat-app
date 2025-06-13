import { faBucket, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, timeDifference } from "../../utils/formmaters";

export const ProductItem = ({ name, date, amount, price }) => {
  return (
    <div className="flex mt-3 hover:bg-[#ffffff40] p-3 rounded-[20px] cursor-pointer group max-[780px]:rounded-[5px]">
      <div className="grow flex items-center">
        <div
          className={`rounded-[15px] p-2 me-[10px] relative min-w-[60px]  h-[60px] flex items-center justify-center bg-[#4fac68]`}
        >
          <FontAwesomeIcon icon={faBucket} fontSize={"30px"} />
        </div>
        <div className="max-w-[60%] min-w-[50%] truncate font-[400] text-[20px] group-hover:underline max-[780px]:text-[15px]">
          {name}
          <div className="flex flex-col items-start text-[#ffffff99]">
            <div>{timeDifference(date, true)}</div>
            <div>
              ${price}&nbsp;
              <FontAwesomeIcon icon={faClose} />
              &nbsp;{amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
