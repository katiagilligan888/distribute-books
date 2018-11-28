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
        let givers = [];
        querySnapshot.forEach((doc) => {
          givers.push(doc.data());
        })
        dispatch({
          type: "FETCHED_GIVERS",
          payload: givers,
        });
      })
      .catch(err => {
        dispatch({ type: "ERROR", payload: err });
      });
  }
};

export const getBookScores = () => {
  const request = firebase.firestore().collection('book-scores').get();
  return dispatch => {
    dispatch({ type: 'FETCHING_SCORES' });
    request.then(querySnapshot => {
      let totalScore = 0;
      querySnapshot.forEach((doc) => {
        totalScore += doc.data().bookCount;
      });
      dispatch({
        type: 'FETCHED_SCORES',
        payload: totalScore,
      })
    }).catch(err => {
      dispatch({ type: "ERROR", payload: err });
    })
  }
}

export const getUsers = () => {
  const request = firebase.firestore().collection('users').get();
  return dispatch => {
    dispatch({ type: 'FETCHING_USERS '});
    request.then(querySnapshot => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      dispatch({
        type: "FETCHED_USERS",
        payload: users,
      })
    }).catch((err) => {
      dispatch({ type: 'ERROR', paylod: err });
    })
  }
}