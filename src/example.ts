import { jsonEval } from "@firebase/util";
import { logger, schedules, task, wait } from "@trigger.dev/sdk/v3";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
export const helloWorldTask = schedules.task({
  id: "hello-world",
  cron: "*/1 * * * *",
  run: async (payload: any, { ctx }) => {
    const serviceAccount = require("../wshs-helpdesk-logging-firebase-adminsdk-kdevr-3d9c0bc756.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://wshs-helpdesk-logging-default-rtdb.firebaseio.com",
    });

    const db = admin.database();
    const ref = db.ref("users");

    let snapshot = await ref.once("value");
    // await wait.for({ seconds: 5 });
    let user_data: any;
    let clockify_data: any;
    const users = snapshot.toJSON();
    if (users != null) {
      //console.log(users);
      for (let u in users) {
        let user = users[u];
        console.log(user);
        // let x = http.request({
        //   hostname: "developer.clockify.me",
        //   port: 443,
        //   path: `/api/v1/workspaces/${user["workspaceid"]}/user/${user["id"]}/time-entries`,
        //   method: "GET",
        //   headers: {
        //     "X-Api-Key": user["clockify_apikey"],
        //   },
        // }, (cb) => {
        // });
        user_data = await (
          await fetch(`https://api.clockify.me/api/v1/user`, {
            method: "GET",
            headers: {
              "X-Api-key": user["clockify_apikey"],
            },
          })
        ).json();
        console.log(user_data);
        clockify_data = await (
          await fetch(
            `https://api.clockify.me/api/v1/workspaces/${user_data["defaultWorkspace"]}/user/${user_data["id"]}/time-entries`,
            {
              method: "GET",
              headers: {
                "X-Api-key": user["clockify_apikey"],
              },
            },
          )
        ).json();
        console.log(`${clockify_data}`);
        // let u = await admin.auth().getUser("");
      }
    }
    return {
      message: `${clockify_data}`,
    };
  },
});
