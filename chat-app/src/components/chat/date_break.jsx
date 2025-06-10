export const DateBreak = ({ date }) => {
  return (
    <div className="relative flex justify-center  my-5">
      <div className="w-full border-b-[1px] border-dashed border-[#ffffff55] mx-3"></div>

      <div className="absolute -top-[15px] text-[20px] bg-[#202329] px-5 text-[#ffffff55]">
        {date}
      </div>
    </div>
  );
};
