const initialState = {
  searchOptions: {
    coinType: '',
    wallet: '',
    name: '',
    country: '',
    tokenIdFrom: '',
    tokenIdTo: '',
    yearFrom: '',
    yearTo: '',
    ageFrom: '',
    ageTo: ''
  },
  metaData: [],
  isLoadingMetaData: false,
  isSearching: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "SAVE_KEYWORD":
      let searchOptions = Object.assign({}, state.searchOptions);
      searchOptions[action.payload.key] = action.payload.value;
      
      return {
        ...state,
        searchOptions
      };
      break;
    case "RESET_KEYWORD":
      return {
        ...state,
        searchOptions: {
          coinType: '',
          wallet: '',
          name: '',
          country: '',
          tokenIdFrom: '',
          tokenIdTo: '',
          yearFrom: '',
          yearTo: '',
          ageFrom: '',
          ageTo: ''
        }
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
