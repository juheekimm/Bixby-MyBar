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
    response.status(500).send(error);
  }
});

const cateList = [];

app.get("/categoryList", async (request, response) => {
  try {
    if (cateList.length == 0) {
      const userQuerySnapshot = await db.collection("CockTail").get();
      
      const category= ['집에서도 쉽게! 초간단 칵테일', '술자리 인싸되는 폭탄주 모음', '달콤하게 취하고 싶은 날','우와 이거 좀 신기한데?','유독 혼술이 당기는 날', '입문자 추천 칵테일','파티에서 마시기 좋은', '무알콜 칵테일 모음','외로운 날을 달달하게 만들어주는','비오는 날 마시기 좋은','취하고 싶은 날','입안가득 청량해지는 칵테일','모두가 사랑하는 칵테일'];
      const x = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
    
      const y = [
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/shaker.jpg?alt=media&token=f244897a-3571-4dc2-8578-fa0924bced6b",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/shaker.jpg?alt=media&token=f244897a-3571-4dc2-8578-fa0924bced6b",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/sugar.jpg?alt=media&token=ad25f845-9a91-4571-964f-8a2d1db8b028",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/unique.jpg?alt=media&token=cc565d9d-92b5-4c1b-b096-d8e49d3466eb",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/solo.jpg?alt=media&token=16c17cff-35d3-43b1-af5e-b22cdf3059ce",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/noob.jpg?alt=media&token=47497911-9512-4b2a-8f24-f63a286e7aa1",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/party.jpg?alt=media&token=e10fc303-b3fc-44b2-8575-e3d571befd04",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/shaker.jpg?alt=media&token=f244897a-3571-4dc2-8578-fa0924bced6b",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/shaker.jpg?alt=media&token=f244897a-3571-4dc2-8578-fa0924bced6b",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/rain.jpg?alt=media&token=6c0d36c1-7f37-4625-b55e-9617a8478b63",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/blue.jpg?alt=media&token=a907d347-5252-4b14-bf11-7aeda28c6374",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/siwan.jpg?alt=media&token=4ef890ff-314c-4b60-ab33-5066301c7d54",
      "https://firebasestorage.googleapis.com/v0/b/myhand-bartender.appspot.com/o/shaker.jpg?alt=media&token=f244897a-3571-4dc2-8578-fa0924bced6b"
      ];
      const ids = [
        '초간단',
        '폭탄주',
        '달콤',
        '신기',
        '혼술',
        '입문자',
        '파티에서',
        '무알콜',
        '외로운',
        '비오는',
        '취하고',
        '청량해',
        '사랑하는'
      ];
      const desc =[
        '이렇게 간단해? 초간단 칵테일 모음',
        '이거 하나면 술자리 인싸 가능!',
        '맛도 분위기도 달콤하게 만들어 주는 칵테일',
        '독특하게 생겼네? 신기하게 생겼네?,',
        '힘들고 외로운 날. 혼술이 당긴다면?',
        '칵테일이 낯설다면? 입문자에게 추천하는 칵테일 모음',
        '파티에서 친구들과 먹기 좋은 칵테일',
        '술을 못마셔도 괜찮아요! 무알콜 칵테일 모음',
        '속상한 날 달달하게 당충전! 마시고 힘내요!',
        '비오는 날 창가에 앉아 마시기 좋은 칵테일',
        '취하고 싶은 날 마시기 좋은.',
        '대신 다음날 힘들 수 있어요',
        '입안가득 청량감을 느낄 수 있는 상큼달콤한 칵테일 모음',
        '너무 유명해서 모두가 아는 칵테일'];
        
      userQuerySnapshot.forEach(doc => {
        if (doc.data().majorCategory == null)  return;
        if (doc.data().majorCategory.includes('초간단')) {
          x[0].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('폭탄주')) {
          x[1].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('달콤')) {
          x[2].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('신기')) {
          x[3].push({
            id: doc.id,
            data: doc.data()
          });
        }else if (doc.data().majorCategory.includes('혼술')) {
          x[4].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('입문자')) {
          x[5].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('파티에서')) {
          x[6].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('무알콜')) {
          x[7].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('외로운')) {
          x[8].push({
            id: doc.id,
            data: doc.data()
          });
        } else if (doc.data().majorCategory.includes('비오는')) {
          x[9].push({
            id: doc.id,
            data: doc.data()
          });
        }  else if (doc.data().majorCategory.includes('취하고')) {
          x[10].push({
            id: doc.id,
            data: doc.data()
          });
        }else if (doc.data().majorCategory.includes('청량한')) {
          x[11].push({
            id: doc.id,
            data: doc.data()
          });
        }else if (doc.data().majorCategory.includes('사랑하는')) {
          x[12].push({
            id: doc.id,
            data: doc.data()
          });
        }
      });

      for (var i = 0; i < 13; i++) {
        cateList.push({
          id: ids[i],
          name : category[i],
          data: x[i],
          img: y[i],
          desc : desc[i]
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

 추가
app.get("/add", async (request, response) => {
  try {
    let data = {
      name : 'Irish Coffee(아이리시 커피)',
      category : '달콤한',
      abv : '14',
      imgaeName : 'irishcoffee',
      description : '가정에서도 간단하게 만들 수 있는 커피와 위스키를 조합한 칵테일로 커피를 진하게 끓이는 것이 요령이다.',
      isbase : false,
      material : '아이리시 위스키, 뜨거운 커피, 커피설탕(설탕), 생크림',
      subMaterial : '레몬, 휘핑크림',
      iamge : '',
      majorCategory : '달콤'
  }
  let setDoc = db.collection('CockTail').doc('아이리시커피').set(data);
  
  data = {
      name : 'Irish Coffee(아이리시 커피)',
      capacity : '215',
      cockware : '',
      method : '',
      material : '아이리시 위스키15ml, 뜨거운 커피200ml, 커피설탕(설탕), 생크림',
      subMaterial : '레몬, 휘핑크림',
      steps : '잔에 뜨거운 커피를 준비합니다.(잔 둘레에 레몬즙을 묻혀주면 풍미가 더 좋습니다.)_아이리시 위스키를 첨가합니다._기호에 맞게 설탕을 넣고 휘핑크림을 올려줍니다.'
  }
  setDoc = db.collection('Recipe').doc('아이리시커피').set(data);
  
  
  data = {
      name : 'Alexander(알렉산더)',
      category : '달콤한',
      abv : '21',
      imgaeName : 'alexander',
      description : '은은하게 퍼지는 달콤함이 느껴지는 칵테일로 애프터 디너에 적합하다. 영국 에드워드 7세의 왕비인 알렌산드라에서 유래되었다.',
      isbase : false,
      material : '브랜디, 크림 드 카카오, 생크림',
      subMaterial : '얼음',
      iamge : '',
      majorCategory : '달콤'
  }
  setDoc = db.collection('CockTail').doc('알렉산더').set(data);
  
  data = {
      name : 'Alexander(알렉산더)',
      capacity : '75',
      cockware : bar["shaker"],
      method : me["shaker"],
      material : '브랜디 25ml, 크림 드 카카오 25ml, 생크림 25ml',
      subMaterial : '얼음',
      steps : '잔에 얼음을 채웁니다._쉐이커에 브랜디, 카카오 크림, 생크림을 넣고 흔들어 줍니다._잔의 얼음을 비우고 쉐이커의 내용물을 따라냅니다.'
  }
  setDoc = db.collection('Recipe').doc('알렉산더').set(data);
  
  
  data = {
      name : 'Stringer(스팅거)',
      category : '달콤한',
      abv : '35',
      imgaeName : 'stringer',
      description : '크림 드 민트화이트를 사용한 칵테일로서는 세계에서 가장 많이 마시고 있는 칵테일로 브랜디의 달콤함과 민트의 자극을 느낄 수 있다.',
      isbase : false,
      material : '브랜디, 크림 드 민트화이트',
      subMaterial : '얼음',
      iamge : '',
      majorCategory : '달콤'
  }
  setDoc = db.collection('CockTail').doc('스팅거').set(data);
  
  data = {
      name : 'Stringer(스팅거)',
      capacity : '75',
      cockware : bar["shaker"],
      method : me["shaker"],
      material : '브랜디 50ml, 크림 드 민트화이트 25ml',
      subMaterial : '얼음',
      steps : '잔에 얼음을 채웁니다._쉐이커에 브랜디와 크림 드 민트화이트를 넣고 흔들어 줍니다._잔의 얼음을 비우고 쉐이커의 내용물을 따라냅니다.'
  }
  setDoc = db.collection('Recipe').doc('스팅거').set(data);
  
  
  data = {
      name : 'B&B(비앤비)',
      category : '달콤한, 센',
      abv : '40',
      imgaeName : 'bnb',
      description : '브랜드의 B와 베네딕티누의 B를 따서 B&B라는 이름이 붙은 칵테일',
      isbase : false,
      material : '브랜디, 베네딕티누',
      subMaterial : '얼음',
      iamge : '',
      majorCategory : '달콤'
  }
  setDoc = db.collection('CockTail').doc('비앤비').set(data);
  
  data = {
      name : 'B&B(비앤비)',
      capacity : '80',
      cockware : '',
      method : '',
      material : '브랜디 40ml, 베네딕티누 40ml',
      subMaterial : '얼음',
      steps : '잔에 베네딕티누를 채웁니다._섞이지 않도록 주의하면서 브랜디를 위에 겹쳐 따릅니다.'
  }
  setDoc = db.collection('Recipe').doc('비앤비').set(data);
  
  data = {
      name : 'Egg Nog(에그 노그)',
      category : '달콤한, 크리스마스',
      abv : '14',
      imgaeName : 'eggnog',
      description : '계란이 들어간 특색있는 칵테일로 일반적으로 브랜디에 럼을 첨가하여 만든다. 미국 남부가 발상지로 크리스마스에 즐겨 마신다고 한다. 계란과 우유가 들어갔기 때문에 추운 겨울날 마시면 기운이 날 것 같은 술이다.',
      isbase : false,
      material : '브랜디, 럼, 계란, 설탕, 우유',
      subMaterial : '얼음',
      iamge : '',
      majorCategory : '달콤'
  }
  setDoc = db.collection('CockTail').doc('에그노그').set(data);
  
  data = {
      name : 'Egg Nog(에그 노그)',
      capacity : '80',
      cockware : bar["shaker"],
      method : me["shaker"],
      material : '브랜디 30ml, 럼 15ml, 계란 1개, 설탕 1티스푼, 우유 적당량',
      subMaterial : '얼음',
      steps : '브랜디, 럼, 계란, 설탕을 쉐이커에 넣고 흔들어 줍니다._얼음을 채운 잔에 쉐이커의 내용물을 따라줍니다._우유를 취향 껏 채운 후 가볍게 저어줍니다.'
  }
  setDoc = db.collection('Recipe').doc('에그노그').set(data);
  
  
  data = {
      name : '소니니',
      category : '쉽게 만들 수 있는',
      abv : '11',
      imageName : 'sonini',
      description : '소주와 버니니를 1:2 또는 1:3 비율로 섞어 만든 칵테일',
      isbase : false,
      material : '소주, 버니니',
      subMaterial : '',
      image : '',
      majorCategory : '초간단'
  }
  setDoc = db.collection('CockTail').doc('소니니').set(data);
  
  data = {
      name : '소니니',
      capacity : '90',
      cockware : '',
      method : '',
      material : '소주 30ml, 버니니 60ml',
      subMaterial : '',
      steps : '잔에 소주와 버니니를 1:2 또는 1:3 비율로 섞어줍니다.'
  }
  setDoc = db.collection('Recipe').doc('소니니').set(data);
  
  
  data = {
      name : '소토닉',
      category : '쉽게 만들 수 있는, 청량한',
      abv : '9',
      imageName : 'sotonic',
      description : '소주와 토닉워터를 섞고 레몬을 첨가한 혼합주로 소주의 특유의 알코올 냄새가 나지 않아 목넘김에 부담이 없다.',
      isbase : false,
      material : '소주, 토닉워터, 레몬',
      subMaterial : '얼음',
      image : '',
      majorCategory : '초간단'
  }
  setDoc = db.collection('CockTail').doc('소토닉').set(data);
  
  data = {
      name : '소토닉',
      capacity : '1060',
      cockware : '',
      method : '',
      material : '소주 1병, 토닉워터 2병, 레몬 반개(슬라이스)',
      subMaterial : '얼음',
      steps : '큰 병에 소주와 토닉워터를 모두 섞어줍니다._슬라이스한 레몬을 첨가합니다._잔에 적당량 따른 후 얼음을 띄워줍니다.(레몬으로 장식해 주면 더 좋습니다.)'
  }
  setDoc = db.collection('Recipe').doc('소토닉').set(data);
    response.json({
      success: "ok"
    });
  } catch (error) {
    response.status(500).send(error);
  }
});
