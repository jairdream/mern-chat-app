import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { baseURL, urls } from "../../utils/config";
import { useEffect, useState } from "react";
import { changeStatus, editMessage } from "../../core/actions/message_actions";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../core/socket";
import { stateList } from "./state";
import { CustomContextMenu } from "../context_menu";
export const MessageItem = ({
  id,
  content,
  last,
  time,
  user,
  admin,
  state,
  files,
  active,
}) => {
  const dispatch = useDispatch();
  const { readMessage } = useSocket();
  const editingmessage = useSelector((state) => state.messages.editing);

  const [contextMenuVisible, setContenxtMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (id && user != admin && state != 0) {
      changeStatus(dispatch, id, 0);
      readMessage(user, id);
    }
  }, [id]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    setContenxtMenuVisible(true);
  };

  const handleEdit = () => {
    editMessage(dispatch, id);
  };
  return (
    <>
      {contextMenuVisible && (
        <CustomContextMenu
          onClose={() => {
            setContenxtMenuVisible(false);
          }}
          handleClick={handleEdit}
          menuPosition={menuPosition}
        />
      )}
      <div
        className={`flex flex-col mb-1 rounded-[20px] p-1 px-3 min-[1200px]:p-2 min-[1200px]:px-10 h-auto w-auto relative ${
          admin == user._id
            ? "self-end bg-[#945aed] me-5"
            : " bg-[#2e343d] ms-3"
        } ${
          active || editingmessage.id == id
            ? "shadow-[0px_0px_15px] shadow-gray-10"
            : ""
        }`}
        onContextMenu={handleContextMenu}
      >
        {files?.map((file, index) =>
          file.type.includes("image") ? (
            <div
              className="z-[1] flex w-full my-3 justify-center group relative cursor-pointer"
              key={`ImageItem` + index}
            >
              <img
                className="rounded-xl "
                src={`${baseURL}/${file.path.replaceAll("\\", "/")}`}
              />
              <a
                className="flex justify-center items-center w-full h-full absolute top-0 left-0 cursor-pointer backdrop-blur-sm rounded-[20px] group-hover:z-[100] z-[-1] transition-all ease-in-out duration-300"
                href={`${baseURL}${urls.file_download}${file._id}`}
                download
              >
                <FontAwesomeIcon icon={faDownload} fontSize={50} />
              </a>
            </div>
          ) : (
            <div
              className="z-[1] flex w-full my-3 justify-center group relative cursor-pointer items-center"
              key={`FileItem` + index}
            >
              <FontAwesomeIcon icon={faFileArchive} fontSize={30} />
              <div className="text-xl ms-3">{file.name}</div>
              <a
                className="flex justify-center items-center w-full h-full absolute top-0 left-0 cursor-pointer backdrop-blur-sm  group-hover:visible invisible transition-all ease-in-out duration-300"
                href={`${baseURL}${urls.file_download}${file._id}`}
                download
              >
                <FontAwesomeIcon icon={faDownload} fontSize={30} />
              </a>
            </div>
          )
        )}
        <div
          className="z-[1]"
          dangerouslySetInnerHTML={{
            __html: content.replaceAll("\n", "<br/>"),
          }}
        ></div>
        <div className="flex justify-between w-full">
          <div></div>
          <div
            className={`${
              admin == user._id ? "" : "text-[#ffffff80]"
            } flex z-[1] items-center`}
          >
            {user._id == admin && (
              <div className="me-3">{stateList[state]}</div>
            )}
            <div>{time}</div>
          </div>
        </div>
        {last && (
          <div
            className={`${
              admin == user._id
                ? "bg-[#945aed] right-[5px] skew-x-[45deg]"
                : "bg-[#2e343d] left-[5px] -skew-x-[45deg]"
            } w-[40px] h-[40px] absolute bottom-0  z-[0] `}
          ></div>
        )}
      </div>
    </>
  );
};
