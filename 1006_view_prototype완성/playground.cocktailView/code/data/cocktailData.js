module.exports=[{
    id: 1,
    name: "Margarita",
    description: "마르가리타(스페인어: Margarita)는 테킬라 베이스의 칵테일의 한 가지이다. 테킬라, 트리플 섹, 오렌지 맛 리큐어, 라임 즙 혹은 레몬 즙을 가지고 만드는데, 글라스 주위에 소금을 두르는 것이 특징이다. 테킬라 중에서는 실버(silver) 테킬라 혹은 블랑코(blanco) 테킬라를 써서 만드는데, 어떤 사람들은 레포사도나 골드(gold) 테킬라를 가지고서도 만든다.",
    category: "데킬라",
    abv:34,
    imageUrls : ["images/Margarita.jpg"],
    materials : ["데킬라","트리플 섹","라임즙"],
    isBase : false
  },{
    id: 2,
    name: "DequilaSunrise",
    description: "데킬라 선라이즈",
    category: "데킬라",
    abv:12,
    imageUrls : ["images/DequilaSunrise.jpg"],
    materials : ["데킬라","트리플 섹","라임즙"],
    isBase : false
  },{
    id: 3,
    name: "IceBreaker",
    description: "아이스브레이커야",
    category: "데킬라",
    abv:20,
    imageUrls : ["images/IceBreaker.jpg"],
    materials : ["데킬라","트리플 섹","라임즙"],
    isBase : false
  },
  {
    id: 4,
    name: "bacardi151",
    description: "원샷하면 기절함",
    category: "럼",
    abv:75.5,
    imageUrls: ["images/bacardi151.jpg"],
    images: [
      { url:"images/Margarita.jpg"},
      { url:"images/bacardi151.jpg"},
      { url:"images/Margarita.jpg"},
      { url:"images/bacardi151.jpg"},
      { url:"images/Margarita.jpg"},
      { url:"images/bacardi151.jpg"}
    ],
    similar: "RonDiaz151",
    isBase : true
  }
]

