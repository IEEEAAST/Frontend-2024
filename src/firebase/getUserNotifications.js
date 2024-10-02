import { db } from "./config";
import { collection, getDocs, where, query } from "firebase/firestore";

export default async function getUserNotifications(email) {
    const colRef = collection(db, "users"); // Adjust to your users collection

    const q = query(colRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let notifications = [];

    querySnapshot.forEach((doc) => {
        // Check if the notifications field exists and is an array
        notifications = doc.data().notifications || [];
    });

    return notifications;
}
