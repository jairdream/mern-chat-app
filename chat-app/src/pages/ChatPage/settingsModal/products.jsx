import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomerItem } from "../../../components/settings/customer_item";
import { ProductInput } from "../../../components/settings/product_input";
import { ProductItem } from "../../../components/settings/product_item";
import { useEffect, useState } from "react";
import {
  cancelProduct,
  createProduct,
  deleteProduct,
  getProducts,
  saveProduct,
} from "../../../core/actions/product_action";
import { useDispatch, useSelector } from "react-redux";
import { UPDATING_PRODUCT } from "../../../core/reducers/productSlice";
export const Products = ({ onBack }) => {
  const dispatch = useDispatch();
  const productLists = useSelector((state) => state.products.lists);
  const updatingProduct = useSelector((state) => state.products.updating);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
  });
  const handleChange = (event, name) => {
    setNewProduct({ ...newProduct, [name]: event.target.value });
  };
  const handleCreateProduct = () => {
    if (!newProduct.name.length > 0 || newProduct.price <= 0) return;
    createProduct(dispatch, newProduct);
  };
  const handleDeleteProduct = (id) => {
    deleteProduct(dispatch, id);
  };
  const handleUpdateProduct = (id) => {
    dispatch(UPDATING_PRODUCT({ id }));
  };
  const handleSaveProduct = () => {
    saveProduct(dispatch, updatingProduct._id, newProduct);
  };
  const handleCancelUpdate = () => {
    cancelProduct(dispatch);
  };

  useEffect(() => {
    if (updatingProduct) {
      setNewProduct({
        name: updatingProduct.name,
        price: updatingProduct.price,
      });
    }
  }, [updatingProduct]);
  return (
    <div className=" flex flex-col p-[20px_20px_20px_20px] overflow-auto bg-[#252933] rounded-[10px] h-full   min-w-[300px] w-[550px]  max-[780px]:w-full max-[780px]:h-full">
      <div className="flex items-center mb-7">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="cursor-pointer"
          onClick={onBack}
        />
        <div className="ms-5">Products</div>
      </div>
      <div className="mt-4">
        <ProductInput
          label={"Product Name"}
          value={newProduct.name}
          action={handleChange}
        />
        <ProductInput
          label={"Product Price"}
          type={"number"}
          value={newProduct.price}
          action={handleChange}
        />
        <div className="flex justify-around w-full">
          {!updatingProduct ? (
            <div
              className="bg-[#5ac41d] min-w-[100px] text-center rounded-[5px] p-2 mt-2 text-xl font-bold hover:bg-white hover:text-[#5ac41d] cursor-pointer"
              onClick={handleCreateProduct}
            >
              Add
            </div>
          ) : (
            <>
              <div
                className="bg-[#5ac41d] min-w-[100px] text-center rounded-[5px] p-2 mt-2 text-xl font-bold hover:bg-white hover:text-[#5ac41d] cursor-pointer"
                onClick={handleSaveProduct}
              >
                Save
              </div>
              <div
                className="bg-[#c41d1d] min-w-[100px] text-center rounded-[5px] p-2 mt-2 text-xl font-bold hover:bg-white hover:text-[#c41d1d] cursor-pointer"
                onClick={handleCancelUpdate}
              >
                Cancel
              </div>
            </>
          )}
        </div>
      </div>
      <div className="border-b-[1px] w-full border-[#ffffff90] my-4"></div>
      {productLists.map((product) => (
        <ProductItem
          id={product._id}
          name={product.name}
          price={product.price}
          onDelete={handleDeleteProduct}
          onUpdate={handleUpdateProduct}
        />
      ))}
    </div>
  );
};
