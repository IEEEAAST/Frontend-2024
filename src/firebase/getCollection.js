import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";
export default async function getCollection(collectionName) {

    const colRef = collection(db, collectionName);

    const querySnapshot = await getDocs(colRef);

    let dataRes = [];

    let result = null;
    let error = null;

    try {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            dataRes.push(doc.data());
        });
        result = dataRes;
    } catch (e) {
        error = e;
    }

    return { result, error };
}