const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const storage = admin.storage();
exports.app = functions.https.onRequest(app);
const format = ".jpg";
const options = {
  version: "v2",
  action: "read",
  expires: Date.now() + 1000 * 60 *60 *60
};
//단독 검색
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
    response.status(500).send(error);
  }
});
//리스트 검색 
app.get("/search/:id", async (request, response) => {
  try {
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
      if (doc.id == id) {
        match.push(doc.id);
        match.push(doc.data());
        match.push(doc.data().imageName);
        isMatch = true;
      } else if (doc.id.includes(id)) {
        a.push(doc.id);
        b.push(doc.data());
        c.push(doc.data().imageName);
      }
    });

    if (isMatch) {
      const filename = match[2] + format;
      const [url] = await storage
        .bucket()
        .file(filename)
        .getSignedUrl(options);
      matchs.push({
        id: match[0],
        data: match[1],
        img: url
      });
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
      match: matchs,
      other: users
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});
// 이름(포함)검색
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
    response.status(500).send(error);
  }
});
//  태깅 검색
app.get("/category/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const userQuerySnapshot = await db.collection("CockTail").get();
    const users = [];
    const a = [];
    const b = [];
    const c = [];
    
    userQuerySnapshot.forEach(doc => {
      if (doc.data().isbase == "false") {
        if (doc.data().category.includes(id)) {
          a.push(doc.id);
          b.push(doc.data());
          c.push(doc.data().imageName);
        }
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
    response.status(500).send(error);
  }
});
//레시피 검색
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
    response.status(500).send(error);
  }
});
//  추가
// app.get("/add", async (request, response) => {
//   try {
//      let data = {
//       name : 'Kahlua Milk(깔루아 밀크)',
//       category : '',
//       abv : '35',
//       imageName : 'kahluamilk',
//       description : '',
//       isbase : false,
//       material : '깔루아, 우유',
//       subMaterial : '얼음, 코코아가루'
//     }
//     let setDoc = db.collection('CockTail').doc('깔루아밀크').set(data);
//     data = {
//       name : 'Manhattan(맨하탄)',
//       category : '붉은',
//       abv : '32',
//       imageName : 'manhattan',
//       description : '"마티니"와 함께 칵테일의 왕자로, 파티나 연회에서 빼놓을 수 없는 위스키 베이스 칵테일이다.',
//       isbase : false,
//       material : '라이 위스키, 앙고스투라 비터, 스위트 베르무트',
//       subMaterial : '얼음'
//   }
//   setDoc = db.collection('CockTail').doc('맨하탄').set(data);
//     // data = {
//     //   capacity : '70',  
//     //   cockware : '바스푼(젓가락)',
//     //   material : '깔루아 ml, 우유 ml',
//     //   method :  '부드럽게 저어준다.',
//     //   name : 'Kahlua Milk(깔루아 밀크)',
//     //   steps : '', 
//     //   subMaterial : '얼음, 코코아가루'
//     // }
//     // setDoc = db.collection('Recipe').doc('깔루아밀크').set(data);

//     response.json({
//       success: "ok"
//     });
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });
