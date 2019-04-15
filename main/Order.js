let db = [];

let orderIdRef = 0;
function increment(ref) {
  return ref == 0 ? (ref = 1) : ++ref;
}

const Order = function(product) {
  this.id = increment(orderIdRef);
  //this.user_id = this.id;

  this.timeOfOrder = new Date().toLocaleTimeString();
  this.dateOfOrder = new Date().toLocaleDateString();
  this.product = product;
};

Order.prototype.makeOrder = function(product, user_id) {
  let order = {
    id: this.id,
    timeOfOrder: this.timeOfOrder,
    dateOfOrder: this.dateOfOrder,
    product: product,
    user_id: user_id
  };
  console.log(order);

  orderIdRef = order.id; // update id with the incrementation

  db.push(order);

  return "Order Succesfully Added to Database";
};

