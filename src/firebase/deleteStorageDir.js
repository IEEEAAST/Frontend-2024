import { ref, listAll, deleteObject } from "firebase/storage";
import { storage } from "./config";

export default async function deleteStorageDir(dirPath) {
    const dirRef = ref(storage, dirPath);
    let success = true;
    let error = "";

    try {
        const listResult = await listAll(dirRef);
        const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
        await Promise.all(deletePromises);
    } catch (err) {
        success = false;
        error = err.message;
    }

    return { success, error };
}
