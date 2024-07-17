import { getAuth, updatePassword } from "firebase/auth";

const auth = getAuth();

const user = auth.currentUser;


export async function setNewPassword(newPassword) {
    await updatePassword(user, newPassword).then(() => {
        console.log("password updated successfully to: " + newPassword);
    }).catch(e => {
        console.log("Error updating password: " + e.message);
    })}
