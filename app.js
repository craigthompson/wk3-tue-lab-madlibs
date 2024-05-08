import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import sample from "lodash.sample";

const app = express();
const port = "8000";
let userName = "";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  "awesome",
  "terrific",
  "fantastic",
  "neato",
  "fantabulous",
  "wowza",
  "oh-so-not-meh",
  "brilliant",
  "ducky",
  "coolio",
  "incredible",
  "wonderful",
  "smashing",
  "lovely",
];

// Display the homepage
app.get("/", (req, res) => {
  res.render("index.html");
});

// Display a form that asks for the user's name.
app.get("/hello", (req, res) => {
  res.render("hello.html");
});

// Handle the form from /hello and greet the user.
app.get("/greet", (req, res) => {
  const compliment = sample(COMPLIMENTS);
  const name = req.query.name || "stranger";
  userName = name; // Save username for other pages
  res.render("greet.html", {
    name: name,
    compliment: compliment,
  });
});

app.get("/game", (req, res) => {
  if (req.query.game === "no") {
    res.render("goodbye.html", { name: userName });
  } else if (req.query.game === "yes") {
    res.render("game.html");
  }
});

app.post("/madlib", (req, res) => {
  const { name, color, noun, adjective } = req.body;
  console.log(name, color, noun, adjective);
  res.render("madlib.html", { name, color, noun, adjective });
});
