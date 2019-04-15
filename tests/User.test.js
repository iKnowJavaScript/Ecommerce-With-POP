const User = require("../main/User");

describe("Creating User instances and validating it", function() {
  expect(new User("Martins", "martins@gmail.com", "pass1234")).toMatch(
    /created succesfully/
  );

  expect(new User("Martins", "martins@gmail.com", "pass1234")).toMatch(
    /Username already exist/
  );

  expect(new User(3, "martins@gmail.com", "pass1234")).toMatch(
    /Must be String/
  );

  expect(new User("martins@gmail.com", "pass1234")).toThrowError();
});


describe("Find user by their Id", function() {

  let noName = User.findById();
  let victor = User.findById(2);
  let notFound = User.findById(2000);
  let missing = User.findById("noOne");

  expect(noName).toMatch(/Input must be a valid userId/)
  expect(victor).toBeDefined()
  expect(notFound).toBeUndefined()
  expect(missing).toMatch(/Input must be a valid userId/)
})


describe("Update user details", function() {
  let martins = new User("Martins", "martins@gmail.com", "pass1234");
  let victor = new User("Victor", "martins@gmail.com", "pass1234");

  expect(
    martins.updateDetails("NewMartins", "martins@gmail.com", "pass1234")
  ).toReturn({});
  expect(victor.updateDetails("NewMartins", "martins@gmail.com", "pass1234")).toMatch(/User with this name already exist/)
});

describe("Find user by their username", function() {

  let noName = User.findById("noOne");
  let victor = User.findById("Victor");
  let notFound = User.findById(2000);
  let missing = User.findById("noOne");  

  expect(noName).toMatch(/Input must be a valid username/)
  expect(victor).toBeDefined()
  expect(notFound).toBeUndefined()
  expect(missing).toMatch(/Input must be a valid userId/)
})