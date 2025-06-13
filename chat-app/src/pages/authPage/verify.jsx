import { useEffect, useRef, useState } from "react";
import { AuthButton } from "../../components/auth/auth_button";
import { AuthInput } from "../../components/auth/auth_input";
import { Divider } from "../../components/nav/divider";
import { SocialButton } from "../../components/auth/social_button";
import { VerificationCodeInput } from "../../components/auth/verificatioin_code_input";
import {
  register,
  resendVerificationCode,
  verify,
} from "../../core/actions/auth_action";
import { useNavigate } from "react-router-dom";
import { confirmErrorType } from "../../core/errorConfig";
import { createChannel } from "../../core/actions/channel_actions";

export const Verify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(5).fill(""));
  const [helper, setHelper] = useState({
    error: "",
    helper:
      "Please Confirm the Verification Code \n If you can't find the Verificaiton Email, Please find in the Spam folder",
  });

  const inputRefs = useRef([]);

  const handleChange = (event, index) => {
    setCode([
      ...code.map((_, i) => (i == index ? event.target.value : code[i])),
    ]);
    if (event.target.value) {
      if (index == 4) inputRefs.current[0].focus();
      else inputRefs.current[index + 1].focus();
    } else {
      if (index == 0) inputRefs.current[4].focus();
      else inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = async (event) => {
    try {
      const verificationCodes = await navigator.clipboard.readText();
      const codes = verificationCodes.split("");
      setCode(codes.slice(0, 5));
      inputRefs.current[4].focus();
    } catch (e) {
      console.log(e);
    }
  };

  const handleVerify = async () => {
    try {
      const result = await verify(code.join(""));
      if (result.status === 200) {
        createChannel();
        navigate("/login");
      }
    } catch (e) {
      // setError(confirmErrorType(e.response.data.message, credential));
      console.log(e);
      setHelper({
        ...helper,
        error: e.message?.includes(403) ? "Invalid Verification Code" : "",
      });
    }
  };

  const handleResend = async () => {
    resendVerificationCode();
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="max-[500px]:h-full w-[500px] h-auto pb-10 p-10 border-2 border-gray-100/20 shadow-[0px_0px_5px_#ffffff] rounded-[20px] backdrop-blur-md flex flex-col items-center">
        <div className="uppercase my-3 text-4xl font-[900]">Confirm</div>
        <div className="text-2xl font-extrabold mb-3">
          Please Confirm Your Account
        </div>
        <div className="flex w-full justify-between">
          {new Array(5).fill("").map((_, index) => (
            <VerificationCodeInput
              key={"Verify" + index}
              index={index}
              ref={inputRefs}
              value={code[index]}
              onChange={handleChange}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className="self-start text-red-500">{helper.error}</div>
        {!helper.error && (
          <div className="self-start text-[#258cd1]">{helper.helper}</div>
        )}
        <AuthButton label={"Verify"} action={handleVerify} />

        <Divider />

        <div className="mt-5 ">
          Didn't Get the Code.
          <span
            className="ms-2 font-bold cursor-pointer text-orange-400 underline hover:text-blue-50 transition-all ease-in-out duration-300"
            onClick={() => {
              handleResend();
            }}
          >
            Resend
          </span>
        </div>
      </div>
    </div>
  );
};
