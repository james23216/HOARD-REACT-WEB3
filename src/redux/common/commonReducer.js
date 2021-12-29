const initialState = {
  keyword: '',
  walletAddress: ''
};

const commonReducer = (state = initialState, action) => { console.log("action.payload", action.payload);
  switch (action.type) { 
    case "SAVE_KEYWORD":
      return {
        ...state,
        keyword: action.payload.keyword,
        walletAddress: action.payload.walletAddress
      };
    default:
      return state;
  }
};

export default commonReducer;
