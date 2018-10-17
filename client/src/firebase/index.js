//Entry point to Firebase module so components cannot access config directly

import * as auth from './auth'; 
import * as firebase from './firebase'; 

export {
    auth, 
    firebase,
}