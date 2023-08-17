const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path=require('path');
const { middleWare } = require("./logic");
const { middleWare2 } = require("./upload");
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
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
app.post("/upload", async (req, res) => {
  const pr = req.body.pr; // Access the 'pr' value from the POST body instead of query parameters
  const link = req.body.link; // Access the 'link' value from the POST body instead of query parameters

  // Process the 'pr' and 'link' data as needed

  // Redirect to the same route with the query parameters for GET request
  res.redirect(
    `/upload?pr=${encodeURIComponent(pr)}&link=${encodeURIComponent(link)}`
  );
});

app.get("/upload", async (req, res) => {
  const pr = req.query.pr;
  const link = req.query.link;
  const fullImage = await middleWare2(pr, link);
  res.render("upload.ejs", { src: fullImage.imageUrl });
});

app.post("/", async (req, res) => {
  const pr = req.body.pr;
  res.redirect(`/generate?pr=${encodeURIComponent(pr)}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
