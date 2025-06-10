/**
 * This is for the Chat Item
 * This can have the several Message Items
 *
 */
import { forwardRef } from "react";
import { MessageItem } from "./message_item";
export const ChatItem = forwardRef(
  ({ name, messages, admin, user, selectedMessage }, ref) => {
    return (
      <div
        className={`flex max-w-[80%] mb-3 ${
          admin == user._id ? "flex-row-reverse self-end" : "self-start"
        }`}
      >
        <div className="flex items-end">
          <div
            className={`rounded-[15px] p-2 me-[10px] relative min-w-[60px] w-[60px] h-[60px] flex items-center justify-center ${
              user._id == admin ? "bg-[#fee6a8]" : "bg-[#2cb9f1]"
            }`}
          >
            <img src={user.pic} />
          </div>
        </div>
        <div className="flex flex-col items-baseline">
          {messages.map((item, index) => (
            <div
              key={index + "_chatitem"}
              ref={(el) => (ref.current[item.id] = el)}
            >
              <MessageItem
                id={item.id}
                name={name}
                content={item.content}
                first={index === 0}
                last={index === messages.length - 1}
                time={item.time}
                user={user}
                admin={admin}
                state={item.status}
                files={item.file}
                active={selectedMessage == item.id}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
