import { useState } from "react";

const useFlip = (initialFlipState = true) => {
  const [state, setState] = useState(initialFlipState);
  const toggleState = () => {
    setState((state) => !state);
  };

  return [state, toggleState];
};

export default useFlip;
