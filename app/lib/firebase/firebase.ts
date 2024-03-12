import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
//confing of frebase
};

const app = initializeApp(firebaseConfig);

export const auths =  getAuth(app)

export const db = getFirestore(app)