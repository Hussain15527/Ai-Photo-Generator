const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { middleWare } = require("./logic");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const fullImage = await middleWare("car");
  res.render("index.ejs", { src: fullImage.imageUrl });
});

app.get("/generate", async (req, res) => {
  const pr = req.query.pr;
  const fullImage = await middleWare(pr);
  res.render("index.ejs", { src: fullImage.imageUrl });
});

app.post("/", async (req, res) => {
  const pr = req.body.pr;
  res.redirect(`/generate?pr=${encodeURIComponent(pr)}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
