import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomerItem } from "../../../components/settings/customer_item";

export const Customers = ({ onBack }) => {
  return (
    <div className=" flex flex-col p-[20px_20px_20px_20px] overflow-auto bg-[#252933] rounded-[10px] h-full   min-w-[300px] w-[550px]  max-[780px]:w-full max-[780px]:h-full">
      <div className="flex items-center mb-7">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="cursor-pointer"
          onClick={onBack}
        />
        <div className="ms-5">Customers</div>
      </div>
      <div className="mt-4">
        <CustomerItem />
        <CustomerItem />
        <CustomerItem />
      </div>
      <div className="border-b-[1px] w-full border-[#ffffff90] my-4"></div>
      <CustomerItem />
      <CustomerItem />
      <CustomerItem />
      <CustomerItem />
    </div>
  );
};
