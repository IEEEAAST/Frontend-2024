import { db } from "./config";
import { setDoc, doc } from "firebase/firestore";

export default async function setData(collectionName, data, docId) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collectionName, docId), data);
  } catch (e) {
    error = e.message;
  }

  return { result, error };
}
