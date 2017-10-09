const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/idkdo', { useMongoClient: true})

const Gift = require('../models/gift')
const Store = require('../models/store')

const storeData = [
  {
    name: "Nature et Découvertes",
    places: [{
      location: {
        type: "Point",
        coordinates: [48.862428, 2.344637]
      },
      address: "Centre Commercial Forum des Halles, 75001 Paris",
    }]
  },

  {
    name: "Nature et Découvertes",
    places: [{
      location: {
        type: "Point",
        coordinates: [48.8748045, 2.3385008999999854]
      },
      address: "46 Rue Laffitte, 75009 Paris, France"
    }]
  },

  {
    name: "Nature et Decouvertes",
    places: [{
      location: {
        type: "Point",
        coordinates: [48.8582877, 2.356079799999975]
      },
      address: "20 bis rue Sainte Croix de la Bretonnerie 75004 Paris"
    }]
  },

  {
    name: "Nature et Découvertes",
    places: [{
      location: {
        type: "Point",
        coordinates: [48.862578, 2.334970300000009]
      },
      address: "carrousel du louvre"
    }]
  },

  {
    name: "Nature et Découvertes",
    places: [{
      location: {
        type: "Point",
        coordinates: [48.8483148, 2.282590300000038]
      },
      address: "Centre Commercial Beaugrenelle 75015 Paris"
    }]
  },

  {
   name: "Nature et Découvertes",
   places: [{
     location: {
       type: "Point",
       coordinates: [48.8429768, 2.3228288999999904]
     },
     adress: "Centre commercial Montparnasse"
   }] 
  },

  {
    name: "Nature et Découvertes",
    places: [{
      location: {
        type: "Point",
        coordinates: [48.8297947, 2.3550950999999714]
      },
      adress: "Centre Commercial Italie 2 75013 Paris"
    }]
  },

  {
    name: "Nature et Découvertes",
    places: [{
      location: {
        type: "Point",
        coordinates: [48.8331947, 2.3863824000000022]
      },
      adress: "Bercy Village"
    }]
  }
]

