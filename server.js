require("dotenv").config();

const express = require("express"),
  app = express(),
  path = require("path"),
  cors = require("cors"),
  mongoose = require("mongoose");

// mongoose init
const uri = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PWD}@cluster0.3ayo5.mongodb.net/main?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// application defaults
app.set(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth")); // authentication
app.use("/api/posts", require("./routes/posts")); // authentication

app.get('/', (req, res) => {
  res.end('hey')
})

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 4000

app.listen(PORT, () => console.log("listening on port " + (PORT)));
