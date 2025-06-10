import { faArrowDown, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductInput } from "../settings/product_input";
import { createHistory } from "../../core/actions/product_action";

export const ProductMenu = () => {
  const products = useSelector((state) => state.products.lists);
  const selectedUser = useSelector((state) => state.auth.selected);

  const dispatch = useDispatch();

  const [addHistory, setAddHistory] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({
    name: "Select Product",
    price: 0,
    id: null,
    amount: 0,
  });
  const handleClick = (product) => {
    setValue({
      name: product.name,
      price: product.price,
      id: product._id,
      amount: 0,
    });
    setVisible(false);
  };
  const handleSaveHistory = () => {
    if (value.id && value.amount)
      createHistory(dispatch, value, selectedUser?._id);
    setAddHistory(!addHistory);
  };
  return (
    <>
      {addHistory && (
        <>
          <div className="flex relative w-full flex-col">
            <div
              className="w-full rounded-[5px] p-3 bg-transparent border-[1px] flex justify-between items-center hover:bg-[#2a579bb6] cursor-pointer mb-2"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              <div>{value.name}</div>
              <FontAwesomeIcon icon={faSortDown} />
            </div>
            {visible && (
              <>
                <div
                  className="w-[100vw] h-[100vh] top-0 left-0 fixed"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                ></div>
                <div className="absolute bottom-12 right-0 backdrop-blur-md rounded-md shadow-[0px_0px_10px] py-3 max-h-[500px] overflow-auto">
                  {products.map((product) => (
                    <div
                      className="px-5 py-2 hover:bg-[#ffffff30] cursor-pointer"
                      onClick={() => {
                        handleClick(product);
                      }}
                    >
                      {product.name}
                    </div>
                  ))}
                  <div className="px-5 py-2 hover:bg-[#ffffff30] cursor-pointer flex justify-center">
                    + Add New Product
                  </div>
                </div>
              </>
            )}
          </div>

          <ProductInput
            label={"Price"}
            type={"number"}
            value={value.price}
            disable={true}
            action={(e, name) => {
              setValue({ ...value, [name]: e.target.value });
            }}
          />
          <ProductInput
            label={"Amount"}
            type={"number"}
            value={value.amount}
            disable={false}
            action={(e, name) => {
              setValue({ ...value, [name]: e.target.value });
            }}
          />
        </>
      )}
      <div className="flex justify-around w-full">
        {!addHistory ? (
          <div
            className="bg-[#5ac41d] min-w-[200px] text-center rounded-[5px] p-2 mt-2 text-xl font-bold hover:bg-white hover:text-[#5ac41d] cursor-pointer"
            onClick={() => {
              setAddHistory(!addHistory);
            }}
          >
            + Add Product
          </div>
        ) : (
          <>
            <div
              className="bg-[#5ac41d] min-w-[100px] text-center rounded-[5px] p-2 mt-2 text-xl font-bold hover:bg-white hover:text-[#5ac41d] cursor-pointer"
              onClick={() => {
                handleSaveHistory();
              }}
            >
              Save
            </div>
            <div
              className="bg-[#c41d1d] min-w-[100px] text-center rounded-[5px] p-2 mt-2 text-xl font-bold hover:bg-white hover:text-[#c41d1d] cursor-pointer"
              onClick={() => setAddHistory(!addHistory)}
            >
              Cancel
            </div>
          </>
        )}
      </div>
    </>
  );
};
