let { saveOrderToDb, orderDatabase, updateOrderToDB } = require("../fs");

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

Order.prototype.readAll = function() {
  return orderDatabase;
};

Order.prototype.readSingle = function(orderId) {
  if (orderId === "" || typeof orderId !== "number")
    return "Input a valid Order ID";

  let order = orderDatabase.find(order => order.orderId === orderId);

  return !order ? "Order not found" : order;
};

Order.prototype.update = function(orderId, product) {
  if (orderId === "" || typeof orderId !== "number")
    return `Order Id must be Number`;
  if (product === "" || typeof product !== "string") return `Invalid Product`;

  let orders = [];
  for (let order of orderDatabase) {
    if (order.orderId === orderId) {
      order.product = product;
      orders.push(order);
    } else {
      orders.push(order);
    }
  }
  if (orders == orderDatabase) return "Product not found"; //if id not found

  updateOrderToDB(orders);
  return "Updated Succesfully";
};

Order.prototype.deleteById = function(orderId) {
  if (orderId === "" || typeof orderId !== "number")
    return "Input must be a valid order ID";

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
    return "Order has been deleted";
  } else {
    return "Product not found";
  }
};

Order.prototype.deleteAll = function() {
  console.log("All order has been deleted");
  return (orderDatabase = []);
};

Order.prototype.all = orderDatabase;

module.exports = { Order };

// let order = new Order();
// console.log(order.update(5, "CupNew"));
// // console.log(order.readSingleOrder(3))
// console.log(order.makeOrder("sbdsnjdks", 3));

// console.log(orderDatabase)
