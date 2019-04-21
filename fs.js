const fs = require("fs");

function saveUserToDb(input) {
  let jsonData = fs.readFileSync("./DB/db.json", "utf8");
  jsonData = JSON.parse(jsonData);
  jsonData["users"].push(input);

  return fs.writeFileSync(
    "./DB/db.json",
    JSON.stringify(jsonData, null, 2),
    "utf8"
  );
}

function readFromDb() {
  let jsonData = fs.readFileSync("./DB/db.json", "utf8");
  jsonData = JSON.parse(jsonData);

  return jsonData["users"];
}

function updateUsertoDB(database) {
  let jsonData = fs.readFileSync("./DB/db.json", "utf8");
  db = JSON.parse(jsonData);
  db["users"] = database;

  return fs.writeFileSync("./DB/db.json", JSON.stringify(db, null, 2), "utf8");
}

//Order
function saveOrderToDb(input) {
  let jsonData = fs.readFileSync("./DB/db.json", "utf8");
  jsonData = JSON.parse(jsonData);
  jsonData["orders"].push(input);

  return fs.writeFileSync(
    "./DB/db.json",
    JSON.stringify(jsonData, null, 2),
    "utf8"
  );
}

function readOrderFromDb() {
  let jsonData = fs.readFileSync("./DB/db.json", "utf8");
  jsonData = JSON.parse(jsonData);
  return jsonData["orders"];
}

function updateOrderToDB(database) {
  let jsonData = fs.readFileSync("./DB/db.json", "utf8");
  db = JSON.parse(jsonData);
  db["orders"] = database;

  return fs.writeFileSync("./DB/db.json", JSON.stringify(db, null, 2), "utf8");
}

const orderDatabase = readOrderFromDb();
const userDatabase = readFromDb();

module.exports = {
  saveUserToDb,
  userDatabase,
  updateUsertoDB,
  saveOrderToDb,
  orderDatabase,
  updateOrderToDB
};
