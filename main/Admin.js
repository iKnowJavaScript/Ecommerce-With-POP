const { User } = require("./User");
const {Order} = require("./Order")
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
    if (user.email === email & user.isAdmin === false) {
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
  console.log("All user has been deleted");
  return (userDatabase = []);
};

Admin.prototype.readAllOdders = function() {
  return Order.readAllOdders();
};

Admin.prototype.readSingleOrder = function(orderId) {
  if(orderId === "" || typeof orderId !== "number") return "Input a valid Order ID"

  orderDatabase = orderDatabase.filter(order => order.orderId === orderId);

  return orderDatabase.length < 1
    ? "Order not found"
    : orderDatabase;
};

Admin.prototype.updateOrder = function(orderId, product) {
  if (typeof product !== "string") return `Input valid details`;

  orderDatabase.forEach(function(order) {
    if (order.orderId === orderId) {
      order.product = product;
    }
  });
  updateOrderToDB(orderDatabase);
  console.log("Updated Succesfully");
};

Admin.prototype.deleteOrder = function(orderId) {
  if (typeof orderId !== "number") return "Input must be a valid order ID";

  let newDb = [];

  for (let order of orderDatabase) {
    if (order.orderId === orderId) {
      continue;
    } else {
      newDb.push(order);
    }
  }

  if (newDb.length !== orderDatabase.length) {
    updateOrderToDB(newDb);
    console.log("Order has been deleted");
  } else {
    console.log("No such username in the database");
  }
};

Admin.prototype.deleteAllOrder = function() {
  console.log("All order has been deleted");
  return (orderDatabase = []);
};

module.exports = { Admin };

// const admin = new Admin("admin", "admin@gmail.com", "newPass123")

// console.log(admin.save())
// console.log(admin.readAllUser());