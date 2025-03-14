import { app, db } from "./config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

/**
 * Gets a document reference through collection name and document id.
 * @param collection The collection where the document is.
 * @param id The id of the document.
 *
 * @returns A document reference. An error happened if 'error' !== null.
 */
export default async function getDocument(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
