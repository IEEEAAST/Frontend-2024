import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  appCheckToken: process.env.FIREBASE_APP_CHECK,
};

export const app = initializeApp(firebaseConfig);

// if (typeof window !== "undefined") {
//   if (process.env.NODE_ENV === "development") {
//     // console.log("Development mode");
//     self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
//   }
//   const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider(firebaseConfig.appCheckToken),
//     isTokenAutoRefreshEnabled: true,
//   });
//   getToken(appCheck)
//     .then(() => {
//       console.log("success");
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// }

export const db = getFirestore(app);

export const storage = getStorage(app);
