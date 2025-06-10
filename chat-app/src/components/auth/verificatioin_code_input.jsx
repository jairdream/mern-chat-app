/**
 *
 * This is for the Verification code Input
 * Only one character can be inputted
 */

import { forwardRef } from "react";

export const VerificationCodeInput = forwardRef(
  ({ index, onChange, value, onPaste }, ref) => {
    return (
      <div className="p-5 rounded-xl border-[1px] border-gray-500/50">
        <input
          className="w-[25px] bg-transparent text-[20px] outline-none text-center"
          ref={(el) => (ref.current[index] = el)}
          value={value}
          onChange={(event) => {
            onChange(event, index);
          }}
          maxLength={1}
          onPaste={(event) => {
            onPaste(event);
          }}
        />
      </div>
    );
  }
);
