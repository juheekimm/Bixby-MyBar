const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.app = functions.https.onRequest(app);
app.get("/single/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const user = await db
      .collection("CockTail")
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
    let isMatch = false;
    userQuerySnapshot.forEach(doc => {
      if (doc.id == id) {
        match.push(doc.id);
        match.push(doc.data());
        isMatch = true;
      } else if (doc.id.includes(id)) {
        a.push(doc.id);
        b.push(doc.data());
      }
    });

    if (isMatch) {
      matchs.push({
        id: match[0],
        data: match[1]
      });
    }

    for (var i = 0; i < a.length; i++) {
      users.push({
        id: a[i],
        data: b[i]
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

app.get("/category/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const userQuerySnapshot = await db.collection("CockTail").get();
    const users = [];
    const a = [];
    const b = [];

    userQuerySnapshot.forEach(doc => {
      if (doc.data().isbase == false) {
        if (doc.data().category.includes(id)) {
          a.push(doc.id);
          b.push(doc.data());
        }
      }
    });
    for (var i = 0; i < a.length; i++) {
      users.push({
        id: a[i],
        data: b[i]
      });
    }
    response.json(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
const cateList = [];
app.get("/categoryList", async (request, response) => {
  try {
    if (cateList.length == 0) {
      const userQuerySnapshot = await db.collection("CockTail").get();
      const category = [];
      const x = [[], [], [], [], [], [], [], []];
      const y = [];
      userQuerySnapshot.forEach(doc => {
        if (doc.data().majorCategory.includes()) {
          x[0].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes()) {
          x[1].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes()) {
          x[2].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes()) {
          x[3].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes()) {
          x[4].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes()) {
          x[5].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes()) {
          x[6].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes()) {
          x[7].push({
            id: doc.id,
            data: doc.data()
          });
        }
      });
      for (var i = 0; i < 8; i++) {
        cateList.push({
          id: category[i],
          data: x[i],
          img: y[i]
        });
      }
    }
    response.json(cateList);
  } catch (error) {
    response.status(500).send(error);
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
    response.status(500).send(error);
  }
});

app.get("/similar/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const user = await db
      .collection("CockTail")
      .doc(id)
      .get();
    const users = [];
    const base = Number(user.data().abv);
    const userQuerySnapshot = await db.collection("CockTail").get();
    userQuerySnapshot.forEach(doc => {
      if (
        Number(doc.data().abv) >= base - 5 &&
        Number(doc.data().abv) <= base + 5
      ) {
        users.push({
          id: doc.id,
          data: doc.data()
        });
      }
    });

    response.json(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/abv/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const users = [];
    if (id == "a") {
      const userQuerySnapshot = await db.collection("CockTail").get();
      userQuerySnapshot.forEach(doc => {
        if (Number(doc.data().abv) <= 15) {
          users.push({
            id: doc.id,
            data: doc.data()
          });
        }
      });
    } else if (id == "b") {
      if (Number(doc.data().abv) > 15 && Number(doc.data().abv) < 30) {
        users.push({
          id: doc.id,
          data: doc.data()
        });
      }
    } else if (id == "c") {
      if (Number(doc.data().abv) >= 30) {
        users.push({
          id: doc.id,
          data: doc.data()
        });
      }
    }
    response.json(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/searchAll", async (request, response) => {
  try {
    const a = [];
    const userQuerySnapshot = await db.collection("CockTail").get();
    userQuerySnapshot.forEach(doc => {
      a.push(doc.id);
    });
    response.json(a);
  } catch (error) {
    response.status(500).send(error);
  }
});

const bar = {};
bar["shaker"] =
  "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/shaker.jpg?alt=media&token=f244897a-3571-4dc2-8578-fa0924bced6b";
bar["strainer"] =
  "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/strainer.jpg?alt=media&token=626639a1-31b0-455d-a401-ba267c8b520f";
bar["barspoon"] =
  "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/barspoon.jpg?alt=media&token=87ccb2be-efd3-4b08-82e2-67241ac119aa";
bar["muddler"] =
  "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/muddler.jpg?alt=media&token=df46b995-df03-435e-b2a7-7fbd6b3741ff";
bar["sieve"] =
  "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/sieve.jpg?alt=media&token=29a0b7d3-5309-420b-9b92-09522fb3c419";
bar["blender"] =
  "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/blender.jpg?alt=media&token=6cefbd83-f70c-4650-9a2d-50a0e95fcf5e";
const me = {};
me["shaker"] =
  "쉐이커를 이용해 내용물을 흔들어 섞어주세요(숟가락으로 많이 저어주세요)";
me["strainer"] = "(스트레이너를 이용해) 얼음을 빼고 부어주세요";
me["barspoon"] = "바스푼(숟가락)을 이용해 내용물을 잘 저어주세요";
me["muddler"] = "머들러(숟가락)를 이용해 내용물을 충분히 으깨주세요";
me["sieve"] = "뜰체를 이용해 걸러주세요";
me["blender"] = "믹서기로 내용물을 갈아주세요";

//  추가
// app.get("/add", async (request, response) => {
//   try {

//     response.json({
//       success: "ok"
//     });
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });
