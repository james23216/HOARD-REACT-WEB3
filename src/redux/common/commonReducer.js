const initialState = {
  keyword: '',
  walletAddress: '',
  metaData: [],
  isLoadingMetaData: false,
  isSearching: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "SAVE_KEYWORD":
      return {
        ...state,
        keyword: action.payload.keyword,
        walletAddress: action.payload.walletAddress
      };
      break;
    case "START_LOAD_METADATA":
      return {
        ...state,
        isLoadingMetaData: true
      };
      break;
    case "LOAD_METADATA":
      return {
        ...state,
        metaData: action.payload,
        isLoadingMetaData: false
      };
      break;
    case "DO_SEARCH":
      return {
        ...state,
        isSearching: action.payload
      };
      break;
    default:
      return state;
  }
};

export default commonReducer;
