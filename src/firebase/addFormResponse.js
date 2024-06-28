import { db } from "./config";
import {
  updateDoc,
  collection,
  where,
  query,
  arrayUnion,
  getDocs,
  doc,
  Timestamp,
} from "firebase/firestore";

export default async function addFormResponse(
  collectionName,
  data,
  whereField,
  condition,
  whereValue
) {
  let result = null;
  let error = null;

  const q = query(
    collection(db, collectionName),
    where(whereField, condition, whereValue)
  );
  const querySnapshot = await getDocs(q);

  try {
    querySnapshot.forEach(async (element) => {
      // Update the document here
      // console.log(doc.data());
      const docRef = doc(db, collectionName, element.id);
      result = await updateDoc(docRef, {
        responses: arrayUnion(...[{data, "created_time": Timestamp.now()}]),
      });
    });
  } catch (e) {
    error = e.message;
  }

  return { result, error };
}
