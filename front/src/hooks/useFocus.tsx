import { useEffect } from "react";

const useFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
    const focus = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
      useEffect(() => {
        focus()
      }, []);

    return focus;
};
export default useFocus;
  