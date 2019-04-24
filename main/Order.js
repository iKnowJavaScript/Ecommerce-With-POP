let { saveOrderToDb, orderDatabase, updateOrderToDB } = require("./../fs");

let counter = orderDatabase().length;

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

  return "Order Succesfully Created.";
};

Order.prototype.readAll = function() {
  return orderDatabase();
};

Order.prototype.readSingle = function(orderId) {
  let DB = orderDatabase()
  if (orderId === "" || typeof orderId !== "number")
    return "Input a valid Order ID";

  let order = DB.find(order => order.orderId === orderId);

  return !order ? "Order not found" : order;
};

Order.prototype.update = function(orderId, product) {
  let DB = orderDatabase()
  if (orderId === "" || typeof orderId !== "number")
    return `Order Id must be Number`;
  if (product === "" || typeof product !== "string") return `Invalid Product`;

  let match = DB.find(order => order.orderId === orderId);
  if (match == undefined) return "Product not found";

  DB.map(order => {
    if (order.orderId === orderId) {
      order.product = product;
    }
  });

  updateOrderToDB(DB);
  return "Updated Succesfully";
};

Order.prototype.deleteById = function(orderId) {
  let DB = orderDatabase()
  if (orderId === "" || typeof orderId !== "number")
    return "Input must be a valid order ID";

  let newDb = [];

  for (let order of DB) {
    if (order.orderId === orderId) {
      continue;
    } else {
      newDb.push(order);
    }
  }

  if (newDb.length !== DB.length) {
    updateOrderToDB(newDb);
    return "Order has been deleted";
  } else {
    return "Product not found";
  }
};

Order.prototype.deleteAll = function() {
  let DB = orderDatabase()
  DB.length = 0;
  console.log("All order has been deleted");
 
  return updateOrderToDB(DB)
};


module.exports = { Order };

