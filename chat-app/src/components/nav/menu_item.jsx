export const MenuItem = ({ label, icon, badge, action, active }) => {
  return (
    <div
      className={`max-[780px]:flex-row max-[780px]:mt-1 max-[780px]:border-[1px] max-[780px]:rounded-[5px] relative flex flex-col items-center p-3 rounded-[10px] cursor-pointer  mt-5 hover:bg-gray-300/20 ${
        active == label && "bg-gray-300/20"
      }`}
      onClick={() => {
        if (!action) return;
        action();
      }}
    >
      {icon}
      <div className="truncate w-[100%] text-center">{label}</div>
      {badge != 0 && badge && (
        <div className="absolute right-0 top-0 bg-[red] h-[20px] w-[20px] rounded-full text-[12px] text-center truncate overflow-hidden whitespace-nowrap px-[3px]">
          {badge}
        </div>
      )}
    </div>
  );
};
