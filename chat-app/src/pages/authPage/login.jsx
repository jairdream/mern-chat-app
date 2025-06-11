import { useNavigate } from "react-router-dom";
import { AuthButton } from "../../components/auth/auth_button";
import { AuthInput } from "../../components/auth/auth_input";
import { Divider } from "../../components/nav/divider";
import { SocialButton } from "../../components/auth/social_button";
import { useState } from "react";
import { login } from "../../core/actions/auth_action";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../core/reducers/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [credential, setCredential] = useState({
    email: "",
    passowrd: "",
  });

  const handleChange = (event, name) => {
    setCredential({ ...credential, [name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const result = await login(credential);
      dispatch(SET_AUTH(result));
      navigate("/chat");
    } catch (e) {
      setError("Email or Password is Invalid");
    }
  };
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="max-[500px]:h-full w-[500px] h-auto pb-10 p-10 border-2 border-gray-100/20 shadow-[0px_0px_5px_#ffffff] rounded-[20px] backdrop-blur-md flex flex-col items-center">
        <div className="uppercase my-3 text-4xl font-[900]">Login</div>
        <div className="text-2xl font-extrabold mb-3">
          Welcome To{" "}
          <span className="animate-color-change text-3xl">TRUST REALIFY</span>
        </div>
        <AuthInput
          placeholder={"Name/Email"}
          name={"email"}
          handleChange={handleChange}
        />
        <AuthInput
          placeholder={"Password"}
          type={"password"}
          name={"password"}
          handleChange={handleChange}
        />
        <AuthButton label={"Login"} action={handleLogin} />
        {error && <div className="self-start text-red-500">{error}</div>}
        <Divider />
        <SocialButton label={"Sign In With Google"} />
        <div className="mt-5 ">
          Don't have an account.{" "}
          <span
            className="font-bold cursor-pointer text-orange-400 underline hover:text-blue-50 transition-all ease-in-out duration-300"
            onClick={() => {
              navigate("/register");
            }}
          >
            register
          </span>
        </div>
      </div>
    </div>
  );
};
