const initialState = {
  keyword: '',
  metaData: []
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_KEYWORD":
      return {
        ...state,
        keyword: action.payload.keyword
      };
      break;
    case "LOAD_METADATA":
      return {
        ...state,
        metaData: action.payload
      };
      break;
    default:
      return state;
  }
};

export default commonReducer;
