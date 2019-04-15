let db = [];
let userIdRef = 0;

function increment(ref) {
  return ref == 0 ? (ref = 1) : ++ref;
}


const Admin = function(name, email, password) {
  User.call(this, name, email, password);
  this.create(name, email, password);
  //this.addPerson.apply(this, arguments);   //fix
};

//Setting Admin as instance of User
Admin.prototype = Object.create(User.prototype);

//Pointing Admin constructor to itself so it can override properties
Admin.prototype.constructor = Admin;

//Read all users
Admin.prototype.readAllUser = function() {
  return db; 
};

//Delete a single user
Admin.prototype.deleteUser = function(username) {
  if (typeof username !== "string") return "Input must be a valid username";

  let newDb = [];

  for (let user of db) {
    if (user.name === username) {
      continue;
    } else {
      newDb.push(user);
    }
  }

  return newDb.length !== db.length
    ? (db = newDb)
    : "No such username in the database";
};

//Delete all user
Admin.prototype.deleteAllUser = function() {
  return (db = []);
};