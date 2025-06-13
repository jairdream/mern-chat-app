/**
 * Return customized input element
 * This is for the chat input
 * If User click Enter or Ctrl Enter
 * then the input will increase it's height
 *
 */
import { useRef, useEffect } from "react";

const AutoResizingTextarea = ({
  value,
  handleChange,
  handleTypingStatus,
  isTyping,
  onSend,
}) => {
  const textareaRef = useRef(null);

  const handleInput = (event) => {
    handleChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
      onSend();
      return;
    }
    if (event.key === "Enter" && (event.shiftKey || event.ctrlKey)) {
      event.preventDefault(); // Prevent default action
      handleChange((prev) => prev + "\n"); // Add a new line
    }

    handleTypingStatus(true);
    let lastTypingTime = new Date().getTime();
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= 3000 && isTyping) handleTypingStatus(false);
    }, 3000);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [value]); // Update height when value changes

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onInput={handleInput}
      rows={1}
      onKeyDown={handleKeyDown}
      className="w-full outline-none pb-3 min-h-[30px] max-h-[200px] resize-none overflow-y-auto bg-transparent flex items-end"
      placeholder="Type here..."
    />
  );
};

export default AutoResizingTextarea;
