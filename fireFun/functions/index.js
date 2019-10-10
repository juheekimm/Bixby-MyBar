const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const storage = admin.storage();
exports.app = functions.region("asia-northeast1").https.onRequest(app);
const format = ".jpg";
const options = {
  version: "v2",
  action: "read",
  expires: Date.now() + 1000 * 60 * 60
};

app.get("/single/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const user = await db
      .collection("CockTail")
      .doc(id)
      .get();

    const filename = user.data().imageName + format;
    const [url] = await storage
      .bucket()
      .file(filename)
      .getSignedUrl(options);

    response.json({
      id: user.id,
      data: user.data(),
      img: url
    });
  } catch (error) {
    response.status.send(error);
  }
});

app.get("/search/:id",async (request,response) => {
 try{
    const id = request.params.id;
    const userQuerySnapshot = await db.collection("CockTail").get();
    const match = [];
    const matchs = [];
    const users = [];
    const a = [];
    const b = [];
    const c = [];
    let isMatch = false;
    userQuerySnapshot.forEach(doc => {
       
        if(doc.id == id){
            match.push(doc.id);
            match.push(doc.data());
            match.push(doc.data().imageName);
            isMatch = true;
        }else if (doc.id.includes(id)) {
            a.push(doc.id);
            b.push(doc.data());
            c.push(doc.data().imageName);
      }

    });
    
    if(isMatch){
      const filename = match[2] + format;
      const [url] = await storage
        .bucket()
        .file(filename)
        .getSignedUrl(options);
      matchs.push({
          id : match[0],
          data: match[1],
          img : url
      })
    }

    for (var i = 0; i < a.length; i++) {
      const filename = c[i] + format;
      const [url] = await storage
        .bucket()
        .file(filename)
        .getSignedUrl(options);
      users.push({
        id: a[i],
        data: b[i],
        img: url
      });
    }
    
    response.json({
        match : matchs,
        other : users
    });
 }catch(error){
    response.send(error);
 }
});

app.get("/like/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const userQuerySnapshot = await db.collection("CockTail").get();
    const users = [];
    const a = [];
    const b = [];
    const c = [];

    userQuerySnapshot.forEach(doc => {
      if (doc.id.includes(id)) {
        a.push(doc.id);
        b.push(doc.data());
        c.push(doc.data().imageName);
      }
    });

    for (var i = 0; i < a.length; i++) {
      const filename = c[i] + format;
      const [url] = await storage
        .bucket()
        .file(filename)
        .getSignedUrl(options);
      users.push({
        id: a[i],
        data: b[i],
        img: url
      });
    }

    response.json(users);
  } catch (error) {
    response.status.send(error);
  }
});

app.get("/category/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const userQuerySnapshot = await db.collection("CockTail").get();
    const users = [];
    const a = [];
    const b = [];
    const c = [];

    userQuerySnapshot.forEach(doc => {
      if (doc.category.includes(id)) {
        a.push(doc.id);
        b.push(doc.data());
        c.push(doc.data().imageName);
      }
    });

    for (var i = 0; i < a.length; i++) {
      const filename = c[i] + format;
      const [url] = await storage
        .bucket()
        .file(filename)
        .getSignedUrl(options);

      users.push({
        id: a[i],
        data: b[i],
        img: url
      });
    }

    response.json(users);
  } catch (error) {
    response.status.send(error);
  }
});

app.get("/recipe/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const user = await db
      .collection("Recipe")
      .doc(id)
      .get();

    response.json({
      id: user.id,
      data: user.data()
    });
  } catch (error) {
    response.status.send(error);
  }
});

app.get("/add", async (request, response) => {
      try {
        //    let data = {
        //     name : 'Black Russian(블랙 러시안)',
        //     category : '"단", "달콤한", "달달한"',
        //     abv : '37',
        //     imageName : 'blackrussian',
        //     description : '좋은 커피향과 풍미로 인기이는 칵테일이다. 커피 리큐어에는 구애받지 않지만, 리큐어에 따라 미묘하게 맛이 변화하므로, 맛의 차이와 기호를 알아두는 것이 좋다ㅏ.',
        //     isbase : false,
        //     material : '보드카, 커피 리큐어',
        //     subMaterial : '얼음'
        // }
        // let setDoc = db.collection('CockTail').doc('블랙러시안').set(data);
        response.json({
            success : ok
        })
      } catch (error) {
        response.status(500).send(error);
      }
    });
