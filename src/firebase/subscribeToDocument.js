import { app, db } from "./config";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

export default function subscribeToDocument(collection, id, callback) {
  const docRef = doc(db, collection, id);

  // Set up a listener to subscribe to real-time updates
  const unsubscribe = onSnapshot(docRef, 
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback({ result: docSnapshot.data(), error: null });
      } else {
        callback({ result: null, error: new Error("Document does not exist") });
      }
    }, 
    (error) => {
      callback({ result: null, error });
    }
  );

  // Return the unsubscribe function so it can be called to stop listening
  return unsubscribe;
}
