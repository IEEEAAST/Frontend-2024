import { getAuth, updatePassword } from "firebase/auth";

export async function setNewPassword(user, newPassword) {
  await updatePassword(user, newPassword).then(() => {
    console.log("password updated successfully to: " + newPassword);
  }).catch(e => {
    console.log("Error updating password: " + e.message);
  })
}
