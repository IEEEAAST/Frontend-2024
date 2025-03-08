import { Timestamp } from "firebase/firestore";
import { storage } from "./config";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

export default async function addStorageMultiple(files, slug) {
    const uploadPromises = files.map(async (file) => {
        const storageRef = ref(
            storage,
            `${slug}/${Timestamp.now().nanoseconds}${Timestamp.now().seconds}` +
                "-" +
                file.name
        );
        let link = "";
        let error = "";
        await uploadBytes(storageRef, file)
            .then(async (snapshot) => {
                await getDownloadURL(snapshot.ref).then((downloadURL) => {
                    link = downloadURL;
                });
            })
            .catch((err) => {
                error = err.message;
            });

        return { link, error };
    });

    return Promise.all(uploadPromises);
}
