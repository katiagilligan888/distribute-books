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

// export const setGiverNumber = () => {
//     let givers = []
//     firebase.firestore().collection('givers').onSnapshot(snapshot => {
//         snapshot.forEach((doc) => {
//             givers.push(doc.data())
//         })
//     })
//     return {
//         type: 'GIVERS_NUMBER_QUERY',
//         payload: givers.length
//     }
// }
