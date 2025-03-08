import { doc, setDoc, getDoc } from "@firebase/firestore";
import { db } from "./config";

export async function ensureUserFieldExist(userId) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.data().bookmarks) {
    await setDoc(
      userRef,
      {
        bookmarks: {
          articles: [],
        },
      },
      { merge: true }
    );
  }
}
