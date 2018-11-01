const initialState = {
  fetchingGivers: false,
  givers: [],
  daysUntil: "",
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "DAYS_UNTIL":
      return {
        ...state,
        daysUntil: action.payload
      };
    case "FETCHING_GIVERS":
      return {
        ...state,
        fetchingGivers: true
      };
    case "FETCHED_GIVERS":
      return {
        ...state,
        fetchingGivers: false,
        givers: action.payload
      };
    case "ERROR":
      return {
        ...state,
        fetchingGivers: false,
        errors: action.payload
      };
    default:
      return state;
  }
};
