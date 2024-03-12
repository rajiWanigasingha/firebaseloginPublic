"use server";

import { db } from "../firebase/firebase";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
var randomstring = require("randomstring");

export async function addData(body: any, title: any, uid: any) {
  const colectionid = randomstring.generate();

  const userRef = doc(db, "usercomments", `${colectionid}`);

  await setDoc(userRef, {
    uid: uid,
    title: title,
    body: body,
    createAt: serverTimestamp(),
  });
}

// export async function getData(uid: any){
//   const q = query(collection(db, "usercomments"), where("uid", "==", uid));

//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }
