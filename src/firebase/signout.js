import { app, auth } from "./config";
import { signOut, getAuth } from "firebase/auth";

export default function SignOut() {

  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
