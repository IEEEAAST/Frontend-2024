import { app, db } from "./config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export default async function deleteDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        await deleteDoc(docRef);
        result = `Document with ID ${id} deleted successfully.`;
    } catch (e) {
        error = e;
    }

    return { result, error };
}
