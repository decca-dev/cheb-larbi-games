import { useState, useEffect, useRef } from "react";

export function useActive(time: number) {
  const [active, setActive] = useState(false);
  const timer = useRef<any>();
  const events = [
    "keypress",
    "mousemove",
    "touchmove",
    "click",
    "touchstart",
    "scroll",
  ];

  useEffect(() => {
    const handleEvent = () => {
      setActive(true);
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setActive(false);
      }, time);
    };
    events.forEach((event) => {
      document.addEventListener(event, () => handleEvent);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleEvent);
      });
    };
  }, [time]);

  return active;
}
