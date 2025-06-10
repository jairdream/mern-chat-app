import React, { useEffect, useRef, useState } from "react";
import { SearchInput } from "../../components/chat/search_input";
import { SearchIcon } from "../../components/icons/search_icon";
import { UserItem } from "../../components/chat/user_item";
import { CustomIconButton } from "../../components/custom_icon_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faFile,
  faPaperPlane,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { ChatItem } from "../../components/chat/chat_item";
import { DateBreak } from "../../components/chat/date_break";
import AutoResizingTextarea from "../../components/chat/autoResized_input";
import { SelectedFileItem } from "../../components/chat/selected_file_item";
import { TypingStatus } from "../../components/chat/typing_status";
import { SearchUserItem } from "../../components/chat/search_user_item";
import { useChatHandlers } from "./chat_handlers";
import { EditingMessage } from "../../components/chat/editing_message";
import { assetsURLFormatter } from "../../utils/formmaters";

export const ChatPage = () => {
  const [showUsers, setShowUsers] = useState(false);
  const {
    files,
    isTyping,
    messages,
    content,
    auth,
    selectedChannel,
    selectedUser,
    histories,
    searchedUsers,
    messageRefs,
    tryDrop,
    users,
    clickedSEARCH_USER,
    editingMessage,
    setContent,
    setTypingStatus,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleSearch,
    handleClickChannel,
    handleClickSearchedChannel,
    handleChangeAssetsFile,
    handleDeleteFile,
    handleClickSendMsg,
    handlePaste,
    handleClickEditingMessage,
  } = useChatHandlers(setShowUsers);

  //=====================================================================
  return (
    <div className="relative grow min-[1200px]:rounded-[20px] max-[1200px]:rounded-[20px_0px_0px_20px] bg-[#202329] flex ">
      {tryDrop && (
        <div
          className="fixed w-[100vw] h-[100vh] top-0 left-0 backdrop-blur-lg z-[10000] flex flex-col items-center justify-center"
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <FontAwesomeIcon icon={faFile} fontSize={150} />
          <div className="mt-2 text-4xl font-extrabold shadow-lg">
            Drag & Drop your files here
          </div>
        </div>
      )}
      <div
        className={`${
          showUsers ? "" : "max-[780px]:-translate-x-full"
        } transition-all ease-in-out duration-300 max-[780px]:fixed max-[780px]:w-full z-[100] relative flex min-[1200px]:w-[33%] min-[1000px]:w-[27%] h-full  flex-col items-centerpr-3 p-[20px_10px_20px_20px] bg-[#252933] rounded-tl-[20px] rounded-bl-[20px]`}
      >
        <div className="px-1 w-full  mb-8 rounded-xl  bg-[#435374] scrollbar max-[780px]:w-[89%]">
          <SearchInput action={handleSearch} />
        </div>
        <div className=" overflow-auto h-full  pr-2">
          {searchedUsers.length == 0 &&
            users.map((channel) => {
              return (
                <UserItem
                  key={channel._id}
                  auth={auth}
                  channel={channel}
                  value={selectedChannel}
                  onClick={handleClickChannel}
                />
              );
            })}
          {searchedUsers.map((message) => {
            return (
              <SearchUserItem
                key={message._id}
                auth={auth}
                message={message}
                value={clickedSEARCH_USER}
                onClick={handleClickSearchedChannel}
              />
            );
          })}
        </div>
      </div>
      <div className="relative grow flex flex-col w-[70%] p-[20px_20px_20px_20px]">
        <div className="flex w-full justify-between mb-1">
          <div className="flex flex-col">
            <div className="text-2xl font-bold flex items-center">
              <div className="relative cursor-pointer me-3">
                <img
                  src={assetsURLFormatter("logo.png")}
                  width={65}
                  className="cursor-pionter hover:scale-110 transition-all ease-in-out duration-300 max-[780px]:block hidden"
                  onClick={() => {
                    setShowUsers(true);
                  }}
                />
              </div>
              {selectedUser?.name}
            </div>
            {isTyping ? (
              <div className="flex items-center text-[#ffffff88]">
                <div className="ms-[18px] me-[30px] flex">
                  <TypingStatus />
                </div>
                <span>typing</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="relative scrollbar grow ms-1 pt-3 flex flex-col overflow-auto"
          onDragEnter={handleDragEnter}
        >
          {histories?.map((history, index) =>
            history.isDateBreaker ? (
              <DateBreak key={"ChatItem" + index} date={history.date} />
            ) : (
              <ChatItem
                key={"ChatItem" + index}
                name={history.name}
                messages={history.chat}
                admin={auth._id}
                user={history.user}
                ref={messageRefs}
                selectedMessage={clickedSEARCH_USER}
              />
            )
          )}
        </div>
        <div className="py-4 flex items-end px-10">
          <label htmlFor="assets">
            <CustomIconButton icon={<FontAwesomeIcon icon={faPlus} />} />
          </label>
          <input
            type="file"
            id="assets"
            hidden
            multiple
            onChange={handleChangeAssetsFile}
          />
          <div
            className="grow bg-gray-500/50 pt-2 px-4 rounded-md"
            onPaste={handlePaste}
          >
            {editingMessage.content && (
              <EditingMessage
                content={editingMessage.content}
                handleClick={handleClickEditingMessage}
              />
            )}
            <div className="grid grid-cols-3 justify-around">
              {files.length > 0 &&
                files.map((file) => (
                  <SelectedFileItem
                    key={file.name}
                    name={file.name}
                    type={file.type}
                    deleteFile={(name) => {
                      handleDeleteFile(name);
                    }}
                  />
                ))}
            </div>
            <AutoResizingTextarea
              value={content}
              handleChange={setContent}
              handleTypingStatus={setTypingStatus}
              isTyping={isTyping}
              onSend={() => {
                handleClickSendMsg();
              }}
            />
          </div>
          <CustomIconButton
            icon={<FontAwesomeIcon icon={faPaperPlane} />}
            onClick={() => handleClickSendMsg()}
            disable={content == "" && files.length == 0}
          />
        </div>
      </div>
    </div>
  );
};
