const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/db");
const User = require('./models/user')

app.get("/", (req, res) => {
     res.send(`Learning CRUD API test to <i>url(<a href="http://localhost:${port}/api">http://localhost:${port}/api</a>)</i>`);
})

db.authenticate().then(() => console.log("Database berhasil terkoneksi"));

app.use(express.urlencoded({ extended: true }))

// CREATE
app.post("/api", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username, email, password,
    });

    await newUser.save();

    res.json(newUser);
  } catch (err) {
     res.status(500).send("server error")
     console.error(err.message);
  }
});
// SHOW ALL
app.get("/api", async (req, res) => {
     try {
          const getAllUser = await User.findAll()

          res.json(getAllUser);
     } catch (err) {
          res.status(500).send("server error")
          console.error(err.message);
     }
})
// SHOW FROM ID
app.get("/api/:id", async (req, res) => {
     try {
          const id = req.params.id

          const getUser = await User.findOne({
               where: {id: id}
          })

          res.json(getUser);
     } catch (err) {
          res.status(500).send("server error")
          console.error(err.message);
     }
})
// DELETE DATA
app.delete("/api/:id", async (req, res) => {
     try {
          const id = req.params.id

          const deleteUser = await User.destroy({
               where: {id: id}
          })

          await deleteUser;

          res.json("Data berhasil di hapus");
     } catch (err) {
          res.status(500).send("server error")
          console.error(err.message);
     }
})
// UPDATE DATA
app.put("/api/:id", async (req, res) => {
     try {
          const { username, email, password } = req.body;
          const id = req.params.id

          const updateUser = await User.update({
               username, email, password
          }, {where: {id: id}})

          await updateUser

          res.json("Data berhasil di update");
     } catch (err) {
          res.status(500).send("server error")
          console.error(err.message);
     }
})

app.listen(port, console.log(`Server berjalan di port ${port}`));