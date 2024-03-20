const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // Use the port provided by Netlify or default to 3000
app.use(express.static(path.join(__dirname, "frontend")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", { yes: "yes" });
});

app.get("/songs", (req, res) => {
  res.render("hymns");
});

app.get("/songs/:id", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "songs", `${id}.json`);

  try {
    const songData = require(filePath);
    res.render("song", { song: songData });
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      res.status(404).send("song not found");
    } else {
      console.error(error);
      res.status(500).send("error");
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
