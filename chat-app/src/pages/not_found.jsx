export const NotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
        <div className="font-extrabold text-7xl">404</div>
        <div className="text-3xl my-2">Oops! Page not found</div>
        <div className="text-3xl">
          Please Redirect to the{" "}
          <span className="underline hover:text-lime-400 cursor-pointer">
            Home Page
          </span>
        </div>
      </div>
    </>
  );
};
