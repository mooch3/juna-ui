import { useEffect, RefObject } from "react";

type Handler = (event: MouseEvent) => void;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | null,
  callback: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref && (!ref.current || ref.current.contains(event.target as Node))) {
        return;
      }
      callback(event);
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, callback]);
};
