
import { db } from './firebase';


export const doCreateUser = (userid, username, email, temple, city) =>
  db.collection('users').doc(userid).set({
    username: username,
    email: email, 
    temple: temple, 
    city: city
  })
 

export const doCreateBook  = (userid, date, distributionType, numberDistributors, books) => 
  db.collection('user').doc(userid).collection('date').doc(date).collection('eventID').doc().set({
    distributionType: distributionType, 
    numberDistributors: numberDistributors, 
    books: books  
  })

  
