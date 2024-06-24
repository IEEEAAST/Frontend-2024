import { db } from "./config";
import { updateDoc, doc } from "firebase/firestore";

export default async function updateData(collectionName, id, data) {
    let result = null;
    let error = null;

    try {
        result = await updateDoc(doc(db, collectionName, id), data);
    } catch (e) {
        error = e.message;
    }

    return { result, error };
}