const { saveOrderToDb, orderDatabase } = require("../fs");

let counter = orderDatabase.length;

const Order = function(product) {
  this.id = ++counter;
  this.product = product;
  this.timeOfOrder = new Date().toLocaleTimeString();
  this.dateOfOrder = new Date().toLocaleDateString();
};

Order.prototype.makeOrder = function(product, user_id) {
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

module.exports = Order;

//console.log(database)
