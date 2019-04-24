const { User } = require("./User");
const { Order } = require("./Order");
let { userDatabase, updateUsertoDB } = require("../fs");

//userDatabase = userDatabase()

const Admin = function(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
};

//Setting Admin as Sub-Class of User
Admin.prototype = Object.create(User.prototype);
//Pointing Admin constructor to itself so it can override properties
Admin.prototype.constructor = Admin;

Admin.prototype.readAllUser = function() {
  let DB = userDatabase()
  return DB.filter(user => user.isAdmin === false);
};

Admin.prototype.deleteUser = function(email) {
  let DB = userDatabase()
  if (typeof email !== "string") return "Input must be a valid email address";

  let newDb = [];
  for (let user of DB) {
    if ((user.email === email) & (user.isAdmin === false)) {
      continue;
    } else {
      newDb.push(user);
    }
  }

  if (newDb.length !== DB.length) {
    updateUsertoDB(newDb);
    return "User has been deleted";
  } else {
    return "No such username in the database";
  }
};

//Delete all user
Admin.prototype.deleteAllUser = function() {
  let DB = userDatabase()
  let adminsOnly = DB.filter(user => user.isAdmin === true);

  updateUsertoDB(adminsOnly);
  return "All user has been deleted";
};

Admin.prototype.getAllOrders = function() {
  return new Order().readAll();
};

Admin.prototype.readSingleOrder = function(orderId) {
  return new Order().readSingle(orderId);
};

Admin.prototype.updateOrder = function(orderId, product) {
  return new Order().update(orderId, product);
};

Admin.prototype.deleteOrder = function(orderId) {
  return new Order().deleteById(orderId);
};

Admin.prototype.deleteAllOrder = function() {
  return new Order().deleteAll();
};

module.exports = { Admin };

