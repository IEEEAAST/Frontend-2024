import { db } from "./config";
import { collection, where, query, onSnapshot } from "firebase/firestore";

export default function subscribeToDocumentsByField(
  collectionName,
  whereField,
  condition,
  whereValue,
  callback
) {
  const colRef = collection(db, collectionName);

  // Create the query using Firestore's `where` clause
  const q = query(colRef, where(whereField, condition, whereValue));

  // Set up the real-time listener using `onSnapshot`
  const unsubscribe = onSnapshot(q, 
    (querySnapshot) => {
      let dataRes = [];
      querySnapshot.forEach((doc) => {
        // Collect the documents that match the query
        dataRes.push({ id: doc.id, ...doc.data() });
      });
      callback({ result: dataRes, error: null });
    }, 
    (error) => {
      // Handle any errors during the snapshot listener
      callback({ result: null, error });
    }
  );

  // Return the unsubscribe function so it can be used to stop listening
  return unsubscribe;
}
