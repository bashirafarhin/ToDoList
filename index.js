import express from "express";
import bodyParser from "body-parser";
import pool from "./database/connection.js";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async(req, res) => {
  const result=await pool.query("SELECT * FROM items");
  const items=result.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  await pool.query("INSERT INTO items(title) VALUES ($1)",[item]);
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const item = req.body.updatedItemTitle;
  const id= req.body.updatedItemId;
  await pool.query("UPDATE items SET title=$1 WHERE items.id=$2",[item,id]);
  res.redirect("/");
});

app.post("/delete", async(req, res) => {
  const id= req.body.deleteItemId;
  await pool.query("DELETE FROM items WHERE items.id=$1",[id]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
