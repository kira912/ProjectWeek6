const mongoose = require("mongoose");
require("dotenv").config();
// mongoose.connect("mongodb://localhost/idkdo", { useMongoClient: true });
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const User = require("../models/user");
const Gift = require("../models/gift");
const Store = require("../models/store");


///////// DATABASE STORES ////////////

const storeData = [
  {
    name: "Nature et Découvertes",
    query: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDdE1Uze4cUL9zFAaoqPbkV-2KpOkb0m2g&q=Nature+et+découvertes,Paris+France",
    url: "https://www.natureetdecouvertes.com/"
  },
  {
    name: "La chaise longue",
    query: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDdE1Uze4cUL9zFAaoqPbkV-2KpOkb0m2g&q=La+chaise+longue,Paris+France",
    url : "https://www.lachaiselongue.fr/"
  },
  {
    name : "Zavvi",
      url: "https://fr.zavvi.com"
  },
  {
    name : "Amazon",
      url: "https://www.amazon.fr/"
  },
  {
    name : "place-o-gout",
      url: "http://place-o-gout.com/"
  },
  {
    name : "Magasin du Chef",
      url: "https://www.magasinduchef.com/"
  },
  {
    name : "Cadeaux folies",
      url: "https://www.cadeauxfolies.fr/"
  }
]


///////////// DATABASE GIFTS //////////////////


const giftData = [
  {
    name: "Plateau de 7 aromates à cultiver",
    description:
      "Basilic citron thai et basilic fin vert / Ail des ours / Cerfeuil / Persil géant d'Italie / Thym / Coriandre",
    price: 32,
    imgPath:
      "/images/aromates.jpg",
    tags: ["adulte", "cuisine"],
    storeName: "Nature et Découvertes"
  },
  {
    name: "Oreiller de bain",
    description:
      "Oreiller à accrocher dans la baignoire grâce à des ventouses pour un confort optimal",
    price: 18,
    imgPath:
      "/images/oreiller.jpg",
    tags: ["adulte", "bien-être"],
    storeName: "Nature et Découvertes"
  },
  {
    name: "Mon calendrier des saisons",
    description:
      "Calendrier avec pièces Velcro pour apprendre les jours, mois et saisons",
    price: 29.95,
    imgPath:
      "/images/calendrier.jpg",
    tags: ["enfant", "apprentissage"],
    storeName: "Nature et Découvertes"
  },
  {
    name: "J'apprends le temps",
    description: "Jeu évolutif pour apprendre à lire l'heure",
    price: 34.95,
    imgPath:
      "/images/temps.jpg",
    tags: ["enfant", "apprentissage"],
    storeName: "Nature et Découvertes"
  },
  {
    name: "Amplificateur de son",
    description:
      "Permet de surprendre les bruits de la nature ou de jouer a l'espion",
    price: 17,
    imgPath:
      "/images/amplif.jpg",
    tags: ["enfant", "jeu de plein air"],
    storeName: "Nature et Découvertes"
  },
  {
    name: "Mon premier jardin",
    description:
      "Mini serre pour cultiver légumes, fleurs et plantes aromatiques",
    price: 11.95,
    imgPath:
      "/images/minijardin.jpg",
    tags: ["enfant"],
    storeName: "Nature et Découvertes"
  },
  {
    name: "Coffret à outils 'Miss Bricolage'",
    description:
      "Coffret à outils comprenant 5 tournevis, 1 marteau, 1 pince, 1 niveau à bulle et 1 mètre mesureur",
    price: 24.95,
    imgPath:
      "/images/outils.jpg",
    tags: ["adulte", "maison"],
    storeName: "La chaise longue"
  },
  {
    name: "Trancheuse à saucisson",
    description:
      "Guillotine manuelle à saucisson pour des tranches fines et régulières",
    price: 29.95,
    imgPath:
      "/images/guillotine.jpg",
    tags: ["adulte", "cuisine"],
    storeName: "La chaise longue"
  },
  {
    name: "Pèse-bagages 'Just go'",
    description:
      "Permet de peser sa valise au préalable pour éviter les mauvaises surprises au comptoir d'enregistrement (poids maximum 40kgs)",
    price: 14.95,
    imgPath:
      "/images/pese.jpg",
    tags: ["adulte", "voyage"],
    storeName: "La chaise longue"
  },
  {
    name: "Jeux arcades de Poche avec écran LCD",
    description:
      "Mini console de poche avec plus de 100 jeux sur écran LCD avec couleurs et son",
    price: 11.29,
    imgPath:
      "/images/arcade.jpg",
    tags: ["enfant", "adulte", "jeux"],
    storeName: "Zavvi"
  },
  {
    name: "Appareil à raclette",
    description:
      "Appareil à raclette 4 en 1 allient raclette, pierre à griller, grill et crêpière",
    price: 49.9,
    imgPath:
      "/images/raclette.jpg",
    tags: ["adulte", "cuisine"],
    storeName: "Amazon"
  },
  {
    name: "Coffret 'Autour de la tomate'",
    description:
      "Assortiment d'huile d'olive, de moutarde, de sel et de délice à la tomate",
    price: 18.9,
    imgPath:
      "/images/coffret-tomate.jpg",
    tags: ["adulte", "cuisine"],
    storeName: "place-o-gout"
  },
  {
    name: "Nutella 5kg",
    description: "Pot collector de Nutella pour les grands gourmands",
    price: 49.3,
    imgPath:
      "/images/nutella.jpg",
    tags: ["cuisine"],
    storeName: "Magasin du Chef"
  },
  {
    name: "Tapis de jeux de voitures",
    description: "Tapis résistant (0.95m x 2m)",
    price: 20.9,
    imgPath:
    "/images/tapis-voitures.jpg",
    tags: ["enfant"],
    storeName: "Amazon"
  },
  {
    name: "Distributeur de bonbons",
    description: "Distributeur 'Candy Grabber' pour vraiment mériter ses bonbons",
    price: 27.95,
    imgPath:
      "/images/distributeur-bonbons.jpg",
    tags: ["enfant"],
    storeName: "Cadeaux folies"
  }
];


//////////// GESTION DE LA DATABASE /////////////////

// Only add a user when there is no one
User.find({role: "Admin"}, (err, users) => {
  if (users.length === 0) {
    Users.create(
      {
      	"email" : "hello@gmail.com",
      	"password" : "$2a$10$rgNI.6KL4XwTVipYFGuyPe.FY0CRE4eXb3OYicPX73PtnVjyO0t7O",
      	"bookmarks" : [ ],
      	"role" : "Admin",
      }
    , (err, users) => {
      console.log("1 Admin user created (hello@gmail.com)")
    })
  }
});

Gift.remove({}, err => {
  Store.remove({}, err => {
    Store.create(storeData, (err, stores) => {
      if (err) {
        throw err;
      }
      console.log("MONGO: " + stores.length + " stores created");

      for (var i = 0; i < giftData.length; i++) {
        var indexStore = stores.findIndex(store => {
          return store.name === giftData[i].storeName;
        });
        if (indexStore === -1) {
          console.log(
            "WARNING: no store '" + giftData[i].storeName + "' found"
          );
        } else {
          giftData[i].store = stores[indexStore]._id;
        }
      }

      // mongoose.disconnect();

      Gift.create(giftData, (err, gifts) => {
        if (err) {
          throw err;
        }
        console.log("MONGO: " + gifts.length + " gifts created");
        mongoose.connection.close();
      });
    });
  });
});
