const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const storage = admin.storage();
exports.app = functions.region("asia-northeast1").https.onRequest(app);
var cockE = {}
cockE["마티니"] = "martini.jpeg";
cockE["예거밤"] = "yaga.jpeg";

app.get("/CockTail/:id", async (request, response) => {
  try {

    const id = request.params.id;
    if (!id) throw new Error("칵테일id를 입력해라");
    const user = await db
      .collection("CockTail")
      .doc(id)
      .get();
    if (!user.exists) {
      throw new Error("칵테일id 없다.");
    }
    
    const filename = cockE[id];
    const options = {
    version:"v2",
    action: 'read',
    expires: Date.now() + 1000*60*60,
    };

    const [url] = await storage
    .bucket()
    .file(filename)
    .getSignedUrl(options);


    response.json({
      id: user.id,
      data: user.data(),
      img: url
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/CockTail", async (request, response) => {
  try {
    const userQuerySnapshot = await db.collection("CockTail").get();
    const users = [];
    userQuerySnapshot.forEach(doc => {
      users.push({
        id: doc.id,
        data: doc.data()
      });
    });
    response.json(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/Recipe/:id", async (request, response) => {
  try {
    const id = request.params.id;
    if (!id) throw new Error("레시피 id를 입력해라");
    const user = await db
      .collection("Recipe")
      .doc(id)
      .get();
    if (!user.exists) {
      throw new Error("레시피 없다.");
    }
    response.json({
      id: user.id,
      data: user.data()
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

