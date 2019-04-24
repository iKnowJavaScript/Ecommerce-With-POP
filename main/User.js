const { Order } = require("./Order");
let { saveUserToDb, userDatabase, updateUsertoDB } = require("./../fs");


let counter = userDatabase.length;

const User = function(name, email, password) {
  this.name = name;
  this.password = password;
  this.email = email;
  this.isAdmin = false;
  this.id = ++counter;
};

function getId(email) {
  let DB  = userDatabase()
  for (let item of DB) {
    if (item.email === email) {
      return item.id;
    }
  }
}

User.prototype.save = function() {
  let DB  = userDatabase()
  for (let user of DB) {
    if (user.email === this.email)
      return "ERROR REGISTERING: Email already exist.";
  }

  let user = {
    id: this.id,
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin,
    password: this.password
  };

  saveUserToDb(user);
  console.log("Succesfully Added to Database")
  return user;
};

User.prototype.updateDetail = function(name, email, password) {
  let DB  = userDatabase()

  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] !== "string") return `Input a valid details`;
  }
  
  //search if the new email is already taken
  let id = getId(this.email);

  for (let item of DB) {
    if (item.email === email && item.id !== id)
      return "User with this email already exist";
  }

  DB.forEach(function(item) {
    if (item.id === id) {
      item.name = name;
      item.email = email;
      item.password = password;
    }
  });

  updateUsertoDB(DB);
  return "Updated Succesfully";
};

User.prototype.findById = function(idSearch) {
  let DB  = userDatabase()
  if (idSearch === "" || typeof idSearch !== "number")
    return "Please input a valid userId";

  for (let user of DB) {
    if (user.id === idSearch && user.isAdmin === false) return user;
  }

  return "ERROR: User Not found";
};

User.prototype.findUserByName = function(name) {
  let DB  = userDatabase()
  if (name === "" || typeof name !== "string")
    return "Input must be a valid username";

  for (let user of DB) {
    if (user.name === name && user.isAdmin === false) return user;
  }
  return "Not found";
};

// Implememnting Create Order for Users
User.prototype.createOrder = function(product) {
  if (typeof product !== "string") return "Invalid Product Name";
  let order = new Order(product);

  return order.makeOrder(product, (user_id = getId(this.email)));
};

module.exports = { User, userDatabase };
