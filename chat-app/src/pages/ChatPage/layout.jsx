import { MenuItem } from "../../components/nav/menu_item";
import { DetailPage } from "./detail_page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../core/actions/auth_action";
import { NavBar } from "../navBar";
import { assetsURLFormatter } from "../../utils/formmaters";
import { useEffect, useState } from "react";
import { getHistories, getProducts } from "../../core/actions/product_action";
import { useDispatch, useSelector } from "react-redux";

export const Layout = (props) => {
  const { children } = props;
  const selectedUser = useSelector((state) => state.auth.selected);
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  useEffect(() => {
    if (selectedUser._id) getHistories(dispatch, selectedUser._id);
  }, [selectedUser]);

  return (
    <div className="bg-black flex h-[100vh]">
      <div className="w-[100px] flex flex-col items-center justify-between pt-5 max-[780px]:hidden">
        <div className="relative cursor-pointer">
          <img
            src={assetsURLFormatter("logo.png")}
            width={65}
            className="cursor-pionter hover:scale-110 transition-all ease-in-out duration-300"
          />
        </div>
        <NavBar />
        <div className="w-full px-2 mb-5">
          <MenuItem
            label={""}
            icon={
              <FontAwesomeIcon icon={faSignOut} size="lg" className="my-3" />
            }
            action={logout}
          />
        </div>
      </div>
      {children}
      <div
        className="z-[101] max-[1200px]:flex hidden fixed right-5 top-5 w-[50px] h-[50px] hover:bg-[#ffffff30] cursor-pointer justify-center items-center rounded-full"
        onClick={() => {
          setShowDetail(!showDetail);
        }}
      >
        {!showDetail ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faClose} />
        )}
      </div>
      <div
        className={`fixed  h-full right-0 transition-all z-[100] overflow-auto py-5 ${
          showDetail ? "" : "translate-x-[500px]"
        } ease-in-out duration-300 bg-black`}
      >
        <DetailPage>
          <div className="hidden flex-col items-center justify-between pt-5 max-[780px]:flex">
            <NavBar />
            <div className="w-full px-2 mb-5 max-[780px]:mb-1">
              <MenuItem
                label={"Sign Out"}
                icon={
                  <FontAwesomeIcon
                    icon={faSignOut}
                    size="lg"
                    className="my-3 max-[780px]:my-0"
                  />
                }
                action={logout}
              />
            </div>
          </div>
        </DetailPage>
      </div>
      <div className=" min-[1200px]:block hidden bg-black">
        <DetailPage />
      </div>
    </div>
  );
};
