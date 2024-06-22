import { app } from "./config";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(app);
export function SignOut() {

  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
