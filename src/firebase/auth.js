import { app } from "../firebase/config";
import { getAuth } from "firebase/auth";


export default  function  getUser(){
    const auth =  getAuth(app);
    return  auth.currentUser;
}
