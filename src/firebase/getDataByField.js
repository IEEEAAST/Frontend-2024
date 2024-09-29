import { db } from "./config";
import { collection, getDocs, where, query } from "firebase/firestore";

export default async function getDocumentsByField(
  collectionName,
  whereField,
  condition,
  whereValue
) {
  const colRef = collection(db, collectionName);

  const querySnapshot = await getDocs(
    query(colRef, where(whereField, condition, whereValue))
  );

  let dataRes = [];
  let result = null;
  let error = null;

  try {
    querySnapshot.forEach((doc) => {
      // Directly push the data, preserving the Firestore types
      dataRes.push({ id: doc.id, ...doc.data() });
    });
    result = dataRes;
  } catch (e) {
    error = e;
  }

  return { result, error };
}
