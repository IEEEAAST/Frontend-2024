import { db } from "./config";
import { updateDoc, doc, getDoc, deleteField } from "firebase/firestore";

export default async function updateData(collectionName, id, data, fieldsToDelete = []) {
  let error = null;
  let result = null;

  // Prepare the data object to include field deletions
  fieldsToDelete.forEach(field => {
    data[field] = deleteField();
  });

  try {
    await updateDoc(doc(db, collectionName, id), data);
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
    } else {
      error = "Document does not exist";
    }
  } catch (e) {
    error = e.message;
  }

  return { result, error };
}
