
import { db } from './firebase';


export const doCreateUser = (userid, username, email, temple, city) =>
  db.collection('users').doc(userid).set({
    username: username,
    email: email, 
    temple: temple, 
    city: city
  })
 

export const doCreateBook  = (userid, epochDate,humanDate, distributionType, numberDistributors,bookNumber, books) => 
  db.collection('distribute-books').doc(userid).collection('date').doc(epochDate).collection('eventID').doc().set({
    bookNumber: bookNumber, 
    userId: userid, 
    epochDate: epochDate, 
    date: humanDate,
    distributionType: distributionType, 
    numberDistributors: numberDistributors, 
    books: books
  })

export const doCreateBookScore = (userid, epochDate, humanDate, distributionType, numberDistributors, books) => 
  db.collection('book-scores').add({
    userId: userid, 
    epochDate: epochDate, 
    date: humanDate,
    distributionType: distributionType, 
    numberDistributors: numberDistributors, 
    books: books 
  })

  