const giftData = [
  {
    name: 'Plateau de 7 aromates à cultiver',
    description: "Basilic citron thai et basilic fin vert / Ail des ours / Cerfeuil / Persil géant d'Italie / Thym / Coriandre",
    price: 32,
    imgPath: "https://cache.natureetdecouvertes.com/Medias/Images/Articles/61156100/650?frz-v114",
    tags: ["adulte, cuisine"],
    store: "Nature et Decouvertes"
  },
  {
    name: "Oreiller de bain",
    description: "Oreiller à accroché dans la baignoire grace a des ventouses pour un confort optimal",
    price: 18,
    imgPath: "https://cache.natureetdecouvertes.com/Medias/Images/Articles/15131310/650?frz-v114",
    tags: ["adulte, bien-être"],
    store: "Nature et Decouvertes"
  },
  {
    name: "Mon calendrier des saisons",
    description: "Calendrier avec pièces Velcro pour apprendre les jours, mois et saisons",
    price: 29.95,
    imgPath: "https://cache.natureetdecouvertes.com/Medias/Images/Articles/30152200/650?frz-v114",
    tags: ["enfant, apprentissage"],
    store: "Nature et Decouvertes"
  },
  {
    name: "J'apprends le temps",
    description: "Jeu evolutif pour apprendre à lire l'heure",
    price: 34.95,
    imgPath: "https://cache.natureetdecouvertes.com/Medias/Images/Articles/30154740/650?frz-v114",
    tags: ["enfant, apprentissage"],
    store: "Nature et Découvertes"
  },
  {
    name: "Amplificateur de son",
    description: "Permet de surprendre les bruits de la nature ou de jouer a l'espion",
    price: 17,
    imgPath: "https://cache.natureetdecouvertes.com/Medias/Images/Articles/30153900/30153900-5.jpg?width=650&height=650",
    tags: ["enfant, jeu de plein air"],
    store: "Nature et Découvertes"
  },
  {
    name: "Mon premier jardin",
    description: "Mini serre pour cultiver légumes fleurs et plantes aromatiques",
    price: 11.95,
    imgPath: "https://cache.natureetdecouvertes.com/Medias/Images/Articles/91038400/4FEA3B30186D0FFE7A0BE69F753FAB76.jpg?width=650&height=650",
    tags: ["enfant"],
    store: "Nature et Découvertes"
  },
  {
    name: "Coffret à outils'Miss bricolage'",
    description: "Coffret à outils comprennant 5 tournevis, 1 marteau, 1 pince, 1 niveau à bulle et 1 mètre mesureur",
    price: 24.95,
    imgPath: "https://www.lachaiselongue.fr/media/catalog/product/cache/1/image/325x/9df78eab33525d08d6e5fb8d27136e95/2/9/29-C1-033_1.jpg",
    tags: ["adulte, maison"],
    store: "La chaise longue"
  },
  {
    name: "Trancheuse à saucisson",
    description: "guillotine manuelle à saucisson pour des tranches fines et régulières",
    price: 29.95,
    imgPath: "https://www.lachaiselongue.fr/media/catalog/product/cache/1/image/325x/9df78eab33525d08d6e5fb8d27136e95/3/6/36-1k-002_1.jpg",
    tags: ["adulte, cuisine"],
    store: "La chaise longue"
  },
  {
    name: "Pèse bagages 'Just go'",
    description: "Permet de peser sa valise au préalable pour éviter les mauvaises surprises au comptoir d'enregistrement (poids maximum 40kgs)",
    price: 14.95,
    imgPath: "https://www.lachaiselongue.fr/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/3/6/36-1v-503_4.jpg",
    tags: ["adulte, voyage"],
    store: "La chaise longue"
  },
  {
    name: "Jeux arcades de Poche avec écran LCD",
    description: "Mini console de poche avec plus de 100 jeux sur écran LCD avec couleurs et son",
    price: 11.29,
    imgPath: "https://s3.thcdn.com/productimg/480/480/11329156-1624421349498666.jpg",
    tags: ["enfant, adulte, jeux"],
    store: "Zavvi"
  },
  {
    name: "Appareil à raclette",
    description: "Appareil à raclette 4 en 1 allient raclette, pierre à griller, grill et crêpière",
    price: 49.90,
    imgPath: "https://images-na.ssl-images-amazon.com/images/I/71Ffqbaub6L._SL1200_.jpg",
    tags: ["adulte, cuisine"],
    store: "Amazon"
  },
  {
    name: "Coffret 'Autour de la tomate'",
    description: "Assortiment d'huile d'olive, de moutarde, de sel et de délice à la tomate",
    price: 18.90,
    imgPath:"http://place-o-gout.com/469-thickbox_default/coffret-autour-de-la-tomate.jpg",
    tags: ["adulte, cuisine"],
    store: "place-o-gout"
  },
  {
    name: "Nutella 5kg",
    description: "Pot collector de Nutella pour les grands gourmands",
    price: 49.30,
    imgPath: "https://www.magasinduchef.com/8881-thickbox_default/nutella-5-kg.jpg",
    tags: ["cuisine"],
    store: "Magasin du Chef"
  },
  {
    name: "Tapis de jeux de voitures",
    description: "Tapis resistant (0.95m x 2m)",
    price: 20.90,
    imgPath:"https://images-na.ssl-images-amazon.com/images/I/61CdrdhBIML.jpg",
    tags:["enfant"],
    store: "Amazon"
  },
  {
    name: "Distributeur de bonbons",
    description: "Distributeur 'Candy Grabber' pour vraiment mériter ses bonbons",
    price: 27.95,
    imgPath: "https://www.cadeauxfolies.fr/media/catalog/product/cache/3/image/1398x/9df78eab33525d08d6e5fb8d27136e95/c/a/candy_grabber_1.jpg",
    tags: ["enfants"],
    store: "Cadeaux folies"
  }
]




Gift.create(giftData, (err, docs) => {
  if(err) {
    throw err
  }

  docs.forEach(gift => {
    console.log(giftData.name)
  })
  mongoose.connection.close()
})