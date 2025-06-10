import { useEffect, useState } from "react";
import { AuthButton } from "../../components/auth/auth_button";
import { AuthInput } from "../../components/auth/auth_input";
import { Divider } from "../../components/nav/divider";
import { SocialButton } from "../../components/auth/social_button";
import { VerificationCodeInput } from "../../components/auth/verificatioin_code_input";
import { register } from "../../core/actions/auth_action";
import { useNavigate } from "react-router-dom";
import { confirmErrorType } from "../../core/errorConfig";
import { createChannel } from "../../core/actions/channel_actions";

export const Register = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (event, name) => {
    setCredential({ ...credential, [name]: event.target.value });
  };

  const handleRegister = async () => {
    try {
      const result = await register(credential);
      if (result.status === 201) {
        navigate("/verify");
        console.log(result);
        // createChannel();
      }
    } catch (e) {
      setError(confirmErrorType(e.response.data.message, credential));
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="max-[500px]:h-full w-[500px] h-auto pb-10 p-10 border-2 border-gray-100/20 shadow-[0px_0px_5px_#ffffff] rounded-[20px] backdrop-blur-md flex flex-col items-center">
        <div className="uppercase my-3 text-4xl font-[900]">Register</div>
        <div className="text-2xl font-extrabold mb-3">
          Welcome To{" "}
          <span className="animate-color-change text-3xl">TRUST REALIFY</span>
        </div>

        <AuthInput
          placeholder={"UserName"}
          name={"name"}
          handleChange={handleChange}
          error={error.name}
        />
        <AuthInput
          placeholder={"Email"}
          name={"email"}
          type={"email"}
          error={error.email}
          handleChange={handleChange}
        />
        <AuthInput
          placeholder={"Password"}
          type={"password"}
          name={"password"}
          error={error.password}
          handleChange={handleChange}
        />
        <AuthInput
          placeholder={"Confirm Password"}
          type={"password"}
          name={"confirm"}
          error={error.confirm}
          handleChange={handleChange}
        />
        <AuthButton
          label={"Register"}
          action={() => {
            handleRegister();
          }}
        />
        <Divider />
        <SocialButton label={"Sign Up With Google"} />
        <div className="mt-5 ">
          Have already an account.
          <span
            className="ms-2 font-bold cursor-pointer text-orange-400 underline hover:text-blue-50 transition-all ease-in-out duration-300"
            onClick={() => {
              navigate("/");
            }}
          >
            login
          </span>
        </div>
      </div>
    </div>
  );
};
