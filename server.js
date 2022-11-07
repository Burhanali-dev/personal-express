const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db, collection;
const url = "mongodb+srv://burhanali:2short2me@cluster0.e7moc1a.mongodb.net/artist-info?retryWrites=true&w=majority";
const dbName = "artist-info";

app.listen(8500, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db();
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("Info")
    .find()
    .toArray((err, allDocuments) => {
      if (err) return console.log(err);
      res.render("index.ejs", { rapperDatabase : allDocuments });
    });
});

app.post("/saveArtistInfo", (req, res) => {
  db.collection("rapper").insertOne(
    { rapperName: req.body.name, realName: req.body.realname, biggestHit: req.body.biggestsong, recordLabel: req.body.artistlabel},
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});
app.delete("/delete", (req, res) => {
  db.collection("rapper").findOneAndDelete(
    { rapperName: req.body.name, realName: req.body.realname, biggestHit: req.body.biggestsong, recordLabel: req.body.artistlabel},
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});


// ====================== Refer Later ==============================
app.put("/messages", (req, res) => {
  db.collection("results").findOneAndUpdate(
    { name: req.body.name, msg: req.body.msg },
    {
      $set: {
        thumbUp: req.body.thumbUp + 1,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});


