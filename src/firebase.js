// import { initializeApp } from "firebase/app";
// import { getAuth } from "@firebase/auth";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDsOkQkkBu-tpnu2aOt7xg0rCBqqUDESbk",
//   authDomain: "student-dashborad.firebaseapp.com",
//   projectId: "student-dashborad",
//   storageBucket: "student-dashborad",
//   messagingSenderId: "119134121946",
//   appId: "1:119134121946:web:69d35b43f2faf8ee045ae3",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);
// const database = getDatabase();
// export { db, auth, storage, database };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDsOkQkkBu-tpnu2aOt7xg0rCBqqUDESbk",
  authDomain: "student-dashborad.firebaseapp.com",
  projectId: "student-dashborad",
  storageBucket: "student-dashborad",
  messagingSenderId: "119134121946",
  appId: "1:119134121946:web:69d35b43f2faf8ee045ae3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { db, auth, storage, database };
