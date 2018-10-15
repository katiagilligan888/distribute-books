
import { db } from './firebase';

export const doCreateUser = (id, username, email, temple, city) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    temple, 
    city
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

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