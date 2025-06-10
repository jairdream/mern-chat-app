import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserIcon } from "../../components/icons/user_icon";
import { ProductItem } from "../../components/details/product_item";
import { useSelector } from "react-redux";
import { ProductMenu } from "../../components/details/product_menu";

export const DetailPage = ({ children }) => {
  const selectedUser = useSelector((state) => state.auth.selected);
  const histories = useSelector((state) => state.products.histories);
  const auth = useSelector((state) => state.auth.detail);
  return (
    <>
      <div className=" flex-col w-full h-full p-10 pe-3 min-w-[300px]  flex max-[780px]:px-2">
        <div className="flex justify-between w-full ">
          <div className="text-2xl font-bold max-[780px]:ps-3">
            {selectedUser ? selectedUser.name : ""}
          </div>
        </div>
        <div className="flex justify-center mt-10 mb-3 max-[780px]:mt-2">
          <div>
            {selectedUser._id ? (
              <img
                src={selectedUser.pic}
                className="rounded-full bg-[#ffcda3] p-3 h-[150px] w-[150px] max-[780px]:w-[80px] max-[780px]:h-[80px]"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {children}
        <div className="grow overflow-auto px-2 mt-3">
          {histories.map((history) => (
            <ProductItem
              key={history._id}
              name={history.product.name}
              price={history.product.price}
              date={history.buyAt}
              amount={history.amount}
            />
          ))}
        </div>
        {auth.isAdmin && (
          <div className="flex flex-col mb-3">
            <ProductMenu />
          </div>
        )}
      </div>
    </>
  );
};
