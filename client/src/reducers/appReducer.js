const initialState = {
  fetchingGivers: false,
  givers: [],
  daysUntil: "",
  fetchingUsers: false,
  users: [],
  fetchingScores: false,
  totalScore: 0,
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
    case "FETCHING_USERS": 
      return {
        ...state,
        fetchingUsers: true
      };
    case "FETCHED_USERS":
      return {
      ...state,
      users: action.payload
      };
    case 'FETCHING_SCORES':
      return {
        ...state,
        fetchingScores: true
      }
    case 'FETCHED_SCORES':
      return {
        ...state,
        totalScore: action.payload
      }
    default:
      return state;
  }
};
