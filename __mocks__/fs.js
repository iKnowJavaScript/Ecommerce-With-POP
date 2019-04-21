const allDatabase = {
  users: [],
  orders: []
}

let Users = allDatabase["users"];
let Orders = allDatabase["orders"];

function saveUserToDb(input) {
  Users.push(input);
  return
}

function readFromDb() {
  return Users;
}

function updateUsertoDB(database) {
  return Users = database;
}

//Order
function saveOrderToDb(input) {
  Orders.push(input);
  return
}

function readOrderFromDb() { 
  return Orders
}

function updateOrderToDB(database) {
  return Orders = database;
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
