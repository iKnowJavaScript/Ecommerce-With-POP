let db = [];
let userIdRef = 0;

function increment(ref) {
  return ref == 0 ? (ref = 1) : ++ref;
}

const User = function(name, email, password) {
  this.name = name;
  this.password = password;
  this.email = email;
  this.id = increment(userIdRef);

  //fix argument length
  this.create = function(name, email, password) {

    let paraLenght = arguments.length;
    if (paraLenght < 3 || paraLenght > 3) return "All paarameter must be filled";

    for (let arg = 0; arg < paraLenght; arg++) {
      if (typeof arguments[arg] !== "string") {
        throw new Error("All field must be filled correctly");
      }
    }

    for (let item of db) {
      if (item.name === this.name) {
        console.log(
          "Please choose a valid Name, User with this name already exist"
        );
        return;
      }
    }

    let user = {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    };

    userIdRef = user.id; // update id with the incrementation

    db.push(user);

    console.log("Succesfully Added to Database");
  };

  //specific to the user and admin
  this.updateDetail = function(name, email, password) {
    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== "string") return `Input a valid details`;
    }

    //search if the new name is already taken
    for (let item of db) {
      if (item.name === name && item.id !== this.id) {
        console.log("User with this name already exist");
        return;
      }
    }

    return db.forEach(item => {
      if (item.id == this.id) {
        item.name = name;
        item.email = email;
        item.password = password;
      }
    });
  };
};

//find user by id
User.prototype.findById = function(idSearch) {
  if (typeof idSearch !== "number") return "Input must be a valid userId";

  for (let user of db) {
    if (user.id === idSearch) return user;
  }
  return "User not found";
};

//find a user by name
User.prototype.findUserByName = function(name) {
  if (typeof name !== "string") return "Input must be a valid username";

  for (let user of db) {
    if (user.name === name) {
      return user;
    }
  }
  return "No such user in Database";
};


User.prototype = Object.create(Order.prototype);

//Pointing User constructor to itself so it can override properties
User.prototype.constructor = User;

User.prototype.createOrder = function(product) {
  let order = new Order(product);
  return order.makeOrder(product, (user_id = this.id));
};


const martins = new User("Martins", "gmail@email", "pass1234");
const charles = new User("Charles", "gmail@email", "pass1234");
const joseph = new User("Joseph", "gmail@email", "pass1234");
const sodeeq = new User("Sodeeq", "gmail@email", "pass1234");

//console.log(martins)
console.log(db);