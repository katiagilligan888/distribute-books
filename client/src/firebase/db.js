
import { db } from './firebase';
const BOOK_DISTRIBUTIONS = 'book-distributions';
const BOOK_SCORES = 'book-scores';
const USERS = 'users';

export const doCreateUser = (userid, username, email, temple, city) => {
  return db.collection(USERS).doc(userid).set({
    username: username,
    email: email, 
    temple: temple, 
    city: city
  });
}
 

export const doCreateBook  = (userid, epochDate, humanDate, distributionType, numberDistributors, books) =>  {
  let userRef = db.collection(BOOK_DISTRIBUTIONS).doc(userid);
  let finalNode = db.collection(BOOK_DISTRIBUTIONS).doc(userRef.id).collection(epochDate).doc();
  return finalNode.set({
      userId: userid, 
      epochDate: epochDate, 
      date: humanDate,
      distributionType: distributionType, 
      numberDistributors: numberDistributors, 
      books: books
  });
}

export const doCreateBookScore = (userid, epochDate, humanDate, distributionType, numberDistributors, books) => {
  let bookCount = books.map((book) => {
    return parseInt(book.number);
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  return db.collection(BOOK_SCORES).add({
    userId: userid, 
    epochDate: epochDate, 
    date: humanDate,
    distributionType: distributionType, 
    numberDistributors: numberDistributors, 
    books: books,
    bookCount: bookCount
  });
}
