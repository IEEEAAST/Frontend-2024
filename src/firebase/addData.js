import { db } from "./config";
import { addDoc, collection } from "firebase/firestore";

export default async function addData(collectionName, data) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, collectionName), data);
  } catch (e) {
    error = e.message;
  }

  return { result, error };
}
