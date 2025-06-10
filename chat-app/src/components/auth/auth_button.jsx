/**
 *
 * @param {label, action}
 * This is for the Buttons such as Login, Register, Verify Button
 * @returns {React Components}
 */

export const AuthButton = ({ label, action }) => {
  return (
    <div
      className="flex justify-center text-[20px] font-bold w-full p-4 border-[1px] border-gray-500/50 rounded-xl mt-5 cursor-pointer transition-all ease-in-out duration-300 hover:shadow-[0px_0px_10px_white]"
      onClick={() => {
        action();
      }}
    >
      <div>{label}</div>
    </div>
  );
};
