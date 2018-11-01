import moment from "moment";
import firebase from "firebase";
require("firebase/firestore");

export const setDaysUntil = () => {
  const todaysDate = moment();
  const eventDate = moment("2019-01-01");
  const daysUntil = eventDate.diff(todaysDate, "days");
  console.log(daysUntil);
  console.log(typeof daysUntil);
  return {
    type: "DAYS_UNTIL",
    payload: daysUntil
  };
};

export const fetchingGivers = () => {
  const request = firebase
    .firestore()
    .collection("givers")
    .get();
  return dispatch => {
    dispatch({ type: "FETCHING_GIVERS" });
    request
      .then(querySnapshot => {
        dispatch({
          type: "FETCHED_GIVERS",
          payload: querySnapshot.docs.length
        });
        console.log(querySnapshot.docs.length);
      })
      .catch(err => {
        dispatch({ type: "ERROR", payload: err });
      });
  };
};
