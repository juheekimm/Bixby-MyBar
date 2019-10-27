const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.app = functions.https.onRequest(app);
const values = require("./values");

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
    console.log("single error");
    response.status(500).send("single error" +error);
  }
});

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
    console.log("search error");
    response.status(500).send("search error"+error);
  }
});

app.get("/category/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const userQuerySnapshot = await db.collection("CockTail").get();
    const users = [];

    userQuerySnapshot.forEach(doc => {
      if (doc.data().isbase == false) {
        if (doc.data().category.includes(id)) {
          users.push({
            id: doc.id,
            data: doc.data()
          });
        }
      }
    });
    response.json(users);
  } catch (error) {
    console.log("category error ");
    response.status(500).send("category error "+error);
  }
});

const cateList = [];
const x = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
app.get("/categoryList", async (request, response) => {
  try {
    if (cateList.length == 0) {
      const userQuerySnapshot = await db.collection("CockTail").get();

      userQuerySnapshot.forEach(doc => {
        if (doc.data().majorCategory == null)  return;
        if (doc.data().majorCategory.includes('초간단')) {
          x[0].push({
            id: doc.id,
            data: doc.data()
          });
        } 
        if (doc.data().majorCategory.includes('폭탄주')) {
          x[1].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('신기')) {
          x[2].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('혼술')) {
          x[3].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('입문자')) {
          x[4].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('파티에서')) {
          x[5].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('무알콜')) {
          x[6].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('외로운')) {
          x[7].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('비오는')) {
          x[8].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('취하고')) {
          x[9].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('청량한')) {
          x[10].push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (doc.data().majorCategory.includes('베스트')) {
          x[11].push({
            id: doc.id,
            data: doc.data()
          });
        }
      });

      for (var i = 0; i < 12; i++) {
        cateList.push({
          id: values.ids[i],
          name : values.category[i],
          img: values.img[i],
          desc : values.desc[i]
        });
      }
    }
    response.json(cateList);
  } catch (error) {
    console.log("categorylist error ");
    response.status(500).send("categorylist error "+error);
  }
});

app.get("/categorySearch/:id",async(request,response) =>{
  try {
    const id = request.params.id;
    console.log(id);
    let go =[];
    if (id.match('초간단')) {
      go.push({
        id:id,
        data :x[0]
      })
    } else if (id.match('폭탄주')) {
      go.push({
        id:id,
        data :x[1]
      })
    } else if (id.match('신기')) {
      go.push({
        id:id,
        data :x[2]
      })
    }else if (id.match('혼술')) {
      go.push({
        id:id,
        data :x[3]
      })
    } else if (id.match('입문자')) {
      go.push({
        id:id,
        data :x[4]
      })
    } else if (id.match('파티에서')) {
      go.push({
        id:id,
        data :x[5]
      })
    } else if (id.match('무알콜')) {
      go.push({
        id:id,
        data :x[6]
      })
    } else if (id.match('외로운')) {
      go.push({
        id:id,
        data :x[7]
      })
    } else if (id.match('비오는')) {
      go.push({
        id:id,
        data :x[8]
      })
    }  else if (id.match('취하고')) {
      go.push({
        id:id,
        data :x[9]
      })
    }else if (id.match('청량한')) {
      go.push({
        id:id,
        data :x[10]
      })
    }else if (id.match('베스트')) {
      go.push({
        id:id,
        data :x[11]
      })
    }
    console.log(go);
    response.json(go);
  } catch (error) {
    console.log("categorysearch error ");
      response.status(500).send("categorysearch error "+error);
  }
})

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
    console.log("recipe error");
    response.status(500).send("recipe error"+error);
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
      if (doc.data().majorCategory == null)  return;
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
    console.log("similar error");
    response.status(500).send("similar error"+error);
  }
});

app.get("/abvsearch/:id/:level" , async (requset, response) =>{
try {
  const target = requset.params.id;
  const level = requset.params.level;

  const user = [];
  const userQuerySnapshot = await db.collection("CockTail").get();

  if (level == "a") {
    userQuerySnapshot.forEach(doc => {
      if (doc.data().majorCategory == null)  return;
      if (Number(doc.data().abv) <= target) {
        user.push({
          id: doc.id,
          data: doc.data()
        });
      }
    });
  } else if (level == "b") {
    userQuerySnapshot.forEach(doc => {
      if (doc.data().majorCategory == null)  return;
      if (Number(doc.data().abv) > (target-5) && Number(doc.data().abv) < (target+5)) {
        user.push({
          id: doc.id,
          data: doc.data()
        });
      }
    });
  } else if (level == "c") {
      userQuerySnapshot.forEach(doc => {
      if (doc.data().majorCategory == null)  return;
      if (Number(doc.data().abv) >= target) {
        user.push({
          id: doc.id,
          data: doc.data()
        });
      }
    });
  }
  response.json(user);
  
} catch (error) {
  console.log("abvsearch eroor");
  response.status(500).send("abvsearch error" + error);
}
});

app.get("/abv/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const users = [];
    const userQuerySnapshot = await db.collection("CockTail").get();
    if (id == "a") {
      userQuerySnapshot.forEach(doc => {
        if (doc.data().majorCategory == null)  return;
        if (Number(doc.data().abv) <= 15) {
          users.push({
            id: doc.id,
            data: doc.data()
          });
        }
      });
    } else if (id == "b") {
      userQuerySnapshot.forEach(doc => {
        if (doc.data().majorCategory == null)  return;
        if (Number(doc.data().abv) > 15 && Number(doc.data().abv) < 30) {
          users.push({
            id: doc.id,
            data: doc.data()
          });
        }
      });
    } else if (id == "c") {
        userQuerySnapshot.forEach(doc => {
          if (doc.data().majorCategory == null)  return;
        if (Number(doc.data().abv) >= 30) {
          users.push({
            id: doc.id,
            data: doc.data()
          });
        }
      });
    }
    response.json(users);
  } catch (error) {
    console.log("abv error");
    response.status(500).send("abv error"+error);
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
    console.log("search all  error");
    response.status(500).send("search all error"+error);
  }
});


// app.get("/add", async (request, response) => {
//   try {
//     let data = {
//       name : 'Irish Coffee(아이리시 커피)',
//       category : '달콤한',
//       abv : '14',
//       imgaeName : 'irishcoffee',
//       description : '가정에서도 간단하게 만들 수 있는 커피와 위스키를 조합한 칵테일로 커피를 진하게 끓이는 것이 요령이다.',
//       isbase : false,
//       material : '아이리시 위스키, 뜨거운 커피, 커피설탕(설탕), 생크림',
//       subMaterial : '레몬, 휘핑크림',
//       iamge : '',
//       majorCategory : '달콤'
//   }
//   let setDoc = db.collection('CockTail').doc('아이리시커피').set(data);
  
//   data = {
//       name : 'Irish Coffee(아이리시 커피)',
//       capacity : '215',
//       cockware : '',
//       method : '',
//       material : '아이리시 위스키15ml, 뜨거운 커피200ml, 커피설탕(설탕), 생크림',
//       subMaterial : '레몬, 휘핑크림',
//       steps : '잔에 뜨거운 커피를 준비합니다.(잔 둘레에 레몬즙을 묻혀주면 풍미가 더 좋습니다.)_아이리시 위스키를 첨가합니다._기호에 맞게 설탕을 넣고 휘핑크림을 올려줍니다.'
//   }
//   setDoc = db.collection('Recipe').doc('아이리시커피').set(data);
  
//     response.json({
//       success: "ok"
//     });
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });
