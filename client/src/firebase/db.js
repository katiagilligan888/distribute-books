
import { db } from './firebase';

export const doCreateUser = (userid, username, email, temple, city) =>
  db.settings({
    timestampsInSnapshots: true
  }); 
  db.collection('users').doc(userid).add({
    username: username,
    email: email, 
    temple: temple, 
    city: city
  });  

export const doCreateBook  = (id, date, distributionType, numberDistributors, books) => 
    db.ref(`book-distributions/${id}/${date}`).set({
        id,
        date, 
        distributionType, 
        numberDistributors,
        books
    }); 

export const onceGetDistributions = () => 
    db.ref(`book-distributions`).once('value'); 