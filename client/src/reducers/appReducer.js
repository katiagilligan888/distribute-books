const initialState = {
  giverNum: "",
  daysUntil: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "DAYS_UNTIL":
        return Object.assign({}, state, {giverNum: action.payload})
    // case "GIVERS_NUMBER_QUERY":
    //     return Object.assign({}, state, {daysUntil: action.payload})
    default:
      return state;
  }
};
