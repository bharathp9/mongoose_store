//___________________
//Dependencies
//___________________
//require express so we can use router
const express = require("express");
const products = express.Router();

//___________________
//Models
//___________________
//get access to the Product model
const Product = require("../models/products");

//___________________
//See json Route
//___________________
products.get("/json", (req, res) => {
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      console.log(error);
    });
});

//___________________
//7 Restful Routes
//___________________
// Index  : GET    '/products'          1/7
// Show   : GET    '/products/:id'      2/7
// New    : GET    '/prodcuts/new'      3/7
// Create : POST   '/products'          4/7
// Edit   : GET    '/products/:id/edit' 5/7
// Update : PUT    '/products/:id'      6/7
// Delete : DELETE '/products/:id'      7/7

// Index  : GET    '/products'          1/7
products.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.render("./products/index.ejs", { products });
    })
    .catch((error) => {
      console.log(error);
    });
});

// New    : GET    '/products/new'      3/7
// Order matters! must be above /prodcuts/:id or else this route will never get hit
products.get("/new", (req, res) => {
  res.render("./products/new.ejs");
});

// Show   : GET    '/products/:id'      2/7
products.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render("./products/show.ejs", { product: product });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Create : POST   '/products'          4/7
products.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      res.redirect("/products/" + product.id);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Edit   : GET    '/products/:id/edit' 5/7
products.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render("./products/edit.ejs", { product: product });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Update : PUT    '/products/:id'      6/7
products.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      res.redirect("/products/" + product.id);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Delete : DELETE '/products/:id'      7/7
products.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      res.redirect("/products");
    })
    .catch((error) => {
      console.log(error);
    });
});

//___________________
//Buy Route
//___________________

products.put("/:id/buy", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, { $inc: { qty: -1 } })
    .then((product) => {
      res.redirect("back");
    })
    .catch((error) => {
      console.log(error);
    });
});

//___________________
//Seed Route - Vist ONCE to populate database
//___________________
products.get("/seed/newproducts", (req, res) => {
  const newProducts = [
    {
      _id: "58e913abb7304c0e0f20d0d8",
      name: "Beans",
      description:
        "A small pile of beans. Buy more beans for a big pile of beans.",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/93/Phaseolus_vulgaris_white_beans%2C_witte_boon.jpg",
      price: 5,
      qty: 99,
      __v: 0,
    },
    {
      _id: "58e913abb7304c0e0f20d0da",
      name: "Beautiful Bins",
      description: "A stack of colorful bins for your beans and bones.",
      img: "http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg",
      price: 7000,
      qty: 1,
      __v: 0,
    },
    {
      _id: "58e913abb7304c0e0f20d0d9",
      name: "Bones",
      description: "It's just a bag of bones.",
      img: "http://bluelips.com/prod_images_large/bones1.jpg",
      price: 25,
      qty: 0,
      __v: 0,
    },
    {
      _id: "58e9452e28ccf4146d4c485e",
      name: "Water Rose",
      img: "https://st2.depositphotos.com/1567988/11344/i/950/depositphotos_113449302-stock-photo-macro-photo-of-rose-with.jpg",
      description: "Beautiful, ephemeral, assembly required",
      qty: 5,
      __v: 0,
      price: 1000000,
    },
    {
      _id: "58e94d443931ca152bdd4478",
      name: "All Natural Organic Non-GM0 Pure 100% Natural Lime",
      img: "http://wallpaper-gallery.net/images/images/images-17.jpg",
      description:
        "Forget your fears of agricultural genetic engineering and take your taste buds back to the beginning of time with this authentic unaltered fruit",
      price: 17,
      qty: 72,
      __v: 0,
    },
    {
      _id: "58e956e73931ca152bdd4479",
      name: "Mantis Shrimp (tamed)",
      img: "http://otlibrary.com/wp-content/gallery/mantis-shrimp/mantis-shrimp.jpg",
      description:
        "Sustainably raised, cage-free, docile mantis shrimp. Makes a for a cuddly companion as long as you never make direct eye contact! Notice: this item is gluten-free, should your relationship go south",
      price: 887,
      qty: 0,
      __v: 0,
    },
    {
      _id: "58e958243931ca152bdd447a",
      name: "Kohlrabi",
      img: "http://canelasf.com/wp-content/uploads/2015/02/kohlrabi.jpg",
      description:
        "Get a jump on the next superfood craze. Kohlrabi's superiority is marked by its tricky to spell name. Text all your friends: You are going to live forever with the power of kholrabi",
      price: 6,
      qty: 913462,
      __v: 0,
    },
    {
      _id: "58e9893444738817298b3a3b",
      name: "Yogalates Fitness Machine 1000",
      img: "https://s-media-cache-ak0.pinimg.com/564x/a8/4f/05/a84f051bf47e41382e4becd4a3d05214.jpg",
      description:
        "Stop wasting your time doing one exercise at a time! With the YFM1000 you can do yoga and pilates at the same time! ",
      price: 3199,
      qty: 14,
      __v: 0,
    },
    {
      _id: "58eba62854241b05b274dc78",
      name: "Bell Jars",
      img: "https://s-media-cache-ak0.pinimg.com/736x/0a/6f/b6/0a6fb62caa11cfdb68c7c12a2620c012.jpg",
      description:
        "Capture the beauty of anything and don't let it get away! Formaldehyde sold separatey ",
      price: 49.99,
      qty: 49,
      __v: 0,
    },
    {
      _id: "58ed05dfa2b6901441a43419",
      name: "Portal to 5th Dimension",
      img: "https://images-assets.nasa.gov/image/PIA20912/PIA20912~thumb.jpg",
      description:
        "Bored of your neighborhood? Bored of your typical vacation? Go to the 5th dimension",
      price: 1,
      qty: 54,
      __v: 0,
    },
  ];

  Product.create(newProducts)
    .then((product) => {
      console.log("SEED: NEW PRODUCTS CREATED!");
      res.redirect("/products");
    })
    .catch((error) => {
      console.log(error);
    });
});

//___________________
//ALTERNATE Seed Route - Vist ONCE to populate database
//___________________
const productSeeds = require("../models/seed.js");
products.get("/seed/newproducts/viaseedfile", (req, res) => {
  Product.insertMany(productSeeds)
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      console.log(error);
    });
});

//___________________
//Mistakes happen! Drop Database - Vist ONCE to drop your database. WARNING! YOU CANNOT UNDO THIS!
//___________________
products.get(
  "/dropdatabase/cannotundo/areyoursure/reallysure/okthen",
  (req, res) => {
    Product.collection.drop();
    res.send("You did it! You dropped the database!");
  }
);

//___________________
//Module Exports - access this file in server.js
//___________________
//Export router AND require it in server.js Step 3/3
//Note all three need to be working in order to get server runnning
module.exports = products;
