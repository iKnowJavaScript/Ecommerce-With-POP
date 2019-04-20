const { User } = require("./User");
const { Order } = require("./Order");
let {
  userDatabase,
  updateUsertoDB,
  orderDatabase,
  updateOrderToDB
} = require("../fs");

const Admin = function(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
};

//Setting Admin as instance of User
Admin.prototype = Object.create(User.prototype);
//Pointing Admin constructor to itself so it can override properties
Admin.prototype.constructor = Admin;

Admin.prototype.readAllUser = function() {
  return userDatabase.filter(user => user.isAdmin === false);
};

Admin.prototype.deleteUser = function(email) {
  if (typeof email !== "string") return "Input must be a valid email address";

  let newDb = [];

  for (let user of userDatabase) {
    if ((user.email === email) & (user.isAdmin === false)) {
      continue;
    } else {
      newDb.push(user);
    }
  }

  if (newDb.length !== userDatabase.length) {
    updateUsertoDB(newDb);
    return "User has been deleted";
  } else {
    return "No such username in the database";
  }
};

//Delete all user
Admin.prototype.deleteAllUser = function() {
  let admins = [];
  for (let user of userDatabase) {
    if (user.isAdmin === true) {
      admins.push(user);
    } else {
      continue;
    }
  }
  console.log("All user has been deleted");
  return (userDatabase = admins);
};

Admin.prototype.getAllOrders = function() {
  return new Order().readAll();
};

Admin.prototype.readSingleOrder = function(orderId) {
  return new Order().readSingle(orderId);
};

Admin.prototype.updateOrder = function(orderId, product) {
  return new Order().updateOrder(orderId, product);
};

Admin.prototype.deleteOrder = function(orderId) {
  return new Order().deleteById(orderId);
};

Admin.prototype.deleteAllOrder = function() {
  return new Order().deleteAll();
};

module.exports = { Admin };

// const admin = new Admin("admin", "admin@gmail.com", "newPass123")

// console.log(admin.save())
// console.log(admin.readAllOdders());
