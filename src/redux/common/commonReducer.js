const initialState = {
  keyword: ''
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_KEYWORD":
      return {
        ...state,
        keyword: action.payload.keyword
      };
    default:
      return state;
  }
};

export default commonReducer;
