let { saveOrderToDb, orderDatabase } = require("../fs");

let counter = orderDatabase.length;

const Order = function(product) {
  this.id = ++counter;
  this.product = product;
  this.timeOfOrder = new Date().toLocaleTimeString();
  this.dateOfOrder = new Date().toLocaleDateString();
};

Order.prototype.makeOrder = function(product, user_id) {
  if (!user_id) return "Please Input a valid User ID";
  let order = {
    orderId: this.id,
    timeOfOrder: this.timeOfOrder,
    dateOfOrder: this.dateOfOrder,
    product: product,
    user_id: user_id
  };

  saveOrderToDb(order);

  return "Order Succesfully Added to Database";
};

Order.prototype.readAllOrders = function() {
  return orderDatabase;
};

Order.prototype.readSingleOrder = function(orderId) {
  if (orderId === "" || typeof orderId !== "number")
    return "Input a valid Order ID";

  orderDatabase = orderDatabase.filter(order => order.orderId === orderId);

  return orderDatabase.length < 1 ? "Order not found" : orderDatabase;
};

module.exports = { Order };

// let order = new Order("Cup");
// console.log(order.makeOrder("Cup", 2));
// console.log(order.readSingleOrder(3))
