export const CustomIconButton = ({ icon, onClick, disable }) => {
  return (
    <div
      onClick={() => {
        if (!disable) onClick();
      }}
      className="p-3 rounded-full cursor-pointer hover:bg-[#ffffff22] ms-2 h-[50px] w-[50px] flex justify-center items-center"
    >
      {icon}
    </div>
  );
};
