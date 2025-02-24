import { db } from "./config";
import { collection, onSnapshot } from "firebase/firestore";

export default function subscribeToCollection(collectionName, callback) {
  const colRef = collection(db, collectionName);

  // Subscribe to the collection
  const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
    let dataRes = [];
    let dataIds = [];

    querySnapshot.forEach((doc) => {
      dataRes.push(doc.data());
      dataIds.push(doc.id);
    });

    // Call the callback with the updated results and IDs
    callback({ result: dataRes, ids: dataIds, error: null });
  }, (error) => {
    // Handle errors
    callback({ result: null, ids: null, error });
  });

  // Return unsubscribe function
  return unsubscribe;
}
