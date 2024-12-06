import * as admin from "firebase-admin";
import { GoogleAuthProvider } from "firebase/auth";
import { firebase } from "googleapis/build/src/apis/firebase";
export async function from_firebase() { 
    const serviceAccount = require("../wshs-helpdesk-logging-firebase-adminsdk-kdevr-3d9c0bc756.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://wshs-helpdesk-logging-default-rtdb.firebaseio.com",
    });
    
    const db = admin.database();
    const users = await db.ref("users").get();
    return users;
}