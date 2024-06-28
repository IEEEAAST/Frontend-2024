import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";
export default async function getCollection(collectionName) {

    const colRef = collection(db, collectionName);

    const querySnapshot = await getDocs(colRef);

    let dataRes = [];
    let dataIDs = [];

    let result = null;
    let error = null;
    let ids = null;

    try {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            dataRes.push(doc.data());
            dataIDs.push(doc.id);
        });
        result = dataRes;
        ids = dataIDs;
    } catch (e) {
        error = e;
    }

    return { result, error, ids };
}