const INITIAL_STATE = { face: "(ー_ー)" };

const countReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "HAPPY":
      return { ...state, face: action.payload, bgColor: "green" };
    case "SAD":
      return { ...state, face: action.payload, bgColor: "blue" };
    case "STRESSED":
      return { ...state, face: action.payload, bgColor: "yellow" };
    case "CRYING":
      return { ...state, face: action.payload, bgColor: "red" };
    default:
      return state;
  }
};
