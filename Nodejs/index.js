const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());
// import Model
const ServiceSchema = require("./model");
const auth = require("./auth")

// for connecting the PORT
const PORT = 4000;

// for creating the API
app.post("/services", async (req, res) => {
  const data = await ServiceSchema(req.body)
  try {
    const already_exist = await ServiceSchema.findOne({
      email: req.body.email
    })
    if (already_exist) {
      res.json("email already exist")
    }
    else {
      data.save()
      res.json("Got services successfuly")
    }
  } catch (error) {
    res.json("failed to get service")
  }
})
// for validation

//for getting the data from database
app.get("/services", async (req, res) => {
  try {
    const data = await ServiceSchema.find();
    res.status(200).send(data);
  } catch {
    res.status(500).send("Api Failed To fetch");
  }
});

//for getting selected id
app.get("/services/:id", (req, res) => {
  const id = req.params.id;

  ServiceSchema.findById(id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(user);
    }
  });
});
//for deleting the Api

app.delete("/services/:id", (req, res) => {
  const id = req.params.id;
  ServiceSchema.findByIdAndRemove(id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Deleted Succesffuly");
    }
  });
});
// for updating the Api

app.put("/services/:id", async (req, res) => {
  try {
    var data = await ServiceSchema.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      service: req.body.service,
      price: req.body.price,
    })
    const a = await data()
    res.json(a)
  } catch (error) {
    res.send(error)
  }
})

//for signup
app.post("/services/signup", async (req, res) => {
  const data = await auth(req.body)
  try {
    const already_exist = await auth.findOne({
      email: req.body.email
    })
    if (already_exist) {
      res.json("email already exist")
    }
    else {
      data.save()
      res.json("sign up successfuly")
    }
  } catch (error) {
    res.json("failed to sign-up")
  }
}

)

//for login 
app.post("/services/login", async (req, res) => {

  try {
    const match = await auth.findOne({
      email: req.body.email,
      password: req.body.password
    })
    if (match) {
      res.json({ message: "login successful", match })
    }
    else {

      res.json("credentials does not match")

    }
  } catch (error) {
    res.json("failed to login")
  }
}
)

// (req, res) => {
//   const id = req.params.id;
//   ServiceSchema.findById(id, (err, user) => {
//     if (err) {
//       console.log("api failed");
//     } else {
//       user.name = req.body.name;
//       user.service = req.body.email;
//       user.price = req.body.service;
//       user.price = req.body.price;
//       user
//         .save()
//         .then((user) => {
//           res.status(200).send(user);
//         })
//         .catch((err) => {
//           res.status(500).send(err.message);
//         });
//     }
//   });
// });

// for connecting the DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/services", {
  useNewUrlParser: true,
});
// for checking database connection
mongoose.connection.once("open", () => {
  console.log("Database Connected Succesfully");
});
app.listen(PORT, () => {
  console.log("PORT is connected at " + PORT);
});
