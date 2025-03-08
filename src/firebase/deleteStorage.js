import { ref, deleteObject } from "firebase/storage";
import { storage } from "./config";

export default async function deleteStorage(filePath) {
    const storageRef = ref(storage, filePath);
    let success = false;
    let error = "";

    await deleteObject(storageRef).then(() => {
        success = true;
    }).catch((err) => {
        error = err.message;
    });

    return { success, error };
}
