export const ProductInput = ({ label, type, value, action, disable }) => {
  const handleChange = (event) => {
    if (label.toLowerCase().includes("name")) {
      action(event, "name");
    } else {
      action(event, label.toLowerCase());
    }
  };
  return (
    <div className="flex w-full items-center mb-2">
      <div className="me-3 text-xl max-w-[50%] min-w-[30%]">{label}:</div>
      <div className="grow p-2 border-[1px] rounded-md">
        <input
          className="w-full bg-transparent outline-none"
          disabled={disable}
          type={type}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
