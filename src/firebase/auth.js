import { app } from "../firebase/config";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
const user = auth.currentUser;

export default user;
