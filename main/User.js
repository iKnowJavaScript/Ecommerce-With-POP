const Order = require("./Order");
const { saveUserToDb, userDatabase, updateUsertoDB } = require("../fs");

let counter = userDatabase.length;

const User = function(name, email, password) {
  this.name = name;
  this.password = password;
  this.email = email;
  this.isAdmin = false;
  this.id = ++counter;
};

function getId(email) {
  for (let item of userDatabase) {
    if (item.email === email) {
      return item.id;
    }
  }
}

User.prototype.save = function() {
  for (let user of userDatabase) {
    if (user.email === this.email) {
      return "Email already exist.";
    }
  }

  let user = {
    id: this.id,
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin,
    password: this.password
  };

  saveUserToDb(user);
  console.log("Succesfully Added to Database");
  return user;
};

User.prototype.updateDetail = function(name, email, password) {
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] !== "string") return `Input a valid details`;
  }

  //search if the new email is already taken
  let id = getId(this.email);
  if (!id) return "Input a valid user email address";

  for (let item of userDatabase) {
    if (item.email === email && item.id !== id) {
      return "User with this email already exist";
    }
  }

  userDatabase.forEach(function(item) {
    if (item.id === id) {
      item.name = name;
      item.email = email;
      item.password = password;
    }
  });
  updateUsertoDB(userDatabase);
  return "Updated Succesfully";
};

User.prototype.findById = function(idSearch) {
  if (typeof idSearch !== "number") return "Please input a valid userId";

  for (let user of userDatabase) {
    if (user.id === idSearch && user.isAdmin === false) return user;
  }
  return "Not found";
};

User.prototype.findUserByName = function(name) {
  if (typeof name !== "string") return "Input must be a valid username";

  for (let user of userDatabase) {
    if (user.name === name && user.isAdmin === false)  return user;
  }
  return "Not found";
};

// Implememnting Create Order for Users
User.prototype.createOrder = function(product) {
  if (typeof product !== "string") return "Invalid Input.";
  let order = new Order(product);

  return order.makeOrder(product, (user_id = getId(this.email)));
};

module.exports = { User, userDatabase };